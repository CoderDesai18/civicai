import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { authPlugin } from './server/authPlugin.ts'
import { answerCivic } from './server/aiCore.ts'

function loadLocalEnv() {
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

function attachAi(server: {
  middlewares: {
    use: (
      path: string,
      fn: (req: import('http').IncomingMessage, res: import('http').ServerResponse, next: () => void) => void,
    ) => void
  }
}) {
  server.middlewares.use('/api/ai', (req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.statusCode = 204
      res.end()
      return
    }
    if (req.method !== 'POST') {
      next()
      return
    }
    const chunks: Buffer[] = []
    req.on('data', (c) => chunks.push(c as Buffer))
    req.on('end', () => {
      void (async () => {
        try {
          const body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}') as {
            question?: string
            context?: string
            language?: string
          }
          const result = await answerCivic(body)
          res.statusCode = result.status
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(result.body))
        } catch {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'AI proxy error.' }))
        }
      })()
    })
  })
}

function aiProxy(): Plugin {
  loadLocalEnv()
  return {
    name: 'civicai-ai-proxy',
    configureServer(server) {
      attachAi(server)
    },
    configurePreviewServer(server) {
      attachAi(server)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), authPlugin(), aiProxy()],
  appType: 'spa',
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: true,
  },
})
