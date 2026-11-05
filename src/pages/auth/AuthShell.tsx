import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function AuthShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="auth-shell">
      <div className="auth-card">
        <Link to="/login" className="auth-brand">
          <span className="auth-logo">CA</span>
          <span>
            <strong>CivicAI</strong>
            <em>Your Legal & Government Assistant</em>
          </span>
        </Link>
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  )
}

export function Field({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <label className="auth-field">
      <span>{label}</span>
      {children}
    </label>
  )
}

export const PW_HINT = 'At least 8 characters, with upper and lower case, a number and a symbol.'
