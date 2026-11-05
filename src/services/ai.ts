import { isStandalone } from '../standalone'
import { offlineCivicAnswer } from './offlineAnswer'

export async function askCivicAI(opts: {
  question: string
  context?: string
  language?: 'en' | 'hi' | 'mr'
}): Promise<{ text: string; error?: string; offline?: boolean }> {
  const language = opts.language || 'en'
  const offline = isStandalone() || (typeof window !== 'undefined' && window.location.protocol === 'file:')

  if (!offline) {
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(opts),
      })
      const data = (await res.json()) as { text?: string; error?: string }
      if (res.ok && data.text) return { text: data.text }
    } catch {
      /* fall through to the offline library */
    }
  }

  return { text: offlineCivicAnswer(opts.question, language), offline: true }
}
