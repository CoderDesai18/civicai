import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../../services/auth'
import { isFirebaseConfigured } from '../../services/firebaseAuth'
import { AuthShell, Field, PW_HINT } from './AuthShell'

export function ForgotPassword() {
  const nav = useNavigate()
  const firebaseOn = isFirebaseConfigured()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [mailbox, setMailbox] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function requestCode(e: FormEvent) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      if (firebaseOn) {
        try {
          await authApi.firebasePassword({ action: 'reset', email })
        } catch {
          const { firebaseReset } = await import('../../services/firebaseAuth')
          await firebaseReset(email)
        }
        setStep(3)
        return
      }
      const r = await authApi.forgot(email)
      setMailbox(r.mailbox || '')
      setStep(2)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not start reset.')
    } finally {
      setBusy(false)
    }
  }

  async function finish(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    setBusy(true)
    try {
      await authApi.reset(email, code, password)
      setStep(3)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not reset password.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthShell title="Reset password">
      {error && (
        <p className="auth-error" role="alert">
          {error}
        </p>
      )}
      {step === 1 && (
        <form onSubmit={requestCode}>
          <p className="auth-lead">
            {firebaseOn
              ? 'Firebase will email a reset link if this address has an account.'
              : 'Enter the email on your account. If it is registered, a reset code will be issued.'}
          </p>
          <Field label="Email">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Field>
          <button className="auth-btn" type="submit" disabled={busy}>
            {busy ? 'Sending…' : 'Continue'}
          </button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={finish}>
          <p className="auth-lead">If that email is registered, a 6-digit code was issued. This prototype has no mail server.</p>
          {mailbox && <p className="auth-mailbox">Prototype mailbox code: {mailbox}</p>}
          <Field label="Verification code">
            <input value={code} onChange={(e) => setCode(e.target.value)} inputMode="numeric" />
          </Field>
          <Field label="New password">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
          </Field>
          <p className="auth-hint">{PW_HINT}</p>
          <Field label="Confirm new password">
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          </Field>
          <button className="auth-btn" type="submit" disabled={busy}>
            {busy ? 'Saving…' : 'Create new password'}
          </button>
        </form>
      )}
      {step === 3 && (
        <div>
          <p className="auth-lead">
            {firebaseOn ? 'If that email is registered, Firebase has sent a reset link. Check your inbox, then sign in.' : 'Your password was updated. Sign in with the new password.'}
          </p>
          <button className="auth-btn" type="button" onClick={() => nav('/login', { replace: true })}>
            Go to sign in
          </button>
        </div>
      )}
      <div className="auth-links">
        <Link to="/login">Back to sign in</Link>
      </div>
    </AuthShell>
  )
}
