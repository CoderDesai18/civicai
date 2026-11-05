import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { searchTerms } from '../data/legalTerms'
import { loc } from '../services/api'

export function Dictionary() {
  const { lang, tr } = useLang()
  const [q, setQ] = useState('')
  const list = useMemo(() => searchTerms(q), [q])
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-semibold text-navy-900">{tr('legalDict')}</h1>
      <p className="text-sm">{tr('legalInfoNotice')}</p>
      <input className="max-w-md rounded-md border border-line px-3 py-2" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Indemnity" />
      {q && list.length === 0 && <p>{tr('noReliable')}</p>}
      <div className="grid gap-3 md:grid-cols-2">
        {list.map((t) => (
          <Link key={t.id} to={`/dictionary/${t.id}`} className="card p-4 hover:border-navy-600">
            <h2 className="font-semibold">{loc(t.term, lang)}</h2>
            <p className="mt-1 line-clamp-3 text-sm text-ink-600">{loc(t.simpleMeaning, lang)}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
