import { useEffect, useState, type ReactNode } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { isStandalone } from '../../standalone'

export function RequireAuth() {
  const { user, pending2fa, loading } = useAuth()
  const loc = useLocation()
  const [waited, setWaited] = useState(false)
  useEffect(() => {
    const t = window.setTimeout(() => setWaited(true), 2500)
    return () => window.clearTimeout(t)
  }, [])
  if (loading && !user && !waited) {
    return (
      <div className="auth-shell">
        <p>Opening CivicAI…</p>
      </div>
    )
  }
  if (pending2fa) return <Navigate to="/login/2fa" replace state={{ from: loc.pathname }} />
  if (!user) return <Navigate to="/login" replace state={{ from: loc.pathname + loc.search }} />
  return <Outlet />
}

export function GuestOnly({ children }: { children: ReactNode }) {
  const { user, pending2fa, loading } = useAuth()
  if (loading && !user) return <div className="auth-shell">Opening CivicAI…</div>
  if (pending2fa) return <Navigate to="/login/2fa" replace />
  if (user) return <Navigate to="/" replace />
  return children
}
