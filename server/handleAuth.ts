import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'

function loadEnvOnce() {
  const p = resolve(process.cwd(), '.env.local')
  if (!existsSync(p)) return
  for (const line of readFileSync(p, 'utf8').split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#') || !t.includes('=')) continue
    const i = t.indexOf('=')
    const k = t.slice(0, i).trim()
    const v = t.slice(i + 1).trim()
    if (!process.env[k]) process.env[k] = v
  }
}
loadEnvOnce()
import {
  begin2fa,
  changePassword,
  clearCookie,
  complete2fa,
  confirm2fa,
  cookieHeader,
  deleteAccount,
  disable2fa,
  issueSession,
  listActivity,
  listSessions,
  logout,
  logoutAll,
  readSessionId,
  registerUser,
  requestReset,
  resetPassword,
  seedDemoUser,
  startLogin,
  touch,
  upsertGoogleUser,
} from './authCore.ts'

function firebaseWebKey() {
  return process.env.FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY || ''
}

function mapFirebaseRestError(message?: string) {
  const m = String(message || '')
  if (m.includes('INVALID_LOGIN_CREDENTIALS') || m.includes('EMAIL_NOT_FOUND') || m.includes('INVALID_PASSWORD')) {
    return 'Email or password is incorrect.'
  }
  if (m.includes('EMAIL_EXISTS')) return 'An account with this email already exists. Please sign in.'
  if (m.includes('WEAK_PASSWORD')) return 'Password is too weak. Use at least 6 characters.'
  if (m.includes('INVALID_EMAIL')) return 'Enter a valid email address.'
  if (m.includes('USER_DISABLED')) return 'This account is disabled.'
  if (m.includes('OPERATION_NOT_ALLOWED')) {
    return 'That sign-in method is not enabled in Firebase Authentication.'
  }
  if (m.includes('TOO_MANY_ATTEMPTS')) return 'Too many attempts. Try again later.'
  if (m.includes('MISSING_PASSWORD')) return 'Enter your email and password.'
  return 'Firebase authentication failed.'
}

async function firebaseRest(path: string, body: Record<string, unknown>) {
  const key = firebaseWebKey()
  if (!key) return { ok: false as const, error: 'Firebase is not configured on the server.' }
  try {
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/${path}?key=${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = (await res.json()) as {
      error?: { message?: string }
      idToken?: string
      localId?: string
      email?: string
      displayName?: string
    }
    if (!res.ok) return { ok: false as const, error: mapFirebaseRestError(data.error?.message) }
    return { ok: true as const, data }
  } catch {
    return { ok: false as const, error: 'Could not reach Firebase.' }
  }
}

async function verifyFirebaseIdToken(idToken: string): Promise<
  { ok: true; email: string; name: string; sub: string } | { ok: false; error: string }
> {
  if (!idToken) return { ok: false, error: 'Firebase did not return a token.' }
  const looked = await firebaseRest('accounts:lookup', { idToken })
  if (!looked.ok) return looked
  const u = (looked.data as { users?: { localId?: string; email?: string; displayName?: string }[] }).users?.[0]
  if (!u?.email || !u.localId) return { ok: false, error: 'Firebase could not verify that sign-in.' }
  return { ok: true, email: u.email, name: u.displayName || u.email.split('@')[0], sub: u.localId }
}

async function firebasePasswordSession(input: {
  action: 'login' | 'register' | 'reset'
  email?: string
  password?: string
  name?: string
  ua: string
  ip: string
  secure: boolean
  json: (res: ServerResponse, status: number, data: unknown, setCookie?: string) => void
  res: ServerResponse
}) {
  const email = String(input.email || '').trim()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return input.json(input.res, 400, { error: 'Enter a valid email address.' })
  }
  if (input.action === 'reset') {
    const r = await firebaseRest('accounts:sendOobCode', { requestType: 'PASSWORD_RESET', email })
    if (!r.ok && r.error !== 'Email or password is incorrect.') {
      return input.json(input.res, 400, { error: r.error })
    }
    return input.json(input.res, 200, {
      message: 'If that email is registered, Firebase has sent a reset link.',
    })
  }
  const password = String(input.password || '')
  if (!password) return input.json(input.res, 400, { error: 'Enter your email and password.' })
  if (input.action === 'register') {
    if (password.length < 6) {
      return input.json(input.res, 400, { error: 'Firebase passwords must be at least 6 characters.' })
    }
    const created = await firebaseRest('accounts:signUp', { email, password, returnSecureToken: true })
    if (!created.ok) return input.json(input.res, 400, { error: created.error })
    const name = String(input.name || '').trim()
    if (name && created.data.idToken) {
      await firebaseRest('accounts:update', { idToken: created.data.idToken, displayName: name, returnSecureToken: true })
    }
    const verified = created.data.idToken
      ? await verifyFirebaseIdToken(created.data.idToken)
      : { ok: false as const, error: 'Firebase did not return a token.' }
    if (verified.ok === false) return input.json(input.res, 401, { error: verified.error })
    const user = upsertGoogleUser({
      email: verified.email,
      name: name || verified.name,
      sub: `firebase:${verified.sub}`,
    })
    const logged = issueSession(user, true, input.ua, input.ip)
    return input.json(
      input.res,
      200,
      { user: logged.user, requires2fa: logged.requires2fa, sessionId: logged.sessionId },
      cookieHeader(logged.sessionId, logged.maxAge || 0, input.secure),
    )
  }
  const signed = await firebaseRest('accounts:signInWithPassword', { email, password, returnSecureToken: true })
  if (!signed.ok) return input.json(input.res, 401, { error: signed.error })
  const verified = signed.data.idToken
    ? await verifyFirebaseIdToken(signed.data.idToken)
    : { ok: false as const, error: 'Firebase did not return a token.' }
  if (verified.ok === false) return input.json(input.res, 401, { error: verified.error })
  const user = upsertGoogleUser({ email: verified.email, name: verified.name, sub: `firebase:${verified.sub}` })
  const logged = issueSession(user, true, input.ua, input.ip)
  return input.json(
    input.res,
    200,
    { user: logged.user, requires2fa: logged.requires2fa, sessionId: logged.sessionId },
    cookieHeader(logged.sessionId, logged.maxAge || 0, input.secure),
  )
}

