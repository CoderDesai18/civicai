import { ANALYSES, DEMO_DOCS, genericAnalysis } from '../data/documents'
import { EXTRA_ANALYSES } from '../data/extraAnalyses'
import { SCHEMES } from '../data/schemes'
import type {
  AnalysisResult,
  EligibilityAnswers,
  EligibilityRule,
  Lang,
  Localized,
  RuleEval,
  Scheme,
  SchemeMatch,
} from '../types'

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function runAnalysis(opts: {
  demoId?: string
  fileName?: string
}): Promise<AnalysisResult> {
  await wait(280)
  if (opts.demoId) {
    if (EXTRA_ANALYSES[opts.demoId]) return structuredClone(EXTRA_ANALYSES[opts.demoId])
    const demo = DEMO_DOCS.find((d) => d.id === opts.demoId)
    if (demo && ANALYSES[demo.analysisId]) {
      return structuredClone(ANALYSES[demo.analysisId])
    }
    if (ANALYSES[opts.demoId]) return structuredClone(ANALYSES[opts.demoId])
  }
  if (opts.fileName) {
    const byFile = Object.values(ANALYSES).find((a) => a.documentName === opts.fileName)
    if (byFile) return structuredClone(byFile)
    return genericAnalysis(opts.fileName)
  }
  return genericAnalysis('untitled')
}

function evalRule(rule: EligibilityRule, a: EligibilityAnswers): RuleEval['result'] {
  const raw = (a as unknown as Record<string, unknown>)[rule.field]
  if (raw === undefined || raw === null || raw === '' || raw === 'prefer_not') return 'needs_confirmation'
  if (rule.field === 'income' && (a.income === null || Number.isNaN(a.income))) return 'needs_confirmation'
  if (rule.field === 'domicileMh' && a.domicileMh === 'unsure') return 'needs_confirmation'
  if (rule.field === 'socialCategory' && a.socialCategory === 'prefer_not') return 'needs_confirmation'

  switch (rule.operator) {
    case 'eq':
      return raw === rule.value ? 'satisfied' : 'not_satisfied'
    case 'lte':
      return typeof raw === 'number' && typeof rule.value === 'number' && raw <= rule.value
        ? 'satisfied'
        : 'not_satisfied'
    case 'gte':
      return typeof raw === 'number' && typeof rule.value === 'number' && raw >= rule.value
        ? 'satisfied'
        : 'not_satisfied'
    case 'in':
      return Array.isArray(rule.value) && rule.value.map(String).includes(String(raw))
        ? 'satisfied'
        : 'not_satisfied'
    case 'truthy':
      return raw === true || raw === 'yes' ? 'satisfied' : 'not_satisfied'
    default:
      return 'needs_confirmation'
  }
}

function whyMatch(scheme: Scheme, evaluations: RuleEval[]): Localized {
  const sat = evaluations.filter((e) => e.result === 'satisfied').length
  const miss = evaluations.filter((e) => e.result === 'not_satisfied').length
  const pend = evaluations.filter((e) => e.result === 'needs_confirmation').length
  return {
    en: `${scheme.name.en}: ${sat} condition(s) match the answers you typed, ${miss} do not, ${pend} still need confirmation. This is not a decision.`,
    hi: `${scheme.name.hi}: आपके उत्तरों से ${sat} शर्तें मेल खाती हैं, ${miss} नहीं, ${pend} की पुष्टि बाकी है। यह निर्णय नहीं है।`,
    mr: `${scheme.name.mr}: तुमच्या उत्तरांशी ${sat} अटी जुळतात, ${miss} जुळत नाहीत, ${pend} पुष्टी बाकी. हा निर्णय नाही.`,
  }
}

export function matchSchemes(answers: EligibilityAnswers, schemeIds?: string[]): SchemeMatch[] {
  const pool = schemeIds ? SCHEMES.filter((s) => schemeIds.includes(s.id)) : SCHEMES
  return pool
    .map((scheme) => {
      const evaluations = scheme.eligibility.map((rule) => ({
        rule,
        result: evalRule(rule, answers),
      }))
      const sat = evaluations.filter((e) => e.result === 'satisfied').length
      const miss = evaluations.filter((e) => e.result === 'not_satisfied').length
      const total = evaluations.length || 1
      const score = sat / total - miss * 0.15
      return { scheme, evaluations, score, why: whyMatch(scheme, evaluations) }
    })
    .sort((a, b) => b.score - a.score)
}

export function loc(text: Localized, lang: Lang): string {
  return text[lang]
}

export function sourceTypeLabel(type: string): string {
  switch (type) {
    case 'myscheme':
      return 'myScheme'
    case 'digilocker':
      return 'DigiLocker'
    case 'indiacode':
      return 'India Code'
    case 'department':
      return 'Official department portal'
    case 'state':
      return 'State government portal'
    default:
      return type
  }
}

export const DEFAULT_ANSWERS: EligibilityAnswers = {
  state: 'MH',
  district: 'Pune',
  ageGroup: '18-25',
  categoryUser: 'student',
  income: 180000,
  gender: 'prefer_not',
  disability: 'prefer_not',
  socialCategory: 'GEN',
  education: 'ug',
  employment: 'student',
  domicileMh: 'yes',
}
