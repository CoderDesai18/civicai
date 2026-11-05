import type { Plugin } from 'vite'
import { handleAuthRequest } from './handleAuth.ts'

export function authPlugin(): Plugin {
  return {
    name: 'civicai-auth',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        void handleAuthRequest(req, res, next)
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        void handleAuthRequest(req, res, next)
      })
    },
  }
}