type Req = IncomingMessage & { body?: unknown }

function readBody(req: Req) {
  if (req.body && typeof req.body === 'object') return Promise.resolve(JSON.stringify(req.body))
  if (typeof req.body === 'string') return Promise.resolve(req.body)
  return new Promise<string>((resolve) => {
    const chunks: Buffer[] = []
    req.on('data', (c) => chunks.push(c as Buffer))
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
}

function json(res: ServerResponse, status: number, data: unknown, setCookie?: string) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  if (setCookie) res.setHeader('Set-Cookie', setCookie)
  res.end(JSON.stringify(data))
}

function clientIp(req: IncomingMessage) {
  const xf = req.headers['x-forwarded-for']
  if (typeof xf === 'string') return xf.split(',')[0].trim()
  return req.socket.remoteAddress || ''
}

function isSecureReq(req: IncomingMessage) {
  const proto = String(req.headers['x-forwarded-proto'] || '').split(',')[0].trim()
  const host = String(req.headers['x-forwarded-host'] || req.headers.host || '')
  return proto === 'https' || host.includes('e2b.app') || Boolean(process.env.VERCEL)
}

function strongPassword(pw: string) {
  return pw.length >= 8 && /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)
}

async function verifyGoogleIdToken(idToken: string): Promise<
  { ok: true; email: string; name: string; sub: string } | { ok: false; error: string }
