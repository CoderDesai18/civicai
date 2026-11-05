import { useState, type FormEvent } from 'react'
import { flushSync } from 'react-dom'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useSettings } from '../../context/SettingsContext'
import { authApi } from '../../services/auth'
import { isFirebaseConfigured } from '../../services/firebaseAuth'
import { AuthShell, Field } from './AuthShell'

function safeFrom(raw: string | undefined, fallback: string) {
  if (!raw) return fallback
  if (raw.startsWith('/login') || raw === '/register' || raw === '/forgot') return fallback
  if (!raw.startsWith('/')) return fallback
  return raw
}

export function Login() {
  const nav = useNavigate()
  const loc = useLocation()
  const { signIn, setPending2fa } = useAuth()
  const { settings } = useSettings()
  const state = loc.state as { from?: string; registered?: boolean } | null
  const from = safeFrom(state?.from, settings.startPage || '/')
  const firebaseOn = isFirebaseConfigured()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [remember, setRemember] = useState(settings.rememberLogin)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const host = typeof window !== 'undefined' ? window.location.hostname : ''
  const inFrame = typeof window !== 'undefined' && window.self !== window.top

  function openApp(
    user: { id: string; name: string; email: string; twoFactorEnabled: boolean; createdAt: string; lastLoginAt: string | null },
    sessionId?: string,
  ) {
    flushSync(() => signIn(user, sessionId))
    nav(from || '/', { replace: true })
  }

  async function completePassword(em: string, pw: string, stay: boolean) {
    if (firebaseOn) {
      try {
        const r = await authApi.firebasePassword({ action: 'login', email: em, password: pw })
        if (!r.user) throw new Error('Signed in, but the app could not open your session. Try again.')
        openApp(r.user, r.sessionId)
        return
      } catch (first) {
        const { firebaseSignIn } = await import('../../services/firebaseAuth')
        try {
          const fb = await firebaseSignIn(em, pw, stay)
          try {
            const r = await authApi.firebase(fb.idToken)
            openApp(r.user || fb.user, r.sessionId)
          } catch {
            openApp(fb.user)
          }
          return
        } catch {
          throw first
        }
      }
    }
    const r = await authApi.login(em, pw, stay)
    if (r.requires2fa) {
      if (r.sessionId) {
        try {
          sessionStorage.setItem('civicai.sid', r.sessionId)
        } catch {
          /* ignore */
        }
      }
      setPending2fa(true)
      nav('/login/2fa', { replace: true, state: { from } })
      return
    }
    if (!r.user) throw new Error('Signed in, but the app could not open your session. Try again.')
    openApp(r.user, r.sessionId)
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password) {
      setError('Enter your email and password.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address.')
      return
    }
    setBusy(true)
    try {
      await completePassword(email.trim(), password, remember)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not sign in.')
    } finally {
      setBusy(false)
    }
  }

  async function demoLogin() {
    setError('')
    setBusy(true)
    try {
      await authApi.login('demo@civicai.in', 'CivicAI@2026', true).then((r) => {
        if (!r.user) throw new Error('Could not open the demo dashboard.')
        openApp(r.user, r.sessionId)
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not open the demo dashboard.')
    } finally {
      setBusy(false)
    }
  }

  async function googleLogin() {
    setError('')
    setBusy(true)
    try {
      if (!firebaseOn) {
        setError(
          'Continue with Google uses Firebase Authentication. Add your Firebase web config to .env.local (VITE_FIREBASE_API_KEY and project fields), enable Google in the Firebase console, then restart the app.',
        )
        return
      }
      if (inFrame) {
        setError(
          `Google sign-in cannot finish inside the preview frame. Open CivicAI in a new tab. If Firebase still says unauthorized domain, add ${host} under Authentication → Settings → Authorized domains.`,
        )
        return
      }
      const { firebaseGoogle } = await import('../../services/firebaseAuth')
      const fb = await firebaseGoogle()
      if (!fb) return
      try {
        const r = await authApi.firebase(fb.idToken)
        openApp(r.user || fb.user, r.sessionId)
      } catch {
        openApp(fb.user)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthShell title="Sign in">
      <p className="auth-lead">{firebaseOn ? 'Sign in with Firebase (email or Google).' : 'Use your CivicAI account to open the dashboard.'}</p>
      {firebaseOn && (
        <p className="auth-mailbox" role="note">
          Email/password talks to Firebase from the CivicAI server (this preview host does not need to be listed).
          Google still needs this host in Authorized domains: <strong>{host || 'this site'}</strong>
          {inFrame ? ' — and Google will not complete inside this preview frame; use Open in new tab.' : ''}
        </p>
      )}
      <form onSubmit={onSubmit} noValidate>
        {state?.registered && !error && (
          <p className="auth-mailbox" role="status">
            Account created. Sign in to open the app.
          </p>
        )}
        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}
        <Field label="Email">
          <input type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field label="Password">
          <div className="pw-row">
            <input type={show ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={() => setShow((v) => !v)} aria-label={show ? 'Hide password' : 'Show password'}>
              {show ? 'Hide' : 'Show'}
            </button>
          </div>
        </Field>
        <label className="check">
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
          Remember me
        </label>
        <button className="auth-btn" type="submit" disabled={busy}>
          {busy ? 'Opening CivicAI…' : 'Sign in'}
        </button>
      </form>
      <button type="button" className="auth-btn google" onClick={() => void googleLogin()} disabled={busy}>
        <span className="g-mark" aria-hidden>
          G
        </span>
        Continue with Google
      </button>
      {inFrame && (
        <button
          type="button"
          className="auth-btn ghost"
          onClick={() => window.open(window.location.href, '_blank', 'noopener')}
        >
          Open in new tab (needed for Google)
        </button>
      )}
      <button type="button" className="auth-btn ghost" onClick={() => void demoLogin()} disabled={busy}>
        Open dashboard
      </button>
      <div className="auth-links">
        <Link to="/forgot">Forgot password</Link>
        <Link to="/register">Create account</Link>
      </div>
      <p className="auth-hint">
        {firebaseOn
          ? 'Authentication is handled by Firebase. Open dashboard still uses the CivicAI demo account.'
          : 'Firebase is not configured yet. Demo: demo@civicai.in · CivicAI@2026'}
      </p>
    </AuthShell>
  )
}
