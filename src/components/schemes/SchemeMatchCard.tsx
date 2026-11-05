import { Link } from 'react-router-dom'
import { useLang } from '../../context/LanguageContext'
import { loc } from '../../services/api'
import type { Scheme, SchemeMatch } from '../../types'
import { SourceCitation } from '../ui/SourceCitation'

export function SchemeMatchCard({
  scheme,
  match,
}: {
  scheme: Scheme
  match?: SchemeMatch
}) {
  const { lang, tr } = useLang()
  return (
    <article className="card flex flex-col gap-3 p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-navy-900">{loc(scheme.name, lang)}</h3>
        <span className="rounded-full bg-navy-50 px-2 py-0.5 text-xs font-semibold uppercase text-navy-700">
          {scheme.category}
        </span>
      </div>
      <p className="text-sm text-ink-700">{loc(scheme.shortDescription, lang)}</p>
      {match && <p className="text-sm"><span className="font-medium">{tr('whyMatch')}: </span>{loc(match.why, lang)}</p>}
      <div>
        <p className="text-sm font-medium">{tr('eligibility')}</p>
        <ul className="mt-1 list-disc pl-5 text-sm text-ink-700">
          {scheme.eligibility.map((r) => (
            <li key={r.id}>
              {loc(r.label, lang)}
              {match && (
                <span className="ml-1 text-xs font-semibold">
                  ·{' '}
                  {(() => {
                    const res = match.evaluations.find((e) => e.rule.id === r.id)?.result
                    if (res === 'satisfied') return tr('ruleSatisfied')
                    if (res === 'not_satisfied') return tr('ruleNot')
                    return tr('rulePending')
                  })()}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-sm font-medium">{tr('reqDocs')}</p>
        <ul className="mt-1 list-disc pl-5 text-sm">
          {scheme.requiredDocuments.map((d) => (
            <li key={d.en}>{loc(d, lang)}</li>
          ))}
        </ul>
      </div>
      <SourceCitation source={scheme.officialSource} compact />
      <p className="text-xs font-medium text-saffron-600">{tr('prelimMatch')}</p>
      <div className="mt-auto flex flex-wrap gap-2">
        <Link className="rounded-md bg-navy-900 px-3 py-1.5 text-sm font-medium text-white" to={`/schemes/${scheme.id}`}>
          {tr('checkEligibility')}
        </Link>
        <a className="rounded-md border border-line px-3 py-1.5 text-sm" href={scheme.officialSource.url} target="_blank" rel="noreferrer">
          {tr('openOfficial')}
        </a>
      </div>
    </article>
  )
}
