import { useLang } from '../../context/LanguageContext'
import { loc } from '../../services/api'
import type { EvidenceNode } from '../../types'
import type { TKey } from '../../data/translations'

const COLORS: Record<EvidenceNode['type'], string> = {
  document: 'bg-navy-900',
  field: 'bg-navy-600',
  requirement: 'bg-saffron-500',
  rule: 'bg-india-600',
  source: 'bg-ink-700',
  action: 'bg-ok-700',
}

const TYPE_KEY: Record<EvidenceNode['type'], TKey> = {
  document: 'nodeDocument',
  field: 'nodeField',
  requirement: 'nodeRequirement',
  rule: 'nodeRule',
  source: 'nodeSource',
  action: 'nodeAction',
}

export function EvidenceTrail({ nodes }: { nodes: EvidenceNode[] }) {
  const { lang, tr } = useLang()
  return (
    <section>
      <h2 className="text-xl font-semibold text-navy-900">{tr('evidenceTitle')}</h2>
      <p className="mt-1 text-sm text-ink-500">{tr('evidenceIntro')}</p>
      <div className="mt-4 hidden gap-2 overflow-x-auto pb-2 lg:flex">
        {nodes.map((node, i) => (
          <div key={node.id} className="flex min-w-0 items-stretch">
            <article className="w-44 shrink-0 rounded-xl border border-line bg-white p-3">
              <span className={`inline-block h-2 w-8 rounded-full ${COLORS[node.type]}`} />
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-ink-500">
                {i + 1}. {tr(TYPE_KEY[node.type])}
              </p>
              <p className="mt-1 text-sm font-medium text-ink-900">{loc(node.title, lang)}</p>
            </article>
            {i < nodes.length - 1 && (
              <div className="flex items-center px-1 text-navy-400" aria-hidden>
                →
              </div>
            )}
          </div>
        ))}
      </div>
      <ol className="relative mt-6 ml-3 border-l-2 border-navy-100 pl-6">
        {nodes.map((node, i) => (
          <li key={node.id} className="mb-6">
            <span
              className={`absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-white ${COLORS[node.type]}`}
              aria-hidden
            />
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
              {i + 1}. {tr(TYPE_KEY[node.type])}
            </p>
            <div className="card mt-1 p-3">
              <p className="font-medium text-ink-900">{loc(node.title, lang)}</p>
              <p className="text-sm text-ink-600">{loc(node.detail, lang)}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
