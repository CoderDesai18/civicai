import { useState } from 'react'
import { useLang } from '../../context/LanguageContext'
import { loc } from '../../services/api'
import type { ExtractedField } from '../../types'
import { ConfidenceBadge } from '../ui/ConfidenceBadge'

export function ExtractedFieldCard({
  field,
  onEvidence,
  onSave,
}: {
  field: ExtractedField
  onEvidence: (f: ExtractedField) => void
  onSave: (id: string, value: string, confirmed: boolean) => void
}) {
  const { lang, tr } = useLang()
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(field.value)

  return (
    <article className="card p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-semibold text-navy-900">{loc(field.label, lang)}</h3>
        <ConfidenceBadge level={field.confidence} />
      </div>
      <p className="mt-1 text-xs font-medium text-navy-600">{tr('fromDocument')}</p>
      {editing ? (
        <div className="mt-3">
          <label className="sr-only" htmlFor={`edit-${field.id}`}>
            {loc(field.label, lang)}
          </label>
          <input
            id={`edit-${field.id}`}
            className="w-full rounded-md border border-line px-3 py-2"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              className="rounded-md bg-navy-900 px-3 py-1.5 text-sm font-medium text-white"
              onClick={() => {
                onSave(field.id, value, true)
                setEditing(false)
              }}
            >
              {tr('saveField')}
            </button>
            <button type="button" className="rounded-md border border-line px-3 py-1.5 text-sm" onClick={() => setEditing(false)}>
              {tr('cancel')}
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-2 text-lg text-ink-900">
          {field.value}
          {field.confirmed && (
            <span className="ml-2 align-middle text-xs font-semibold text-ok-700">{tr('confirmed')}</span>
          )}
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className="text-sm font-medium text-navy-700 underline" onClick={() => onEvidence(field)}>
          {tr('viewEvidence')}
        </button>
        <button type="button" className="text-sm font-medium text-navy-700 underline" onClick={() => setEditing(true)}>
          {tr('confirmEdit')}
        </button>
      </div>
    </article>
  )
}
