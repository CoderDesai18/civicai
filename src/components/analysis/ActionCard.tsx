import { useLang } from '../../context/LanguageContext'
import { loc } from '../../services/api'
import type { ActionItem } from '../../types'

export function ActionCard({ action }: { action: ActionItem }) {
  const { lang, tr } = useLang()
  return (
    <article className="card flex flex-col gap-2 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-india-700">{tr(action.mode)}</p>
      <h3 className="text-lg font-semibold text-navy-900">{loc(action.what, lang)}</h3>
      <p>
        <span className="font-medium">{tr('where')}: </span>
        {loc(action.where, lang)}
      </p>
      {action.documents.length > 0 && (
        <div>
          <p className="font-medium">{tr('carry')}</p>
          <ul className="list-disc pl-5 text-sm">
            {action.documents.map((d) => (
              <li key={d.en}>{loc(d, lang)}</li>
            ))}
          </ul>
        </div>
      )}
      {action.deadline && (
        <p>
          <span className="font-medium">{tr('deadline')}: </span>
          {action.deadline}
        </p>
      )}
      <p>
        <span className="font-medium">{tr('expected')}: </span>
        {loc(action.nextStep, lang)}
      </p>
      {action.officialLink && (
        <a
          className="mt-1 inline-flex font-medium text-navy-700 underline"
          href={action.officialLink}
          target="_blank"
          rel="noreferrer"
        >
          {action.officialLinkLabel ?? tr('openOfficial')}
        </a>
      )}
    </article>
  )
}
