import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useLang } from '../context/LanguageContext'

export function History() {
  const { tr } = useLang()
  const { history, removeHistory, clearHistory, analysis } = useApp()
  const rows = history.length
    ? history
    : analysis
      ? [
          {
            id: analysis.id,
            name: analysis.documentName,
            kind: 'government' as const,
            typeLabel: 'Analysis',
            date: analysis.createdAt.slice(0, 10),
            status: analysis.status,
            href: `/analysis/${analysis.id}`,
          },
        ]
      : []

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold text-navy-900">{tr('myDocs')}</h1>
        {rows.length > 0 && (
          <button type="button" className="rounded-md border border-bad-700 px-3 py-1.5 text-sm text-bad-700" onClick={clearHistory}>
            {tr('deleteSession')}
          </button>
        )}
      </div>
      {rows.length === 0 ? (
        <p className="card p-5">{tr('emptyDash')}</p>
      ) : (
        <div className="overflow-x-auto card">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-navy-50">
              <tr>
                <th className="px-3 py-2">{tr('overview')}</th>
                <th className="px-3 py-2">{tr('type')}</th>
                <th className="px-3 py-2">{tr('status')}</th>
                <th className="px-3 py-2" />
              </tr>
            </thead>
            <tbody>
              {rows.map((h) => (
                <tr key={h.id} className="border-t border-line">
                  <td className="px-3 py-2">
                    <p className="font-medium">{h.name}</p>
                    <p className="text-xs text-ink-500">{h.date}</p>
                  </td>
                  <td className="px-3 py-2">{h.typeLabel}</td>
                  <td className="px-3 py-2">{h.status}</td>
                  <td className="px-3 py-2">
                    <Link className="mr-3 underline" to={h.href}>
                      {tr('open')}
                    </Link>
                    <button type="button" className="text-bad-700 underline" onClick={() => removeHistory(h.id)}>
                      {tr('deleteHistory')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
