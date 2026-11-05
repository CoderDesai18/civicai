import { Link } from 'react-router-dom'
import { Disclaimer } from '../components/ui/Disclaimer'
import { useApp } from '../context/AppContext'
import { useLang } from '../context/LanguageContext'
import { ANALYSES } from '../data/documents'
import { loc } from '../services/api'

export function PackageGenerator() {
  const { lang, tr } = useLang()
  const { analysis } = useApp()
  const data = analysis ?? ANALYSES['demo-scholarship-mh']
  const done = data.requirements.filter((r) => r.status === 'completed')
  const miss = data.requirements.filter((r) => r.status === 'missing' || r.status === 'needs_confirmation')

  function download() {
    const body = [
      'CivicAI application package (preliminary, redacted)',
      data.documentName,
      '',
      'Completed:',
      ...done.map((r) => `- ${loc(r.title, lang)}`),
      '',
      'Still needed:',
      ...miss.map((r) => `- ${loc(r.title, lang)}`),
      '',
      tr('preliminary'),
    ].join('\n')
    const blob = new Blob([body], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'civicai-application-package.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-semibold text-navy-900">{tr('packageTitle')}</h1>
      <Disclaimer />
      <p className="text-sm">{tr('complements')}</p>
      <section className="card p-5">
        <h2 className="font-semibold">{tr('completed')}</h2>
        <ul className="mt-2 list-disc pl-5">
          {done.map((r) => (
            <li key={r.id}>{loc(r.title, lang)}</li>
          ))}
        </ul>
        <h2 className="mt-4 font-semibold">{tr('missing')}</h2>
        <ul className="mt-2 list-disc pl-5">
          {miss.map((r) => (
            <li key={r.id}>{loc(r.title, lang)}</li>
          ))}
        </ul>
      </section>
      <div className="flex flex-wrap gap-3">
        <button type="button" className="rounded-md bg-navy-900 px-4 py-2 text-white" onClick={download}>
          {tr('downloadList')}
        </button>
        <Link className="rounded-md border px-4 py-2" to="/missing">
          {tr('checkReq')}
        </Link>
      </div>
    </div>
  )
}
