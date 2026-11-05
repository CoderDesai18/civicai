import { searchArticles } from '../data/constitution'
import { answerQuestion } from '../data/groundedAnswers'
import { searchLaws } from '../data/laws'
import { searchTerms } from '../data/legalTerms'
import { loc } from './api'
import type { Lang } from '../types'

const DISCLAIMER =
  'CivicAI provides informational assistance, not professional legal advice. Verify on official portals such as India Code and legislative.gov.in. This is not a finding of eligibility, illegality, or a court result.'

export function offlineCivicAnswer(question: string, language: Lang = 'en'): string {
  const q = question.trim()
  if (!q) return `Please type a question first.\n\n${DISCLAIMER}`

  const grounded = answerQuestion(q)
  const articles = searchArticles(q).slice(0, 3)
  const laws = searchLaws(q).slice(0, 2)
  const terms = searchTerms(q).slice(0, 3)
  const parts: string[] = []

  if (grounded) {
    parts.push(loc(grounded.answer, language))
    if (grounded.source?.url) {
      parts.push(`Official page to verify: ${grounded.source.title} — ${grounded.source.url}`)
    }
  }

  if (articles.length) {
    for (const a of articles) {
      const heading = a.article === 'Preamble' ? 'Preamble' : `Article ${a.article}`
      parts.push(`${heading} — ${loc(a.title, language)}.`)
      if (a.officialText) parts.push(`Official text (as on 1 May 2026):\n${a.officialText}`)
      parts.push(loc(a.simplified, language))
      if (a.officialSource?.url) parts.push(`Read the official Constitution: ${a.officialSource.url}`)
    }
  }

  if (laws.length) {
    for (const { law, sectionIds } of laws) {
      parts.push(`${loc(law.name, language)}. ${loc(law.summary, language)}`)
      const section = law.sections.find((s) => sectionIds.includes(s.id)) || law.sections[0]
      if (section) parts.push(`Published section ${section.number} (${loc(section.title, language)}): ${loc(section.simplified, language)}`)
      if (law.officialSource?.url) parts.push(`Verify the Act on India Code: ${law.officialSource.url}`)
    }
  }

  if (terms.length) {
    for (const t of terms) {
      parts.push(`${loc(t.term, language)}: ${loc(t.simpleMeaning, language)}`)
    }
  }

  if (!parts.length) {
    return [
      `Reliable official information was not found in CivicAI’s offline library for “${q}”.`,
      'Try a published topic such as Article 21, Article 14, indemnity, Consumer Protection Act, RTI, or personal data / DPDP.',
      'This downloaded file cannot call the live AI service. Open CivicAI from the hosted preview for a generated answer.',
      DISCLAIMER,
    ].join('\n\n')
  }

  parts.push(
    'This answer was prepared from CivicAI’s offline library (published Constitution / Act summaries and dictionary). It is not a live model reply and not legal advice.',
  )
  parts.push(DISCLAIMER)
  return parts.join('\n\n')
}
