type GoogleId = {
  initialize: (cfg: {
    client_id: string
    callback: (res: { credential?: string }) => void
    auto_select?: boolean
    ux_mode?: 'popup' | 'redirect'
    cancel_on_tap_outside?: boolean
  }) => void
  prompt: (cb?: (n: { isNotDisplayed?: boolean; isSkippedMoment?: boolean; isDismissedMoment?: boolean }) => void) => void
  renderButton: (el: HTMLElement, cfg: Record<string, string | number>) => void
}

declare global {
  interface Window {
    google?: { accounts: { id: GoogleId } }
  }
}

let loading: Promise<GoogleId> | null = null

export function loadGoogleId(): Promise<GoogleId> {
  if (window.google?.accounts?.id) return Promise.resolve(window.google.accounts.id)
  if (loading) return loading
  loading = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-civicai-gis]')
    const done = () => {
      const api = window.google?.accounts?.id
      if (api) resolve(api)
      else reject(new Error('Google sign-in script loaded without the Identity API.'))
    }
    if (existing) {
      existing.addEventListener('load', done)
      existing.addEventListener('error', () => reject(new Error('Could not load Google sign-in.')))
      return
    }
    const s = document.createElement('script')
    s.src = 'https://accounts.google.com/gsi/client'
    s.async = true
    s.defer = true
    s.dataset.civicaiGis = '1'
    s.onload = done
    s.onerror = () => {
      loading = null
      reject(new Error('Could not reach Google. Open this preview in a new tab and try again.'))
    }
    document.head.appendChild(s)
    window.setTimeout(() => {
      if (!window.google?.accounts?.id) {
        loading = null
        reject(new Error('Google sign-in timed out. Open CivicAI in a new browser tab and try again.'))
      }
    }, 8000)
  })
  return loading
}

export function googleOAuthUrl(clientId: string, nonce: string) {
  const redirect = `${window.location.origin}/login/google/callback`
  const q = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirect,
    response_type: 'id_token',
    scope: 'openid email profile',
    nonce,
    prompt: 'select_account',
  })
  return `https://accounts.google.com/o/oauth2/v2/auth?${q.toString()}`
}
