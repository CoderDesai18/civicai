import { useLang } from '../../context/LanguageContext'
import { loc } from '../../services/api'
import type { Requirement, RequirementStatus } from '../../types'

const GROUPS: RequirementStatus[] = ['completed', 'missing', 'needs_confirmation', 'not_applicable']

const KEY = {
  completed: 'completed',
  missing: 'missing',
  needs_confirmation: 'needsConfirm',
  not_applicable: 'notApplicable',
} as const

export function RequirementChecklist({
  items,
  onChange,
  onPrint,
  onDownload,
}: {
  items: Requirement[]
  onChange: (id: string, patch: Partial<Requirement>) => void
  onPrint: () => void
  onDownload: () => void
}) {
  const { lang, tr } = useLang()
  return (
    <section className="card p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-navy-900">{tr('requirements')}</h2>
        <div className="flex gap-2 no-print">
          <button type="button" className="rounded-md border border-line px-3 py-1.5 text-sm" onClick={onPrint}>
            {tr('printList')}
          </button>
          <button type="button" className="rounded-md border border-line px-3 py-1.5 text-sm" onClick={onDownload}>
            {tr('downloadList')}
          </button>
        </div>
      </div>
      <div className="mt-4 grid gap-5">
        {GROUPS.map((g) => {
          const list = items.filter((i) => i.status === g)
          return (
            <div key={g}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
                {tr(KEY[g])} ({list.length})
              </h3>
              <ul className="mt-2 grid gap-3">
                {list.map((item) => (
                  <li key={item.id} className="rounded-lg border border-line p-3">
                    <p className="font-medium text-ink-900">{loc(item.title, lang)}</p>
                    <p className="text-sm text-ink-500">{loc(item.detail, lang)}</p>
                    <div className="mt-2 flex flex-wrap gap-2 no-print">
                      {item.status !== 'completed' && item.status !== 'not_applicable' && (
                        <button
                          type="button"
                          className="rounded-md bg-india-600 px-3 py-1 text-sm font-medium text-white"
                          onClick={() => onChange(item.id, { status: 'completed' })}
                        >
                          {tr('markComplete')}
                        </button>
                      )}
                      <label className="text-sm text-ink-700">
                        {tr('addNote')}
                        <input
                          className="ml-2 rounded border border-line px-2 py-1"
                          value={item.notes}
                          onChange={(e) => onChange(item.id, { notes: e.target.value })}
                        />
                      </label>
                      <label className="text-sm text-navy-700 underline">
                        {tr('attach')}
                        <input
                          type="file"
                          className="sr-only"
                          onChange={(e) => {
                            const f = e.target.files?.[0]
                            if (f) onChange(item.id, { supportingDoc: f.name })
                          }}
                        />
                      </label>
                      {item.supportingDoc && <span className="text-xs text-ok-700">{item.supportingDoc}</span>}
                    </div>
                  </li>
                ))}
                {list.length === 0 && <li className="text-sm text-ink-500">—</li>}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
