import { useLang } from '../../context/LanguageContext'
import { sourceTypeLabel } from '../../services/api'
import type { OfficialSource } from '../../types'

export function SourceCitation({ source, compact = false }: { source: OfficialSource; compact?: boolean }) {
  const { tr } = useLang()
  return (
    <aside className="rounded-lg border border-navy-100 bg-navy-50 p-3 text-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-navy-700">{tr('officialSource')}</p>
      <p className="mt-1 font-medium text-ink-900">{source.title}</p>
      {!compact && (
        <>
          <p className="text-ink-700">{source.department}</p>
          <p className="text-ink-500">
            {sourceTypeLabel(source.sourceType)} · {source.actOrScheme}
            {source.sectionRef ? ` · ${source.sectionRef}` : ''}
          </p>
        </>
      )}
      <p className="mt-1 text-ink-500">
        {tr('lastVerified')}: {source.lastVerified} · {tr('version')}: {source.version}
      </p>
      <a
        className="mt-2 inline-flex text-navy-700 underline decoration-navy-200 underline-offset-2"
        href={source.url}
        target="_blank"
        rel="noreferrer"
      >
        {source.url.replace('https://', '')}
      </a>
      <p className="mt-2 text-xs text-ink-500">{tr('prototypeData')}</p>
    </aside>
  )
}
