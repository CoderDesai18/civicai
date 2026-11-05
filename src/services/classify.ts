export function classifyFile(name: string, type: string): {
  type: string
  confidence: 'high' | 'medium' | 'low'
  demoId?: string
} {
  const n = name.toLowerCase()
  if (/rent|lease|licence|license|tenant/.test(n)) return { type: 'rent', confidence: 'high', demoId: 'demo-rent' }
  if (/scholar|mahadbt|income|domicile|certificate/.test(n)) {
    if (/domicile/.test(n)) return { type: 'government', confidence: 'high', demoId: 'demo-domicile' }
    if (/income/.test(n)) return { type: 'government', confidence: 'high', demoId: 'demo-income' }
    return { type: 'government', confidence: 'high', demoId: 'demo-scholarship' }
  }
  if (/employ|offer|appointment/.test(n)) return { type: 'employment', confidence: 'medium', demoId: 'demo-employment' }
  if (/loan|credit/.test(n)) return { type: 'loan', confidence: 'medium', demoId: 'demo-loan' }
  if (/insur|policy/.test(n)) return { type: 'insurance', confidence: 'medium', demoId: 'demo-insurance' }
  if (type.startsWith('image/')) return { type: 'unknown', confidence: 'low' }
  return { type: 'unknown', confidence: 'low' }
}
