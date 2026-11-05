import { useState, type FormEvent } from 'react'
import { flushSync } from 'react-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { authApi } from '../../services/auth'
import { AuthShell, Field } from './AuthShell'

export function TwoFactor() {
  const nav = useNavigate()
  const loc = useLocation()
  const from = (loc.state as { from?: string } | null)?.from || '/'
  const { signIn } = useAuth()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      const r = await authApi.verify2fa(code.trim())
      flushSync(() => signIn(r.user, r.sessionId))
      nav(from, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthShell title="Two-factor verification">
      <p className="auth-lead">Enter the 6-digit code from your authenticator app, or a recovery code.</p>
      <form onSubmit={onSubmit}>
        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}
        <Field label="Verification code">
          <input value={code} onChange={(e) => setCode(e.target.value)} inputMode="numeric" autoComplete="one-time-code" />
        </Field>
        <button className="auth-btn" type="submit" disabled={busy}>
          {busy ? 'Checking…' : 'Verify and continue'}
        </button>
      </form>
    </AuthShell>
  )
}
