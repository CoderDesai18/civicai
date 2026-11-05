import { Link, useParams } from 'react-router-dom'
import { Disclaimer } from '../components/ui/Disclaimer'
import { SourceCitation } from '../components/ui/SourceCitation'
import { ConfidenceBadge } from '../components/ui/ConfidenceBadge'
import { useLang } from '../context/LanguageContext'
import { getArticle } from '../data/constitution'
import { loc } from '../services/api'

export function ConstitutionArticle() {
  const { id } = useParams()
  const { lang, tr } = useLang()
  const article = id ? getArticle(id) : undefined
  if (!article) {
    return (
      <div className="card p-6">
        <p>{tr('noReliable')}</p>
        <Link to="/constitution" className="underline">
          {tr('back')}
        </Link>
      </div>
    )
  }
  return (
    <div className="grid max-w-3xl gap-6">
      <Link to="/constitution" className="text-sm underline">
        {tr('back')}
      </Link>
      <p className="text-xs font-semibold uppercase text-navy-600">
        {article.article === 'Preamble' ? 'Preamble' : `Article ${article.article}`}
      </p>
      <h1 className="text-3xl font-semibold text-navy-900">{loc(article.title, lang)}</h1>
      <div className="flex items-center gap-2">
        <ConfidenceBadge level="high" />
        <span className="text-xs text-ink-500">{tr('officialSource')}</span>
      </div>
      <Disclaimer kind="legal" />
      <section className="card p-5">
        <h2 className="font-semibold">{tr('purpose')}</h2>
        <p className="mt-2">{loc(article.covers, lang)}</p>
      </section>
      <section className="card p-5">
        <h2 className="font-semibold">{tr('simplified')}</h2>
        <p className="mt-1 text-xs font-medium text-saffron-600">{tr('civicaiExplanation')}</p>
        <p className="mt-2">{loc(article.simplified, lang)}</p>
        <ul className="mt-3 list-disc pl-5 text-sm">
          {article.keyPoints.map((p) => (
            <li key={p.en}>{loc(p, lang)}</li>
          ))}
        </ul>
      </section>
      <section className="card p-5">
        <h2 className="font-semibold">{tr('originalText')}</h2>
        <p className="mt-1 text-xs text-ink-500">{tr('officialTextNote')} · {tr('originalKept')}</p>
        <p className="mt-3 whitespace-pre-wrap rounded-md bg-navy-50 p-4 font-serif text-sm leading-relaxed">{article.officialText}</p>
      </section>
      {article.related.length > 0 && (
        <section>
          <h2 className="font-semibold">{tr('relatedLegal')}</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {article.related.filter((rid) => getArticle(rid)).map((rid) => (
              <Link key={rid} className="rounded-full border border-line px-3 py-1 text-sm" to={`/constitution/${rid}`}>
                {rid.replace('art-', 'Art. ')}
              </Link>
            ))}
          </div>
        </section>
      )}
      <SourceCitation source={article.officialSource} />
      <p className="text-sm">{tr('consultPro')}</p>
    </div>
  )
}
