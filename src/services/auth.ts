export type AuthUser = {
  id: string
  name: string
  email: string
  twoFactorEnabled: boolean
  createdAt: string
  lastLoginAt: string | null
}

const SID = 'civicai.sid'
const USER = 'civicai.user'

export function readStoredSession() {
  try {
    const sessionId = sessionStorage.getItem(SID) || ''
    const raw = sessionStorage.getItem(USER)
    const user = raw ? (JSON.parse(raw) as AuthUser) : null
    return { sessionId, user }
  } catch {
    return { sessionId: '', user: null as AuthUser | null }
  }
}

export function writeStoredSession(sessionId: string | undefined, user: AuthUser | null) {
  try {
    if (sessionId) sessionStorage.setItem(SID, sessionId)
    if (user) sessionStorage.setItem(USER, JSON.stringify(user))
    else {
      sessionStorage.removeItem(SID)
      sessionStorage.removeItem(USER)
    }
  } catch {
    /* private mode */
  }
}

export function clearStoredSession() {
  writeStoredSession(undefined, null)
}

async function req<T>(url: string, init?: RequestInit): Promise<T> {
  if (typeof window !== 'undefined' && window.location.protocol === 'file:') {
    throw new Error('This downloaded file is offline. Open CivicAI from the live preview for sign-in.')
  }
  const { headers: extra, ...rest } = init || {}
  const sid = readStoredSession().sessionId
  const res = await fetch(url, {
    credentials: 'include',
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(sid ? { Authorization: `Bearer ${sid}`, 'X-CivicAI-Session': sid } : {}),
      ...(extra || {}),
    },
  })
  let data: T & { error?: string }
  try {
    data = (await res.json()) as T & { error?: string }
  } catch {
    throw new Error('Could not reach CivicAI. Refresh and try again.')
  }
  if (!res.ok) throw new Error(data.error || 'Request failed.')
  return data
}

export type AuthOk = { user: AuthUser | null; requires2fa?: boolean; sessionId?: string }

export const authApi = {
  me: () => req<{ user: AuthUser | null; pending2fa?: boolean }>('/api/auth/me'),
  login: (email: string, password: string, remember: boolean) =>
    req<AuthOk>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, remember }),
    }),
  register: (name: string, email: string, password: string) =>
    req<AuthOk>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),
  googleConfig: () => req<{ clientId: string }>('/api/auth/google/config'),
  google: (idToken: string) =>
    req<AuthOk>('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify({ idToken }),
    }),
  firebase: (idToken: string) =>
    req<AuthOk>('/api/auth/firebase', {
      method: 'POST',
      body: JSON.stringify({ idToken }),
    }),
  firebasePassword: (body: { action: 'login' | 'register' | 'reset'; email: string; password?: string; name?: string }) =>
    req<AuthOk & { message?: string }>('/api/auth/firebase-password', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  verify2fa: (code: string) =>
    req<{ user: AuthUser; sessionId?: string }>('/api/auth/2fa/verify', { method: 'POST', body: JSON.stringify({ code }) }),
  logout: () => req<{ ok: boolean }>('/api/auth/logout', { method: 'POST' }),
  logoutAll: () => req<{ ok: boolean }>('/api/auth/logout-all', { method: 'POST' }),
  forgot: (email: string) =>
    req<{ message: string; mailbox?: string }>('/api/auth/forgot', { method: 'POST', body: JSON.stringify({ email }) }),
  reset: (email: string, code: string, password: string) =>
    req<{ ok?: boolean }>('/api/auth/reset', { method: 'POST', body: JSON.stringify({ email, code, password }) }),
  changePassword: (current: string, next: string) =>
    req<{ ok?: boolean; error?: string }>('/api/auth/password', { method: 'POST', body: JSON.stringify({ current, next }) }),
  sessions: () =>
    req<{ sessions: { id: string; current: boolean; createdAt: string; lastSeen: string; ua: string; ip: string }[] }>(
      '/api/auth/sessions',
    ),
  activity: () => req<{ activity: { at: string; event: string; detail: string; ip: string }[] }>('/api/auth/activity'),
  begin2fa: () => req<{ secret: string; otpauth: string }>('/api/auth/2fa/begin', { method: 'POST' }),
  confirm2fa: (secret: string, code: string) =>
    req<{ recovery?: string[]; error?: string }>('/api/auth/2fa/confirm', {
      method: 'POST',
      body: JSON.stringify({ secret, code }),
    }),
  disable2fa: (password: string, code: string) =>
    req<{ ok?: boolean; error?: string }>('/api/auth/2fa/disable', {
      method: 'POST',
      body: JSON.stringify({ password, code }),
    }),
  deleteAccount: (password: string) =>
    req<{ ok?: boolean; error?: string }>('/api/auth/delete', { method: 'POST', body: JSON.stringify({ password }) }),
}
