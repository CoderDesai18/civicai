import { useEffect } from 'react'

export function GoogleCallback() {
  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''))
    const idToken = hash.get('id_token') || ''
    const error = hash.get('error') || ''
    if (window.opener) {
      window.opener.postMessage({ type: 'civicai-google', idToken, error }, window.location.origin)
      window.close()
    }
  }, [])
  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>Google sign-in</h1>
        <p className="auth-lead">You can close this window and return to CivicAI.</p>
      </div>
    </div>
  )
}
