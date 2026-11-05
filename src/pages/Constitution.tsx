import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Disclaimer } from '../components/ui/Disclaimer'
import { useLang } from '../context/LanguageContext'
import { ALL_ARTICLES, CONSTITUTION_CATEGORIES, searchArticles } from '../data/constitution'
import { loc } from '../services/api'

export function Constitution() {
  const { lang, tr } = useLang()
  const [params] = useSearchParams()
  const [q, setQ] = useState(params.get('q') ?? '')
  const [cat, setCat] = useState(params.get('cat') ?? 'all')
  const list = useMemo(() => {
    return searchArticles(q).filter((a) => cat === 'all' || a.category === cat)
  }, [q, cat])

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-semibold text-navy-900">{tr('exploreConst')}</h1>
      <Disclaimer kind="legal" />
      <p className="text-sm">{tr('legalInfoNotice')}</p>
      <div className="flex flex-wrap gap-3">
        <label className="text-sm">
          {tr('searchLaws')}
          <input className="ml-2 rounded-md border border-line px-3 py-2" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Article 21" />
        </label>
        <label className="text-sm">
          {tr('filter')}
          <select className="ml-2 rounded-md border border-line px-3 py-2" value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="all">{tr('allCategories')}</option>
            {CONSTITUTION_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {loc(c.label, lang)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex flex-wrap gap-2">
        {CONSTITUTION_CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`rounded-full px-3 py-1 text-sm ${cat === c.id ? 'bg-navy-900 text-white' : 'border border-line'}`}
            onClick={() => setCat(c.id)}
          >
            {loc(c.label, lang)}
          </button>
        ))}
      </div>
      {q && list.length === 0 && <p className="card p-4">{tr('noReliable')}</p>}
      <div className="grid gap-3 md:grid-cols-2">
        {list.map((a) => (
          <Link key={a.id} to={`/constitution/${a.id}`} className="card p-4 hover:border-navy-600">
            <p className="text-xs font-semibold uppercase text-navy-600">
              {a.article === 'Preamble' ? a.article : `Article ${a.article}`}
            </p>
            <h2 className="font-semibold text-navy-900">{loc(a.title, lang)}</h2>
            <p className="mt-1 line-clamp-3 text-sm text-ink-600">{loc(a.covers, lang)}</p>
          </Link>
        ))}
      </div>
      <p className="text-xs text-ink-500">
        {ALL_ARTICLES.length} articles from the Constitution of India (as on 1 May 2026, Legislative Department) · {tr('lastVerifiedHint')}
      </p>
    </div>
  )
}
