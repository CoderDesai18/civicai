import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useLang } from '../context/LanguageContext'
import { loc } from '../services/api'

export function Checklists() {
  const { tr, lang } = useLang()
  const { checklists, analysis } = useApp()
  const items = checklists.length
    ? checklists
    : analysis
      ? [
          {
            id: 'current',
            title: analysis.documentName,
            analysisId: analysis.id,
            updatedAt: analysis.createdAt,
            items: analysis.requirements,
          },
        ]
      : []

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-semibold text-navy-900">{tr('navChecklists')}</h1>
      {items.length === 0 ? (
        <p className="card p-5">{tr('noChecklist')}</p>
      ) : (
        items.map((c) => (
          <article key={c.id} className="card p-5">
            <h2 className="font-semibold">{c.title}</h2>
            <p className="text-sm text-ink-500">
              {tr('updated')}: {c.updatedAt.slice(0, 10)}
            </p>
            <ul className="mt-3 grid gap-1 text-sm">
              {c.items.map((i) => (
                <li key={i.id}>
                  [{i.status}] {loc(i.title, lang)}
                </li>
              ))}
            </ul>
            <Link className="mt-3 inline-block text-navy-700 underline" to={`/analysis/${c.analysisId}`}>
              {tr('viewCase')}
            </Link>
          </article>
        ))
      )}
    </div>
  )
}
