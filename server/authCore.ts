import {
  createHmac,
  randomBytes,
  scryptSync,
  timingSafeEqual,
  createHash,
} from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'

function dataDir() {
  if (process.env.VERCEL) return join(tmpdir(), 'civicai-data')
  return resolve(process.cwd(), 'data')
}

const USERS_FILE = join(dataDir(), 'users.json')
const SESSIONS_FILE = join(dataDir(), 'sessions.json')
const SESSION_SECRET = process.env.SESSION_SECRET || 'civicai-session-change-me'
const IDLE_MS = 30 * 60 * 1000
const REMEMBER_MS = 14 * 24 * 60 * 60 * 1000
const LOCK_AFTER = 5
const LOCK_MS = 10 * 60 * 1000

export type PublicUser = {
  id: string
  name: string
  email: string
  twoFactorEnabled: boolean
  createdAt: string
  lastLoginAt: string | null
}

type UserRecord = PublicUser & {
  passwordHash: string
  googleSub?: string
  totpSecret?: string
  recoveryHashes: string[]
  failedLogins: number
  lockedUntil: number
  resetCodeHash?: string
  resetExpires?: number
}

type Session = {
  id: string
  userId: string
  createdAt: number
  lastSeen: number
  expiresAt: number
  remember: boolean
  ua: string
  ip: string
  pending2fa?: boolean
}

type Activity = { at: string; event: string; detail: string; ip: string }

const sessions = new Map<string, Session>()
const activity = new Map<string, Activity[]>()

function persistSessions() {
  try {
    writeFileSync(SESSIONS_FILE, JSON.stringify([...sessions.values()]))
  } catch {
    /* keep going if disk is unavailable */
  }
}

function hydrateSessions() {
  try {
    if (!existsSync(SESSIONS_FILE)) return
    const raw = JSON.parse(readFileSync(SESSIONS_FILE, 'utf8')) as Session[]
    if (!Array.isArray(raw)) return
    for (const s of raw) {
      if (s?.id && s.userId) sessions.set(s.id, s)
    }
  } catch {
    /* start with an empty session map */
  }
}

hydrateSessions()

function ensureStore() {
  mkdirSync(dirname(USERS_FILE), { recursive: true })
  if (existsSync(USERS_FILE)) return
  const bundled = resolve(process.cwd(), 'data/users.json')
  if (existsSync(bundled) && bundled !== USERS_FILE) {
    try {
      writeFileSync(USERS_FILE, readFileSync(bundled, 'utf8'))
      return
    } catch {
      /* fall through */
    }
  }
  writeFileSync(USERS_FILE, '[]')
}

function loadUsers(): UserRecord[] {
  ensureStore()
  try {
    return JSON.parse(readFileSync(USERS_FILE, 'utf8')) as UserRecord[]
  } catch {
    return []
  }
}

function saveUsers(users: UserRecord[]) {
  writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
}

function hashPassword(password: string, salt = randomBytes(16).toString('hex')) {
  const hash = scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) return false
  const next = scryptSync(password, salt, 64)
  const prev = Buffer.from(hash, 'hex')
  if (next.length !== prev.length) return false
  return timingSafeEqual(next, prev)
}

function sha(s: string) {
  return createHash('sha256').update(s).digest('hex')
}

function signSessionId(input: { userId: string; remember: boolean; pending2fa: boolean; maxAge: number }) {
  const payload = {
    uid: input.userId,
    rem: input.remember ? 1 : 0,
    p2: input.pending2fa ? 1 : 0,
    exp: Date.now() + input.maxAge,
  }
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const sig = createHmac('sha256', SESSION_SECRET).update(body).digest('base64url')
  return `v1.${body}.${sig}`
}

function readSignedSession(id: string): Session | null {
  if (!id.startsWith('v1.')) return null
  const parts = id.split('.')
  if (parts.length !== 3) return null
  const body = parts[1]
  const sig = parts[2]
  const expect = createHmac('sha256', SESSION_SECRET).update(body).digest('base64url')
  const a = Buffer.from(sig)
  const b = Buffer.from(expect)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  try {
    const p = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as {
      uid?: string
      rem?: number
      p2?: number
      exp?: number
    }
    if (!p.uid || !p.exp || p.exp < Date.now()) return null
    return {
      id,
      userId: p.uid,
      createdAt: Date.now(),
      lastSeen: Date.now(),
      expiresAt: p.exp,
      remember: Boolean(p.rem),
      ua: '',
      ip: '',
      pending2fa: Boolean(p.p2),
    }
  } catch {
    return null
  }
}