> {
  if (!idToken) return { ok: false, error: 'Google sign-in did not return a token.' }
  try {
    const res = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`)
    const data = (await res.json()) as {
      error?: string
      email?: string
      email_verified?: string
      name?: string
      given_name?: string
      sub?: string
      iss?: string
      aud?: string
    }
    if (!res.ok || data.error) return { ok: false, error: 'Google could not verify that sign-in.' }
    const issOk = data.iss === 'accounts.google.com' || data.iss === 'https://accounts.google.com'
    if (!issOk || data.email_verified !== 'true' || !data.email || !data.sub) {
      return { ok: false, error: 'That Google account could not be verified.' }
    }
    const expected = process.env.GOOGLE_CLIENT_ID || ''
    if (expected && data.aud !== expected) return { ok: false, error: 'Google client ID does not match this app.' }
    return { ok: true, email: data.email, name: data.name || data.given_name || data.email.split('@')[0], sub: data.sub }
  } catch {
    return { ok: false, error: 'Could not reach Google to verify sign-in.' }
  }
}

export async function handleAuthRequest(req: Req, res: ServerResponse, next: () => void) {
  seedDemoUser()
  const url = String(req.url || '').split('?')[0]
  if (!url.startsWith('/api/auth')) {
    next()
    return
  }
  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }
  const sid = readSessionId(
    req.headers.cookie,
    String(req.headers.authorization || ''),
    String(req.headers['x-civicai-session'] || ''),
  )
  const ip = clientIp(req)
  const ua = String(req.headers['user-agent'] || '')
  const secure = isSecureReq(req)

  try {
    if (url === '/api/auth/register' && req.method === 'POST') {
      const b = JSON.parse((await readBody(req)) || '{}') as { name?: string; email?: string; password?: string }
      if (!b.name?.trim() || !b.email?.trim() || !b.password) {
        return json(res, 400, { error: 'Please complete all required fields.' })
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email)) {
        return json(res, 400, { error: 'Enter a valid email address.' })
      }
      if (!strongPassword(b.password)) {
        return json(res, 400, {
          error: 'Password needs 8+ characters, upper and lower case, a number and a symbol.',
        })
      }
      const r = registerUser({ name: b.name, email: b.email, password: b.password })
      if (r.error || !r.user) return json(res, 400, r)
      const logged = startLogin({ email: b.email, password: b.password, remember: true, ua, ip })
      if ('error' in logged || !logged.sessionId) return json(res, 200, { user: r.user, requires2fa: false, sessionId: '' })
      return json(
        res,
        200,
        {
          user: logged.user || r.user,
          requires2fa: Boolean(logged.requires2fa),
          sessionId: logged.sessionId,
        },
        cookieHeader(logged.sessionId, logged.maxAge || 0, secure),
      )
    }

    if (url === '/api/auth/login' && req.method === 'POST') {
      const b = JSON.parse((await readBody(req)) || '{}') as {
        email?: string
        password?: string
        remember?: boolean
      }
      if (!b.email || !b.password) return json(res, 400, { error: 'Enter your email and password.' })
      const r = startLogin({ email: b.email, password: b.password, remember: Boolean(b.remember), ua, ip })
      if ('error' in r || !r.sessionId) return json(res, 401, { error: 'error' in r ? r.error : 'Could not sign in.' })
      return json(
        res,
        200,
        { requires2fa: r.requires2fa, user: r.user, sessionId: r.sessionId },
        cookieHeader(r.sessionId, r.maxAge || 0, secure),
      )
    }

    if (url === '/api/auth/google/config' && req.method === 'GET') {
      return json(res, 200, {
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        firebase: Boolean(firebaseWebKey()),
      })
    }

    if (url === '/api/auth/firebase' && req.method === 'POST') {
      const b = JSON.parse((await readBody(req)) || '{}') as { idToken?: string }
      const verified = await verifyFirebaseIdToken(String(b.idToken || ''))
      if (verified.ok === false) return json(res, 401, { error: verified.error })
      const user = upsertGoogleUser({ email: verified.email, name: verified.name, sub: `firebase:${verified.sub}` })
      const logged = issueSession(user, true, ua, ip)
      return json(
        res,
        200,
        { user: logged.user, requires2fa: logged.requires2fa, sessionId: logged.sessionId },
        cookieHeader(logged.sessionId, logged.maxAge || 0, secure),
      )
    }

    if (url === '/api/auth/firebase-password' && req.method === 'POST') {
      const b = JSON.parse((await readBody(req)) || '{}') as {
        action?: 'login' | 'register' | 'reset'
        email?: string
        password?: string
        name?: string
      }
      const action = b.action === 'register' || b.action === 'reset' ? b.action : 'login'
      return firebasePasswordSession({
        action,
        email: b.email,
        password: b.password,
        name: b.name,
        ua,
        ip,
        secure,
        json,
        res,
      })
    }

    if (url === '/api/auth/google' && req.method === 'POST') {
      const b = JSON.parse((await readBody(req)) || '{}') as { idToken?: string }
      const verified = await verifyGoogleIdToken(String(b.idToken || ''))
      if (verified.ok === false) return json(res, 401, { error: verified.error })
      const user = upsertGoogleUser({ email: verified.email, name: verified.name, sub: verified.sub })
      const logged = issueSession(user, true, ua, ip)
      return json(
        res,
        200,
        { user: logged.user, requires2fa: logged.requires2fa, sessionId: logged.sessionId },
        cookieHeader(logged.sessionId, logged.maxAge || 0, secure),
      )
    }

    if (url === '/api/auth/2fa/verify' && req.method === 'POST') {
      const b = JSON.parse((await readBody(req)) || '{}') as { code?: string }
      const r = complete2fa(sid, String(b.code || ''), ip)
      return json(res, r.error ? 401 : 200, r)
    }

    if (url === '/api/auth/me' && req.method === 'GET') {
      const r = touch(sid)
      if (!r) return json(res, 200, { user: null, pending2fa: false })
      return json(res, 200, { user: r.user, pending2fa: r.pending2fa })
    }

    if (url === '/api/auth/logout' && req.method === 'POST') {
      logout(sid)
      return json(res, 200, { ok: true }, clearCookie(secure))
    }

    if (url === '/api/auth/forgot' && req.method === 'POST') {
      const b = JSON.parse((await readBody(req)) || '{}') as { email?: string }
      const r = requestReset(String(b.email || ''))
      return json(res, 200, {
        message: 'If that email is registered, a reset code has been issued.',
        mailbox: r.mailbox,
      })
    }

    if (url === '/api/auth/reset' && req.method === 'POST') {
      const b = JSON.parse((await readBody(req)) || '{}') as { email?: string; code?: string; password?: string }
      if (!strongPassword(String(b.password || ''))) {
        return json(res, 400, {
          error: 'Password needs 8+ characters, upper and lower case, a number and a symbol.',
        })
      }
      const r = resetPassword(String(b.email || ''), String(b.code || ''), String(b.password || ''))
      return json(res, r.error ? 400 : 200, r)
    }

    const live = touch(sid)
    if (!live?.user) return json(res, 401, { error: 'Please sign in.' })

    if (url === '/api/auth/password' && req.method === 'POST') {
      const b = JSON.parse((await readBody(req)) || '{}') as { current?: string; next?: string }
      if (!strongPassword(String(b.next || ''))) {
        return json(res, 400, {
          error: 'Password needs 8+ characters, upper and lower case, a number and a symbol.',
        })
      }
      return json(res, 200, changePassword(live.user.id, String(b.current || ''), String(b.next || '')))
    }
    if (url === '/api/auth/sessions' && req.method === 'GET') {
      return json(res, 200, { sessions: listSessions(live.user.id, sid) })
    }
    if (url === '/api/auth/activity' && req.method === 'GET') {
      return json(res, 200, { activity: listActivity(live.user.id) })
    }
    if (url === '/api/auth/logout-all' && req.method === 'POST') {
      logoutAll(live.user.id)
      return json(res, 200, { ok: true }, clearCookie(secure))
    }
    if (url === '/api/auth/2fa/begin' && req.method === 'POST') return json(res, 200, begin2fa(live.user.id))
    if (url === '/api/auth/2fa/confirm' && req.method === 'POST') {
      const b = JSON.parse((await readBody(req)) || '{}') as { secret?: string; code?: string }
      const r = confirm2fa(live.user.id, String(b.secret || ''), String(b.code || ''))
      return json(res, r.error ? 400 : 200, r)
    }
    if (url === '/api/auth/2fa/disable' && req.method === 'POST') {
      const b = JSON.parse((await readBody(req)) || '{}') as { password?: string; code?: string }
      const r = disable2fa(live.user.id, String(b.password || ''), String(b.code || ''))
      return json(res, r.error ? 400 : 200, r)
    }
    if (url === '/api/auth/delete' && req.method === 'POST') {
      const b = JSON.parse((await readBody(req)) || '{}') as { password?: string }
      const r = deleteAccount(live.user.id, String(b.password || ''))
      return json(res, r.error ? 400 : 200, r, r.ok ? clearCookie(secure) : undefined)
    }
    return json(res, 404, { error: 'Unknown auth route.' })
  } catch {
    return json(res, 500, { error: 'Authentication service unavailable.' })
  }
}
