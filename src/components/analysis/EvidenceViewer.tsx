import { useLang } from '../../context/LanguageContext'
import type { ExtractedField } from '../../types'

export function EvidenceViewer({
  field,
  documentName,
  onClose,
}: {
  field: ExtractedField
  documentName: string
  onClose: () => void
}) {
  const { tr } = useLang()
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy-950/50 p-4 sm:items-center" role="dialog" aria-modal="true">
      <div className="max-h-[90vh] w-full max-w-xl overflow-auto rounded-xl bg-white p-5 shadow-lg">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold text-navy-900">{tr('viewEvidence')}</h2>
          <button type="button" className="rounded-md border border-line px-2 py-1 text-sm" onClick={onClose}>
            {tr('close')}
          </button>
        </div>
        <p className="mt-2 text-sm text-ink-500">{tr('evidenceFromUpload')}</p>
        <p className="mt-3 text-sm">
          <span className="font-semibold">{documentName}</span> · {tr('page')} {field.page}
        </p>
        <blockquote className="mt-4 rounded-lg border-l-4 border-saffron-500 bg-navy-50 p-4 text-ink-900">
          <mark className="bg-saffron-100 px-0.5">{field.evidenceText}</mark>
        </blockquote>
        <p className="mt-3 text-xs text-ink-500">
          Extracted-document fact · not an AI-invented citation · confidence: {field.confidence}
        </p>
      </div>
    </div>
  )
}
