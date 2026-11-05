import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { authApi, clearStoredSession, readStoredSession, writeStoredSession, type AuthUser } from '../services/auth'
import { isFirebaseConfigured } from '../services/firebaseAuth'
import { STANDALONE_USER, isStandalone } from '../standalone'

interface AuthCtx {
  user: AuthUser | null
  pending2fa: boolean
  loading: boolean
  refresh: () => Promise<void>
  setUser: (u: AuthUser | null) => void
  setPending2fa: (v: boolean) => void
  signIn: (user: AuthUser, sessionId?: string) => void
  signOut: () => Promise<void>
}

const C = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const offline = isStandalone()
  const cached = readStoredSession()
  const [user, setUserState] = useState<AuthUser | null>(offline ? STANDALONE_USER : cached.user)
  const [pending2fa, setPending2fa] = useState(false)
  const [loading, setLoading] = useState(offline ? false : !cached.user)

  const setUser = (u: AuthUser | null) => {
    setUserState(u)
    if (!u) clearStoredSession()
    else writeStoredSession(readStoredSession().sessionId, u)
  }

  const signIn = (next: AuthUser, sessionId?: string) => {
    writeStoredSession(sessionId || readStoredSession().sessionId, next)
    setUserState(next)
    setPending2fa(false)
    setLoading(false)
  }

  const refresh = async (mode: 'init' | 'poll' = 'poll') => {
    try {
      const r = await authApi.me()
      if (r.user) {
        writeStoredSession(readStoredSession().sessionId, r.user)
        setUserState(r.user)
        setPending2fa(Boolean(r.pending2fa))
      } else if (r.pending2fa) {
        setPending2fa(true)
      } else if (mode === 'init' && !readStoredSession().user) {
        setUserState(null)
        setPending2fa(false)
      }
    } catch {
      if (mode === 'init' && !readStoredSession().user) {
        setUserState(null)
        setPending2fa(false)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (offline) return
    let stopFb: (() => void) | undefined
    if (isFirebaseConfigured()) {
      void import('../services/firebaseAuth').then(({ listenFirebase }) =>
        listenFirebase((u, token) => {
          if (!u) return
          void (async () => {
            if (token) {
              try {
                const r = await authApi.firebase(token)
                signIn(r.user || u, r.sessionId)
                return
              } catch {
                /* keep Firebase user even if CivicAI session exchange fails */
              }
            }
            signIn(u)
          })()
        }).then((unsub) => {
          stopFb = unsub
        }),
      )
    }
    void refresh('init')
    const onVis = () => {
      if (document.visibilityState === 'visible') void refresh('poll')
    }
    document.addEventListener('visibilitychange', onVis)
    const id = window.setInterval(() => void refresh('poll'), 60_000)
    return () => {
      stopFb?.()
      document.removeEventListener('visibilitychange', onVis)
      window.clearInterval(id)
    }
  }, [])

  const value = useMemo<AuthCtx>(
    () => ({
      user,
      pending2fa,
      loading,
      refresh: () => refresh('poll'),
      setUser,
      setPending2fa,
      signIn,
      signOut: async () => {
        if (offline) {
          setUserState(STANDALONE_USER)
          setPending2fa(false)
          return
        }
        try {
          const { firebaseSignOut } = await import('../services/firebaseAuth')
          await firebaseSignOut()
        } catch {
          /* ignore */
        }
        try {
          await authApi.logout()
        } catch {
          /* ignore */
        }
        clearStoredSession()
        setUserState(null)
        setPending2fa(false)
      },
    }),
    [user, pending2fa, loading],
  )

  return <C.Provider value={value}>{children}</C.Provider>
}

export function useAuth() {
  const ctx = useContext(C)
  if (!ctx) throw new Error('useAuth outside provider')
  return ctx
}