function publicUser(u: UserRecord): PublicUser {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    twoFactorEnabled: u.twoFactorEnabled,
    createdAt: u.createdAt,
    lastLoginAt: u.lastLoginAt,
  }
}

function addActivity(userId: string, event: string, detail: string, ip: string) {
  const list = activity.get(userId) ?? []
  list.unshift({ at: new Date().toISOString(), event, detail, ip })
  activity.set(userId, list.slice(0, 40))
}

const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'

function b32encode(buf: Buffer) {
  let bits = 0
  let value = 0
  let out = ''
  for (const byte of buf) {
    value = (value << 8) | byte
    bits += 8
    while (bits >= 5) {
      out += B32[(value >>> (bits - 5)) & 31]
      bits -= 5
    }
  }
  if (bits > 0) out += B32[(value << (5 - bits)) & 31]
  return out
}

function b32decode(s: string) {
  const clean = s.replace(/=+$/, '').toUpperCase()
  let bits = 0
  let value = 0
  const out: number[] = []
  for (const ch of clean) {
    const idx = B32.indexOf(ch)
    if (idx < 0) continue
    value = (value << 5) | idx
    bits += 5
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 255)
      bits -= 8
    }
  }
  return Buffer.from(out)
}

function totp(secret: string, at = Date.now()) {
  const key = b32decode(secret)
  const counter = Math.floor(at / 1000 / 30)
  const msg = Buffer.alloc(8)
  msg.writeUInt32BE(Math.floor(counter / 0x100000000), 0)
  msg.writeUInt32BE(counter >>> 0, 4)
  const hmac = createHmac('sha1', key).update(msg).digest()
  const offset = hmac[hmac.length - 1] & 0xf
  const code = ((hmac[offset] & 0x7f) << 24) | (hmac[offset + 1] << 16) | (hmac[offset + 2] << 8) | hmac[offset + 3]
  return String(code % 1_000_000).padStart(6, '0')
}

function verifyTotp(secret: string, code: string) {
  const now = Date.now()
  return [-1, 0, 1].some((w) => totp(secret, now + w * 30_000) === code)
}

export function seedDemoUser() {
  const users = loadUsers()
  if (users.some((u) => u.email === 'demo@civicai.in')) return
  users.push({
    id: 'u-demo',
    name: 'Vishwajit Desai',
    email: 'demo@civicai.in',
    passwordHash: hashPassword('CivicAI@2026'),
    twoFactorEnabled: false,
    recoveryHashes: [],
    createdAt: new Date().toISOString(),
    lastLoginAt: null,
    failedLogins: 0,
    lockedUntil: 0,
  })
  saveUsers(users)
}

export function registerUser(input: { name: string; email: string; password: string }) {
  const email = input.email.trim().toLowerCase()
  const users = loadUsers()
  if (users.some((u) => u.email === email)) return { error: 'An account with this email already exists. Please sign in.' }
  const user: UserRecord = {
    id: `u-${randomBytes(8).toString('hex')}`,
    name: input.name.trim(),
    email,
    passwordHash: hashPassword(input.password),
    twoFactorEnabled: false,
    recoveryHashes: [],
    createdAt: new Date().toISOString(),
    lastLoginAt: null,
    failedLogins: 0,
    lockedUntil: 0,
  }
  users.push(user)
  saveUsers(users)
  addActivity(user.id, 'register', 'Account created', '')
  return { user: publicUser(user) }
}

export function startLogin(input: { email: string; password: string; remember: boolean; ua: string; ip: string }) {
  const email = input.email.trim().toLowerCase()
  const users = loadUsers()
  const user = users.find((u) => u.email === email)
  if (!user || !verifyPassword(input.password, user.passwordHash)) {
    if (user) {
      user.failedLogins += 1
      if (user.failedLogins >= LOCK_AFTER) user.lockedUntil = Date.now() + LOCK_MS
      saveUsers(users)
      addActivity(user.id, 'failed_login', 'Incorrect password', input.ip)
    }
    return { error: 'Email or password is incorrect.' }
  }
  if (user.lockedUntil > Date.now()) {
    return { error: 'This account is temporarily locked. Try again later.' }
  }
  user.failedLogins = 0
  user.lockedUntil = 0
  user.lastLoginAt = new Date().toISOString()
  saveUsers(users)
  addActivity(user.id, user.twoFactorEnabled ? 'login_2fa_pending' : 'login', 'Signed in', input.ip)
  return issueSession(user, input.remember, input.ua, input.ip)
}

