export function isStandalone() {
  try {
    if (import.meta.env.VITE_STANDALONE === '1') return true
    if (typeof window !== 'undefined' && window.location.protocol === 'file:') return true
  } catch {
    /* ignore */
  }
  return false
}

export const STANDALONE_USER = {
  id: 'u-offline',
  name: 'CivicAI Guest',
  email: 'guest@civicai.local',
  twoFactorEnabled: false,
  createdAt: '2026-08-20T00:00:00.000Z',
  lastLoginAt: '2026-08-20T00:00:00.000Z',
}
