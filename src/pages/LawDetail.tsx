import { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { LawSectionCard } from '../components/laws/LawSectionCard'
import { Disclaimer } from '../components/ui/Disclaimer'
import { SourceCitation } from '../components/ui/SourceCitation'
import { useLang } from '../context/LanguageContext'
import { getLaw } from '../data/laws'
import { loc } from '../services/api'

export function LawDetail() {
  const { id } = useParams()
  const { hash } = useLocation()
  const { lang, tr } = useLang()
  const law = id ? getLaw(id) : undefined

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [hash, law])

  if (!law) {
    return (
      <div className="card p-6">
        <p>{tr('noReliable')}</p>
        <Link to="/laws" className="underline">
          {tr('back')}
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      <Link to="/laws" className="text-sm text-navy-700 underline">
        {tr('back')}
      </Link>
      <h1 className="text-3xl font-semibold text-navy-900">{loc(law.name, lang)}</h1>
      <Disclaimer kind="legal" />
      <p className="max-w-3xl">{loc(law.summary, lang)}</p>
      <SourceCitation source={law.officialSource} />
      {law.sections.map((s) => (
        <div id={s.id} key={s.id}>
          <LawSectionCard law={law} section={s} />
        </div>
      ))}
    </div>
  )
}
