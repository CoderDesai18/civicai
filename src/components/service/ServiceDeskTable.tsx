import { Link } from 'react-router-dom'
import { useLang } from '../../context/LanguageContext'
import type { CaseStatus, ServiceDeskCase } from '../../types'

const STATUS_KEY: Record<CaseStatus, 'newCase' | 'needsDocs' | 'ready' | 'done'> = {
  new: 'newCase',
  needs_documents: 'needsDocs',
  ready_to_apply: 'ready',
  completed: 'done',
}

export function ServiceDeskTable({
  rows,
  canEdit,
  onNotes,
  onStatus,
}: {
  rows: ServiceDeskCase[]
  canEdit: boolean
  onNotes: (id: string, notes: string) => void
  onStatus: (id: string, status: CaseStatus) => void
}) {
  const { tr } = useLang()
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-navy-50 text-navy-900">
          <tr>
            <th className="px-3 py-2 font-semibold">ID</th>
            <th className="px-3 py-2 font-semibold">{tr('citizen')}</th>
            <th className="px-3 py-2 font-semibold">{tr('type')}</th>
            <th className="px-3 py-2 font-semibold">{tr('status')}</th>
            <th className="px-3 py-2 font-semibold">{tr('progress')}</th>
            <th className="px-3 py-2 font-semibold">{tr('assigned')}</th>
            <th className="px-3 py-2 font-semibold">{tr('staffNotes')}</th>
            <th className="px-3 py-2 font-semibold" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-line">
              <td className="px-3 py-2 font-medium">{row.id}</td>
              <td className="px-3 py-2">{row.citizenName}</td>
              <td className="px-3 py-2">{row.documentType}</td>
              <td className="px-3 py-2">
                {canEdit ? (
                  <select
                    className="rounded border border-line px-2 py-1"
                    value={row.status}
                    onChange={(e) => onStatus(row.id, e.target.value as CaseStatus)}
                  >
                    <option value="new">{tr('newCase')}</option>
                    <option value="needs_documents">{tr('needsDocs')}</option>
                    <option value="ready_to_apply">{tr('ready')}</option>
                    <option value="completed">{tr('done')}</option>
                  </select>
                ) : (
                  tr(STATUS_KEY[row.status])
                )}
              </td>
              <td className="px-3 py-2">{row.checklistProgress}%</td>
              <td className="px-3 py-2">{row.assignedTo}</td>
              <td className="px-3 py-2">
                {canEdit ? (
                  <textarea
                    className="w-56 rounded border border-line px-2 py-1"
                    rows={2}
                    defaultValue={row.staffNotes}
                    onBlur={(e) => onNotes(row.id, e.target.value)}
                  />
                ) : (
                  <span className="text-ink-500">Redacted for citizen role</span>
                )}
              </td>
              <td className="px-3 py-2">
                {row.analysisId && (
                  <Link className="text-navy-700 underline" to={`/analysis/${row.analysisId}`}>
                    {tr('viewCase')}
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