export function complete2fa(sessionId: string, code: string, ip: string) {
  const s = getSession(sessionId)
  if (!s?.pending2fa) return { error: 'Verification is not pending.' }
  const users = loadUsers()
  const user = users.find((u) => u.id === s.userId)
  if (!user?.totpSecret) return { error: 'Verification failed.' }
  const ok = verifyTotp(user.totpSecret, code) || user.recoveryHashes.includes(sha(code.trim().toUpperCase()))
  if (!ok) {
    addActivity(user.id, 'failed_2fa', 'Invalid verification code', ip)
    return { error: 'That verification code is not valid.' }
  }
  if (user.recoveryHashes.includes(sha(code.trim().toUpperCase()))) {
    user.recoveryHashes = user.recoveryHashes.filter((h) => h !== sha(code.trim().toUpperCase()))
    saveUsers(users)
  }
  s.pending2fa = false
  s.lastSeen = Date.now()
  persistSessions()
  addActivity(user.id, 'login', 'Two-factor verified', ip)
  return { user: publicUser(user) }
}

export function getSession(sessionId?: string) {
  if (!sessionId) return null
  let s = sessions.get(sessionId)
  if (!s) {
    const signed = readSignedSession(sessionId)
    if (!signed) return null
    sessions.set(sessionId, signed)
    s = signed
  }
  const now = Date.now()
  const idleExpired = !s.remember && now - s.lastSeen > IDLE_MS
  if (now > s.expiresAt || idleExpired) {
    sessions.delete(sessionId)
    persistSessions()
    return null
  }
  return s
}

export function touch(sessionId: string) {
  const s = getSession(sessionId)
  if (!s) return null
  s.lastSeen = Date.now()
  if (s.remember) s.expiresAt = Date.now() + REMEMBER_MS
  persistSessions()
  const users = loadUsers()
  const user = users.find((u) => u.id === s.userId)
  if (!user || s.pending2fa) return { session: s, user: null as PublicUser | null, pending2fa: true }
  return { session: s, user: publicUser(user), pending2fa: false }
}

export function logout(sessionId?: string) {
  if (sessionId) {
    sessions.delete(sessionId)
    persistSessions()
  }
}

export function logoutAll(userId: string) {
  for (const [id, s] of sessions) if (s.userId === userId) sessions.delete(id)
  persistSessions()
  addActivity(userId, 'logout_all', 'All sessions ended', '')
}

export function listSessions(userId: string, currentId: string) {
  return [...sessions.values()]
    .filter((s) => s.userId === userId && !s.pending2fa)
    .map((s) => ({
      id: s.id,
      current: s.id === currentId,
      createdAt: new Date(s.createdAt).toISOString(),
      lastSeen: new Date(s.lastSeen).toISOString(),
      ua: s.ua,
      ip: s.ip,
    }))
}

export function listActivity(userId: string) {
  return activity.get(userId) ?? []
}

export function changePassword(userId: string, current: string, next: string) {
  const users = loadUsers()
  const user = users.find((u) => u.id === userId)
  if (!user || !verifyPassword(current, user.passwordHash)) return { error: 'Current password is incorrect.' }
  user.passwordHash = hashPassword(next)
  saveUsers(users)
  addActivity(userId, 'password_change', 'Password updated', '')
  return { ok: true }
}

export function requestReset(emailRaw: string) {
  const email = emailRaw.trim().toLowerCase()
  const users = loadUsers()
  const user = users.find((u) => u.email === email)
  const dummy = String(Math.floor(100000 + Math.random() * 900000))
  if (!user) return { mailbox: dummy }
  const code = String(Math.floor(100000 + Math.random() * 900000))
  user.resetCodeHash = sha(code)
  user.resetExpires = Date.now() + 15 * 60 * 1000
  saveUsers(users)
  addActivity(user.id, 'reset_requested', 'Password reset requested', '')
  return { mailbox: code }
}

export function resetPassword(emailRaw: string, code: string, password: string) {
  const email = emailRaw.trim().toLowerCase()
  const users = loadUsers()
  const user = users.find((u) => u.email === email)
  if (!user || !user.resetCodeHash || !user.resetExpires || user.resetExpires < Date.now() || user.resetCodeHash !== sha(code)) {
    return { error: 'That reset code is invalid or has expired.' }
  }
  user.passwordHash = hashPassword(password)
  user.resetCodeHash = undefined
  user.resetExpires = undefined
  saveUsers(users)
  logoutAll(user.id)
  addActivity(user.id, 'password_reset', 'Password reset completed', '')
  return { ok: true }
}

export function begin2fa(userId: string) {
  const secret = b32encode(randomBytes(20))
  return { secret, otpauth: `otpauth://totp/CivicAI:${userId}?secret=${secret}&issuer=CivicAI` }
}

