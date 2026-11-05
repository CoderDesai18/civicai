import type { AuthUser } from './auth'

type FirebaseUserLite = {
  uid: string
  email: string | null
  displayName: string | null
  metadata?: { creationTime?: string }
}

export function isFirebaseConfigured() {
  return Boolean(import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID)
}

function mapUser(u: FirebaseUserLite): AuthUser {
  return {
    id: `fb-${u.uid}`,
    name: u.displayName || (u.email ? u.email.split('@')[0] : 'CivicAI user'),
    email: u.email || '',
    twoFactorEnabled: false,
    createdAt: u.metadata?.creationTime ? new Date(u.metadata.creationTime).toISOString() : new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  }
}

function firebaseError(err: unknown) {
  const code = typeof err === 'object' && err && 'code' in err ? String((err as { code: string }).code) : ''
  const table: Record<string, string> = {
    'auth/invalid-email': 'Enter a valid email address.',
    'auth/user-disabled': 'This account is disabled.',
    'auth/user-not-found': 'Email or password is incorrect.',
    'auth/wrong-password': 'Email or password is incorrect.',
    'auth/invalid-credential': 'Email or password is incorrect.',
    'auth/email-already-in-use': 'An account with this email already exists. Please sign in.',
    'auth/weak-password': 'Password is too weak. Use at least 6 characters.',
    'auth/popup-closed-by-user': 'Google sign-in was cancelled.',
    'auth/popup-blocked': 'Allow pop-ups for Google sign-in, or open CivicAI in a new tab.',
    'auth/operation-not-allowed': 'That sign-in method is not enabled in Firebase Authentication.',
    'auth/network-request-failed': 'Could not reach Firebase. Check your network.',
    'auth/too-many-requests': 'Too many attempts. Try again later.',
    'auth/unauthorized-domain': unauthorizedDomainMessage(),
    'auth/unauthorized-continue-uri': unauthorizedDomainMessage(),
    'auth/iframe-cannot-process-request':
      'Google sign-in cannot run inside the preview frame. Open CivicAI in a new tab, then try Google again.',
    'auth/internal-error': 'Firebase could not complete that request. Try again, or open CivicAI in a new tab.',
  }
  if (code && table[code]) return table[code]
  return err instanceof Error ? err.message : 'Firebase authentication failed.'
}

export function currentAuthHost() {
  return typeof window !== 'undefined' ? window.location.hostname : ''
}

export function unauthorizedDomainMessage() {
  const host = currentAuthHost()
  return host
    ? `Add this preview host to Firebase Authorized domains: ${host}`
    : 'This site is not in Firebase Authorized domains.'
}

async function authMod() {
  const [{ initializeApp, getApps }, authNs] = await Promise.all([import('firebase/app'), import('firebase/auth')])
  const config = {
    apiKey: String(import.meta.env.VITE_FIREBASE_API_KEY || ''),
    authDomain: String(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || ''),
    projectId: String(import.meta.env.VITE_FIREBASE_PROJECT_ID || ''),
    storageBucket: String(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || ''),
    messagingSenderId: String(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || ''),
    appId: String(import.meta.env.VITE_FIREBASE_APP_ID || ''),
  }
  const app = getApps()[0] ?? initializeApp(config)
  return { auth: authNs.getAuth(app), authNs }
}

export async function firebaseSignIn(email: string, password: string, remember: boolean) {
  const { auth, authNs } = await authMod()
  await authNs.setPersistence(auth, remember ? authNs.browserLocalPersistence : authNs.browserSessionPersistence)
  try {
    const cred = await authNs.signInWithEmailAndPassword(auth, email, password)
    return { user: mapUser(cred.user), idToken: await cred.user.getIdToken() }
  } catch (err) {
    throw new Error(firebaseError(err))
  }
}

export async function firebaseRegister(name: string, email: string, password: string) {
  const { auth, authNs } = await authMod()
  await authNs.setPersistence(auth, authNs.browserLocalPersistence)
  try {
    const cred = await authNs.createUserWithEmailAndPassword(auth, email, password)
    if (name.trim()) await authNs.updateProfile(cred.user, { displayName: name.trim() })
    return { user: mapUser({ ...cred.user, displayName: name.trim() || cred.user.displayName }), idToken: await cred.user.getIdToken() }
  } catch (err) {
    throw new Error(firebaseError(err))
  }
}

export async function firebaseGoogle() {
  const { auth, authNs } = await authMod()
  await authNs.setPersistence(auth, authNs.browserLocalPersistence)
  const provider = new authNs.GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })
  try {
    const cred = await authNs.signInWithPopup(auth, provider)
    return { user: mapUser(cred.user), idToken: await cred.user.getIdToken() }
  } catch (err) {
    const code = typeof err === 'object' && err && 'code' in err ? String((err as { code: string }).code) : ''
    if (code === 'auth/popup-blocked' || code === 'auth/cancelled-popup-request') {
      try {
        await authNs.signInWithRedirect(auth, provider)
        return null
      } catch (e2) {
        throw new Error(firebaseError(e2))
      }
    }
    throw new Error(firebaseError(err))
  }
}

export async function firebaseReset(email: string) {
  const { auth, authNs } = await authMod()
  try {
    await authNs.sendPasswordResetEmail(auth, email)
  } catch (err) {
    throw new Error(firebaseError(err))
  }
}

export async function firebaseSignOut() {
  if (!isFirebaseConfigured()) return
  const { auth, authNs } = await authMod()
  await authNs.signOut(auth)
}

export async function listenFirebase(cb: (user: AuthUser | null, idToken: string | null) => void) {
  if (!isFirebaseConfigured()) return () => undefined
  const { auth, authNs } = await authMod()
  try {
    const red = await authNs.getRedirectResult(auth)
    if (red.user) cb(mapUser(red.user), await red.user.getIdToken())
  } catch {
    /* no redirect result */
  }
  return authNs.onAuthStateChanged(auth, (u) => {
    void (async () => {
      if (!u) {
        cb(null, null)
        return
      }
      cb(mapUser(u), await u.getIdToken())
    })()
  })
}
