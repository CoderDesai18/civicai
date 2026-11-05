import { useLang } from '../../context/LanguageContext'
import { loc } from '../../services/api'
import type { Law, LawSection } from '../../types'
import { SourceCitation } from '../ui/SourceCitation'
import { Disclaimer } from '../ui/Disclaimer'

function List({ title, items }: { title: string; items: { en: string; hi: string; mr: string }[] }) {
  const { lang } = useLang()
  if (!items.length) return null
  return (
    <div>
      <h4 className="text-sm font-semibold text-navy-800">{title}</h4>
      <ul className="mt-1 list-disc pl-5 text-sm text-ink-700">
        {items.map((i) => (
          <li key={i.en}>{loc(i, lang)}</li>
        ))}
      </ul>
    </div>
  )
}

export function LawSectionCard({ law, section }: { law: Law; section: LawSection }) {
  const { lang, tr } = useLang()
  return (
    <article className="card grid gap-4 p-5">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-navy-600">
          {law.shortName} · Section {section.number}
        </p>
        <h3 className="text-xl font-semibold text-navy-900">{loc(section.title, lang)}</h3>
      </header>
      <Disclaimer kind="legal" />
      <div>
        <h4 className="text-sm font-semibold">{tr('simplified')}</h4>
        <p className="mt-0.5 text-xs font-medium text-saffron-600">{tr('civicaiExplanation')}</p>
        <p className="mt-1 text-ink-800">{loc(section.simplified, lang)}</p>
      </div>
      <List title={tr('rights')} items={section.rights} />
      <List title={tr('duties')} items={section.duties} />
      <List title={tr('exceptions')} items={section.exceptions} />
      <List title={tr('implications')} items={section.implications} />
      <details open>
        <summary className="cursor-pointer font-medium text-navy-800">{tr('originalText')}</summary>
        <p className="mt-1 text-xs text-ink-500">{tr('officialTextNote')} · {tr('originalKept')}</p>
        <p className="mt-2 whitespace-pre-wrap rounded-md border border-line bg-navy-50 p-3 font-serif text-sm leading-relaxed text-ink-800">
          {section.originalText}
        </p>
      </details>
      <SourceCitation
        source={{
          ...law.officialSource,
          sectionRef: `Section ${section.number}`,
        }}
      />
      <div className="no-print">
        <button type="button" className="rounded-md border border-line px-3 py-1.5 text-sm" onClick={() => window.print()}>
          {tr('savePrint')}
        </button>
      </div>
    </article>
  )
}