export function confirm2fa(userId: string, secret: string, code: string) {
  if (!verifyTotp(secret, code)) return { error: 'That verification code is not valid.' }
  const users = loadUsers()
  const user = users.find((u) => u.id === userId)
  if (!user) return { error: 'Account not found.' }
  const recovery = Array.from({ length: 8 }, () => randomBytes(4).toString('hex').toUpperCase())
  user.totpSecret = secret
  user.twoFactorEnabled = true
  user.recoveryHashes = recovery.map((c) => sha(c))
  saveUsers(users)
  addActivity(userId, '2fa_enabled', 'Two-factor authentication enabled', '')
  return { recovery }
}

export function disable2fa(userId: string, password: string, code: string) {
  const users = loadUsers()
  const user = users.find((u) => u.id === userId)
  if (!user || !verifyPassword(password, user.passwordHash)) return { error: 'Password is incorrect.' }
  if (!user.totpSecret || (!verifyTotp(user.totpSecret, code) && !user.recoveryHashes.includes(sha(code.trim().toUpperCase())))) {
    return { error: 'Verification failed.' }
  }
  user.twoFactorEnabled = false
  user.totpSecret = undefined
  user.recoveryHashes = []
  saveUsers(users)
  addActivity(userId, '2fa_disabled', 'Two-factor authentication disabled', '')
  return { ok: true }
}

export function deleteAccount(userId: string, password: string) {
  const users = loadUsers()
  const user = users.find((u) => u.id === userId)
  if (!user || !verifyPassword(password, user.passwordHash)) return { error: 'Password is incorrect.' }
  saveUsers(users.filter((u) => u.id !== userId))
  logoutAll(userId)
  return { ok: true }
}

export function parseCookie(header: string | undefined, name: string) {
  if (!header) return ''
  const part = header.split(';').map((s) => s.trim()).find((s) => s.startsWith(`${name}=`))
  return part ? decodeURIComponent(part.slice(name.length + 1)) : ''
}

export function readSessionId(cookie: string | undefined, authorization?: string, custom?: string) {
  const bearer = String(authorization || '').match(/^Bearer\s+(\S+)/i)
  if (bearer?.[1]) return bearer[1]
  if (custom?.trim()) return custom.trim()
  return parseCookie(cookie, 'civicai_session')
}

export function issueSession(user: UserRecord, remember: boolean, ua: string, ip: string) {
  const maxAge = remember ? REMEMBER_MS : IDLE_MS
  const sid = signSessionId({
    userId: user.id,
    remember,
    pending2fa: user.twoFactorEnabled,
    maxAge,
  })
  const now = Date.now()
  const session: Session = {
    id: sid,
    userId: user.id,
    createdAt: now,
    lastSeen: now,
    expiresAt: now + maxAge,
    remember,
    ua: ua.slice(0, 180),
    ip,
    pending2fa: user.twoFactorEnabled,
  }
  sessions.set(sid, session)
  persistSessions()
  return {
    sessionId: sid,
    requires2fa: user.twoFactorEnabled,
    user: user.twoFactorEnabled ? null : publicUser(user),
    maxAge,
  }
}

export function upsertGoogleUser(input: { email: string; name: string; sub: string }) {
  const email = input.email.trim().toLowerCase()
  const users = loadUsers()
  let user = users.find((u) => u.googleSub === input.sub || u.email === email)
  if (!user) {
    user = {
      id: `u-${randomBytes(8).toString('hex')}`,
      name: input.name.trim() || email.split('@')[0],
      email,
      passwordHash: hashPassword(randomBytes(24).toString('hex')),
      googleSub: input.sub,
      twoFactorEnabled: false,
      recoveryHashes: [],
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      failedLogins: 0,
      lockedUntil: 0,
    }
    users.push(user)
    addActivity(user.id, 'register', 'Account created with Google', '')
  } else {
    user.googleSub = input.sub
    if (input.name.trim()) user.name = input.name.trim()
    user.lastLoginAt = new Date().toISOString()
    user.failedLogins = 0
    user.lockedUntil = 0
    addActivity(user.id, 'login', 'Signed in with Google', '')
  }
  saveUsers(users)
  return user
}

export function cookieHeader(id: string, maxAge: number, secure = false) {
  const parts = [
    `civicai_session=${id}`,
    'HttpOnly',
    'Path=/',
    `Max-Age=${Math.max(1, Math.floor(maxAge / 1000))}`,
  ]
  if (secure) parts.push('SameSite=None', 'Secure', 'Partitioned')
  else parts.push('SameSite=Lax')
  return parts.join('; ')
}

export function clearCookie(secure = false) {
  if (secure) return 'civicai_session=; HttpOnly; Path=/; SameSite=None; Secure; Partitioned; Max-Age=0'
  return 'civicai_session=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0'
}
