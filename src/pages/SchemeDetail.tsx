import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { EligibilityQuestionnaire } from '../components/schemes/EligibilityQuestionnaire'
import { Disclaimer } from '../components/ui/Disclaimer'
import { SourceCitation } from '../components/ui/SourceCitation'
import { useLang } from '../context/LanguageContext'
import { getScheme } from '../data/schemes'
import { DEFAULT_ANSWERS, loc, matchSchemes } from '../services/api'
import type { EligibilityAnswers } from '../types'

export function SchemeDetail() {
  const { id } = useParams()
  const { lang, tr } = useLang()
  const scheme = id ? getScheme(id) : undefined
  const [answers, setAnswers] = useState<EligibilityAnswers>(DEFAULT_ANSWERS)
  const [applied, setApplied] = useState<EligibilityAnswers>(DEFAULT_ANSWERS)
  const match = useMemo(() => (scheme ? matchSchemes(applied, [scheme.id])[0] : undefined), [applied, scheme])

  if (!scheme) {
    return (
      <div className="card p-6">
        <p>{tr('notFound')}</p>
        <Link to="/schemes" className="mt-2 inline-block underline">
          {tr('back')}
        </Link>
      </div>
    )
  }

  const sat = match?.evaluations.filter((e) => e.result === 'satisfied') ?? []
  const uns = match?.evaluations.filter((e) => e.result === 'not_satisfied') ?? []
  const pend = match?.evaluations.filter((e) => e.result === 'needs_confirmation') ?? []

  return (
    <div className="grid gap-6">
      <Link to="/schemes" className="text-sm text-navy-700 underline">
        {tr('back')}
      </Link>
      <h1 className="text-3xl font-semibold text-navy-900">{loc(scheme.name, lang)}</h1>
      <Disclaimer kind="eligibility" />
      <p className="max-w-3xl text-ink-700">{loc(scheme.shortDescription, lang)}</p>
      <p className="text-sm text-ink-500">{scheme.department}</p>
      <SourceCitation source={scheme.officialSource} />
      <section className="card p-5">
        <h2 className="font-semibold">{tr('benefits')}</h2>
        <p className="mt-2 text-sm">{loc(scheme.benefits, lang)}</p>
      </section>
      <EligibilityQuestionnaire value={answers} onChange={setAnswers} onSubmit={() => setApplied(answers)} />
      {match && (
        <div className="grid gap-4 md:grid-cols-3">
          <article className="card p-4">
            <h3 className="font-semibold text-ok-700">{tr('satisfied')}</h3>
            <ul className="mt-2 list-disc pl-5 text-sm">
              {sat.map((e) => (
                <li key={e.rule.id}>{loc(e.rule.label, lang)}</li>
              ))}
              {sat.length === 0 && <li>—</li>}
            </ul>
          </article>
          <article className="card p-4">
            <h3 className="font-semibold text-bad-700">{tr('notSatisfied')}</h3>
            <ul className="mt-2 list-disc pl-5 text-sm">
              {uns.map((e) => (
                <li key={e.rule.id}>{loc(e.rule.label, lang)}</li>
              ))}
              {uns.length === 0 && <li>—</li>}
            </ul>
          </article>
          <article className="card p-4">
            <h3 className="font-semibold text-warn-700">{tr('confirmNeeded')}</h3>
            <ul className="mt-2 list-disc pl-5 text-sm">
              {pend.map((e) => (
                <li key={e.rule.id}>{loc(e.rule.label, lang)}</li>
              ))}
              {pend.length === 0 && <li>—</li>}
            </ul>
          </article>
        </div>
      )}
      <section className="card p-5">
        <h2 className="font-semibold">{tr('reqDocs')}</h2>
        <ul className="mt-2 list-disc pl-5">
          {scheme.requiredDocuments.map((d) => (
            <li key={d.en}>{loc(d, lang)}</li>
          ))}
        </ul>
      </section>
      <a className="inline-flex w-fit rounded-lg bg-navy-900 px-4 py-2 font-semibold text-white" href={scheme.officialSource.url} target="_blank" rel="noreferrer">
        {tr('openOfficial')}
      </a>
    </div>
  )
}
