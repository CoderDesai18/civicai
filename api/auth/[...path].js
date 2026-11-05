import { handleAuthRequest } from '../../server/handleAuth.ts'

export default async function handler(req, res) {
  const parts = req.query?.path
  const tail = Array.isArray(parts) ? parts.join('/') : String(parts || '')
  if (!String(req.url || '').startsWith('/api/auth')) {
    req.url = `/api/auth/${tail}`
  }
  await handleAuthRequest(req, res, () => {
    res.statusCode = 404
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Unknown auth route.' }))
  })
}
