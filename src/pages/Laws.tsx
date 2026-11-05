import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Disclaimer } from '../components/ui/Disclaimer'
import { useLang } from '../context/LanguageContext'
import { allLaws, searchLaws } from '../data/laws'
import { loc } from '../services/api'

export function Laws() {
  const { lang, tr } = useLang()
  const [params] = useSearchParams()
  const [q, setQ] = useState(params.get('q') ?? '')
  const results = useMemo(() => searchLaws(q), [q])

  return (
    <div className="grid gap-6">
      <header>
        <h1 className="text-3xl font-semibold text-navy-900">{tr('understandLaw')}</h1>
        <p className="mt-1 text-ink-500">{tr('generalInfo')}</p>
      </header>
      <Disclaimer kind="legal" />
      <label className="grid max-w-xl gap-1 text-sm">
        {tr('searchLaws')}
        <input className="rounded-md border border-line px-3 py-2" value={q} onChange={(e) => setQ(e.target.value)} />
      </label>
      <button type="button" className="w-fit text-sm text-navy-700 underline" onClick={() => setQ('misuses personal data')}>
        {tr('sampleQuestion')}
      </button>
      {q && results.length === 0 && (
        <p className="rounded-lg border border-warn-100 bg-warn-100/50 p-4">{tr('noReliable')}</p>
      )}
      <div className="grid gap-4">
        {results.map(({ law, sectionIds }) => (
          <article key={law.id} className="card p-5">
            <h2 className="text-xl font-semibold text-navy-900">{loc(law.name, lang)}</h2>
            <p className="mt-2 text-sm text-ink-700">{loc(law.summary, lang)}</p>
            <p className="mt-2 text-xs text-ink-500">
              {tr('officialSource')}: {law.officialSource.title}
            </p>
            <ul className="mt-3 grid gap-2">
              {law.sections
                .filter((s) => sectionIds.includes(s.id))
                .map((s) => (
                  <li key={s.id}>
                    <Link className="font-medium text-navy-800 underline" to={`/laws/${law.id}#${s.id}`}>
                      Section {s.number} — {loc(s.title, lang)}
                    </Link>
                  </li>
                ))}
            </ul>
            <Link className="mt-3 inline-block text-sm underline" to={`/laws/${law.id}`}>
              {tr('openExplainer')}
            </Link>
          </article>
        ))}
        {!q &&
          allLaws().map((law) => (
            <article key={law.id} className="card p-5">
              <h2 className="text-xl font-semibold">{loc(law.name, lang)}</h2>
              <p className="mt-2 text-sm">{loc(law.summary, lang)}</p>
              <Link className="mt-3 inline-block text-navy-700 underline" to={`/laws/${law.id}`}>
                {tr('open')}
              </Link>
            </article>
          ))}
      </div>
    </div>
  )
}
