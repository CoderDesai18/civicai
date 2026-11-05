import { useState, type FormEvent } from 'react'
import { flushSync } from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { authApi } from '../../services/auth'
import { isFirebaseConfigured } from '../../services/firebaseAuth'
import { AuthShell, Field, PW_HINT } from './AuthShell'

function strongPassword(pw: string) {
  return pw.length >= 8 && /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)
}

export function Register() {
  const nav = useNavigate()
  const { signIn } = useAuth()
  const firebaseOn = isFirebaseConfigured()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [terms, setTerms] = useState(false)
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (!name.trim() || !email.trim() || !password || !confirm) {
      setError('Please complete all required fields.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (!firebaseOn && !strongPassword(password)) {
      setError(PW_HINT)
      return
    }
    if (firebaseOn && password.length < 6) {
      setError('Firebase passwords must be at least 6 characters.')
      return
    }
    if (!terms) {
      setError('Please accept the terms to create an account.')
      return
    }
    setBusy(true)
    try {
      if (firebaseOn) {
        try {
          const r = await authApi.firebasePassword({
            action: 'register',
            email: email.trim(),
            password,
            name: name.trim(),
          })
          if (!r.user) throw new Error('Account created, but the dashboard could not open. Please sign in.')
          flushSync(() => signIn(r.user, r.sessionId))
          nav('/', { replace: true })
          return
        } catch (first) {
          const { firebaseRegister } = await import('../../services/firebaseAuth')
          try {
            const fb = await firebaseRegister(name.trim(), email.trim(), password)
            try {
              const r = await authApi.firebase(fb.idToken)
              flushSync(() => signIn(r.user || fb.user, r.sessionId))
            } catch {
              flushSync(() => signIn(fb.user))
            }
            nav('/', { replace: true })
            return
          } catch {
            throw first
          }
        }
      }
      const r = await authApi.register(name.trim(), email.trim(), password)
      const created = r.user
      if (!created) throw new Error('Account created, but the dashboard could not open. Please sign in.')
      flushSync(() => signIn(created, r.sessionId))
      nav('/', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create the account.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthShell title="Create account">
      <form onSubmit={onSubmit} noValidate>
        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}
        <Field label="Full name">
          <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </Field>
        <Field label="Email">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </Field>
        <Field label="Password">
          <div className="pw-row">
            <input type={show ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
            <button type="button" onClick={() => setShow((v) => !v)}>
              {show ? 'Hide' : 'Show'}
            </button>
          </div>
        </Field>
        <p className="auth-hint">{firebaseOn ? 'Firebase: at least 6 characters.' : PW_HINT}</p>
        <Field label="Confirm password">
          <input type={show ? 'text' : 'password'} value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password" />
        </Field>
        <label className="check">
          <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
          I agree to the Terms & Conditions and Privacy Policy
        </label>
        <button className="auth-btn" type="submit" disabled={busy}>
          {busy ? 'Opening CivicAI…' : 'Create account'}
        </button>
      </form>
      <div className="auth-links">
        <Link to="/login">Already have an account? Sign in</Link>
      </div>
    </AuthShell>
  )
}
