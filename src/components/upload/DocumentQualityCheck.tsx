import { useLang } from '../../context/LanguageContext'
import { loc } from '../../services/api'
import type { QualityIssue } from '../../types'

export function DocumentQualityCheck({
  issues,
  onRetake,
  onClearer,
  onContinue,
}: {
  issues: QualityIssue[]
  onRetake: () => void
  onClearer: () => void
  onContinue: () => void
}) {
  const { lang, tr } = useLang()
  return (
    <section className="card p-5">
      <h2 className="text-xl font-semibold text-navy-900">{tr('qualityTitle')}</h2>
      <p className="mt-1 text-sm text-ink-500">
        CivicAI will not silently present an unreliable extraction as a fact.
      </p>
      <ul className="mt-4 grid gap-3">
        {issues.map((issue) => (
          <li key={issue.type} className="rounded-lg border border-warn-100 bg-warn-100/50 p-3">
            <p className="text-xs font-semibold uppercase text-warn-700">{tr('issue')}</p>
            <p className="mt-1 text-ink-900">{loc(issue.message, lang)}</p>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" className="rounded-lg border border-line px-4 py-2 text-sm font-medium" onClick={onRetake}>
          {tr('retake')}
        </button>
        <button type="button" className="rounded-lg border border-line px-4 py-2 text-sm font-medium" onClick={onClearer}>
          {tr('clearer')}
        </button>
        <button
          type="button"
          className="rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white"
          onClick={onContinue}
        >
          {tr('continueLow')}
        </button>
      </div>
    </section>
  )
}
