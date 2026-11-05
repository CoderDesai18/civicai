import { Link, useParams } from 'react-router-dom'
import { Disclaimer } from '../components/ui/Disclaimer'
import { useLang } from '../context/LanguageContext'
import { getTerm } from '../data/legalTerms'
import { loc } from '../services/api'

export function DictionaryTerm() {
  const { id } = useParams()
  const { lang, tr } = useLang()
  const term = id ? getTerm(id) : undefined
  if (!term) {
    return (
      <div className="card p-6">
        <p>{tr('noReliable')}</p>
        <Link to="/dictionary" className="underline">
          {tr('back')}
        </Link>
      </div>
    )
  }
  return (
    <div className="grid max-w-3xl gap-5">
      <Link to="/dictionary" className="text-sm underline">
        {tr('back')}
      </Link>
      <h1 className="text-3xl font-semibold">{loc(term.term, lang)}</h1>
      <Disclaimer kind="legal" />
      <section className="card p-4">
        <h2 className="text-sm font-semibold uppercase">{tr('simplified')}</h2>
        <p className="mt-1">{loc(term.simpleMeaning, lang)}</p>
      </section>
      <section className="card p-4">
        <h2 className="text-sm font-semibold uppercase">{tr('relatedLegal')}</h2>
        <p className="mt-1 text-sm">{loc(term.legalMeaning, lang)}</p>
      </section>
      <section className="card p-4">
        <h2 className="text-sm font-semibold uppercase">Example</h2>
        <p className="mt-1 text-sm">{loc(term.example, lang)}</p>
      </section>
      <p className="text-sm text-ink-600">{loc(term.appearsIn, lang)}</p>
      <div className="flex flex-wrap gap-2">
        {term.related.filter((r) => getTerm(r)).map((r) => (
          <Link key={r} className="rounded-full border px-3 py-1 text-sm" to={`/dictionary/${r}`}>
            {r}
          </Link>
        ))}
      </div>
    </div>
  )
}
