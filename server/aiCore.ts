export function civicPrompt(question: string, context: string, language: string) {
  return `You are CivicAI, an informational assistant for Indian citizens about government documents and published law.
Rules:
- This is NOT legal advice and NOT an official government decision.
- Never say someone is definitely eligible, that a clause is illegal, or that they will win a case.
- Never invent Acts, Articles, sections, fees, deadlines, or official URLs.
- If you are not sure, say: "Source verification required." or "Reliable official information was not found for this question."
- Prefer the provided document/context over general knowledge.
- If the question asks about a document and the fact is not in the context, say you could not find it in the uploaded document.
- Answer in ${language}, in short plain paragraphs.
- End with: "CivicAI provides informational assistance, not professional legal advice."

Context (may be empty):
${context || '(no document context)'}

User question:
${question}`
}

export async function askDeepseek(prompt: string): Promise<{ ok: boolean; text: string; error?: string }> {
  const key = process.env.DEEPSEEK_API_KEY
  if (!key) return { ok: false, text: '', error: 'DeepSeek not configured' }
  const base = (process.env.DEEPSEEK_BASE || 'https://api.deepseek.com/v1').replace(/\/$/, '')
  const model = process.env.DEEPSEEK_MODEL || 'deepseek-chat'
  const res = await fetch(`${base}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      max_tokens: 800,
      messages: [
        { role: 'system', content: 'You are CivicAI. Follow the user instructions exactly.' },
        { role: 'user', content: prompt },
      ],
    }),
  })
  const data = (await res.json()) as {
    error?: { message?: string }
    choices?: { message?: { content?: string } }[]
  }
  if (!res.ok) {
    return { ok: false, text: '', error: data.error?.message || `DeepSeek ${res.status}` }
  }
  const text = data.choices?.[0]?.message?.content?.trim() || ''
  return { ok: Boolean(text), text }
}

export async function askGemini(prompt: string): Promise<{ ok: boolean; text: string; error?: string }> {
  const key = process.env.GEMINI_API_KEY
  if (!key) return { ok: false, text: '', error: 'Gemini not configured' }
  const model = process.env.GEMINI_MODEL || 'gemini-3.6-flash'
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': key,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.2, maxOutputTokens: 800 },
    }),
  })
  const data = (await res.json()) as {
    error?: { message?: string }
    candidates?: { content?: { parts?: { text?: string }[] } }[]
  }
  if (!res.ok) {
    return { ok: false, text: '', error: data.error?.message || `Gemini ${res.status}` }
  }
  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('\n').trim() || ''
  return { ok: Boolean(text), text }
}

export async function answerCivic(input: { question?: string; context?: string; language?: string }) {
  const question = String(input.question || '').slice(0, 4000)
  const context = String(input.context || '').slice(0, 12000)
  const language = input.language === 'hi' ? 'Hindi' : input.language === 'mr' ? 'Marathi' : 'English'
  if (!question) return { status: 400 as const, body: { error: 'Question required.' } }
  const prompt = civicPrompt(question, context, language)
  const first = await askDeepseek(prompt)
  if (first.ok) return { status: 200 as const, body: { text: first.text, provider: 'deepseek' } }
  const second = await askGemini(prompt)
  if (second.ok) return { status: 200 as const, body: { text: second.text, provider: 'gemini' } }
  return {
    status: 502 as const,
    body: { error: second.error || first.error || 'Both AI providers failed.' },
  }
}
