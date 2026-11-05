import { useApp } from '../context/AppContext'
import { useLang } from '../context/LanguageContext'
import { ServiceDeskTable } from '../components/service/ServiceDeskTable'
import type { Role } from '../types'

export function ServiceDesk() {
  const { tr } = useLang()
  const { role, setRole, cases, updateCase } = useApp()
  const canEdit = role === 'helper' || role === 'administrator'

  function exportRedacted() {
    const text = cases
      .map((c) => `${c.id} | ${c.documentType} | ${c.status} | checklist ${c.checklistProgress}% | notes redacted`)
      .join('\n')
    const blob = new Blob([`CivicAI redacted service-desk export\n\n${text}\n`], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'civicai-redacted-desk.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="grid gap-6">
      <header>
        <h1 className="text-3xl font-semibold text-navy-900">{tr('serviceTitle')}</h1>
        <p className="mt-1 text-sm text-ink-500">{tr('mockAuth')}</p>
      </header>
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm font-medium">
          {tr('role')}
          <select className="ml-2 rounded-md border border-line px-3 py-2" value={role} onChange={(e) => setRole(e.target.value as Role)}>
            <option value="citizen">{tr('citizen')}</option>
            <option value="helper">{tr('helper')}</option>
            <option value="administrator">{tr('administrator')}</option>
          </select>
        </label>
        {canEdit && (
          <button type="button" className="rounded-md border border-line px-3 py-2 text-sm" onClick={exportRedacted}>
            {tr('exportRedacted')}
          </button>
        )}
      </div>
      <section className="card p-3">
        <h2 className="px-2 py-2 font-semibold">{tr('cases')}</h2>
        <ServiceDeskTable
          rows={cases}
          canEdit={canEdit}
          onNotes={(id, notes) => updateCase(id, { staffNotes: notes })}
          onStatus={(id, status) => updateCase(id, { status })}
        />
      </section>
    </div>
  )
}
