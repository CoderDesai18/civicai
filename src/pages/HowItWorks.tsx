import { Link } from 'react-router-dom'
import { Disclaimer } from '../components/ui/Disclaimer'
import { useLang } from '../context/LanguageContext'
import type { TKey } from '../data/translations'

const ARCH: { t: TKey; b: TKey }[] = [
  { t: 'arch1t', b: 'arch1b' },
  { t: 'arch2t', b: 'arch2b' },
  { t: 'arch3t', b: 'arch3b' },
  { t: 'arch4t', b: 'arch4b' },
  { t: 'arch5t', b: 'arch5b' },
  { t: 'arch6t', b: 'arch6b' },
  { t: 'arch7t', b: 'arch7b' },
  { t: 'arch8t', b: 'arch8b' },
  { t: 'arch9t', b: 'arch9b' },
]

const ROWS: { n: TKey; c: TKey; m: TKey; d: TKey }[] = [
  { n: 'row1n', c: 'row1c', m: 'row1m', d: 'row1d' },
  { n: 'row2n', c: 'row2c', m: 'row2m', d: 'row2d' },
  { n: 'row3n', c: 'row3c', m: 'row3m', d: 'row3d' },
  { n: 'row4n', c: 'row4c', m: 'row4m', d: 'row4d' },
  { n: 'row5n', c: 'row5c', m: 'row5m', d: 'row5d' },
]

export function HowItWorks() {
  const { tr } = useLang()
  return (
    <div className="grid gap-8">
      <header>
        <h1 className="text-3xl font-semibold text-navy-900">{tr('archTitle')}</h1>
        <p className="mt-2 max-w-3xl text-ink-700">{tr('archIntro')}</p>
      </header>
      <Disclaimer />

      <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {ARCH.map((a) => (
          <li key={a.t} className="card p-4">
            <h2 className="font-semibold text-navy-900">{tr(a.t)}</h2>
            <p className="mt-2 text-sm text-ink-700">{tr(a.b)}</p>
          </li>
        ))}
      </ol>

      <p className="font-mono text-xs text-ink-500">{tr('workflow')}</p>

      <section className="card p-5">
        <h2 className="text-2xl font-semibold text-navy-900">{tr('whyTitle')}</h2>
        <p className="mt-2 text-ink-700">{tr('whyIntro')}</p>
        <p className="mt-2 text-sm text-ink-600">{tr('complements')}</p>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-navy-50 text-navy-900">
              <tr>
                <th className="px-3 py-2 font-semibold">{tr('colNeed')}</th>
                <th className="px-3 py-2 font-semibold">{tr('colCivic')}</th>
                <th className="px-3 py-2 font-semibold">{tr('colMy')}</th>
                <th className="px-3 py-2 font-semibold">{tr('colDigi')}</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.n} className="border-t border-line">
                  <td className="px-3 py-2 font-medium">{tr(r.n)}</td>
                  <td className="px-3 py-2">{tr(r.c)}</td>
                  <td className="px-3 py-2">{tr(r.m)}</td>
                  <td className="px-3 py-2">{tr(r.d)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <a className="underline" href="https://www.myscheme.gov.in" target="_blank" rel="noreferrer">
            myScheme.gov.in
          </a>
          <a className="underline" href="https://www.digilocker.gov.in" target="_blank" rel="noreferrer">
            DigiLocker
          </a>
        </div>
      </section>

      <section className="card grid gap-2 p-5">
        <h2 className="text-xl font-semibold text-navy-900">{tr('safetyTitle')}</h2>
        <p>{tr('preliminary')}</p>
        <p>{tr('legalDisclaimer')}</p>
        <p>{tr('neverEligible')}</p>
        <p>{tr('noHallucination')}</p>
        <p>{tr('originalKept')}</p>
        <p>{tr('factVsAi')}</p>
        <p>{tr('unavailableOfficial')}</p>
        <p>{tr('lastVerifiedHint')}</p>
      </section>

      <section className="card p-5">
        <h2 className="font-semibold">{tr('judgePath')}</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>
            <Link className="underline" to="/analyze?demo=demo-scholarship&run=1">
              {tr('judge1')}
            </Link>
          </li>
          <li>{tr('judge2')}</li>
          <li>{tr('judge3')}</li>
          <li>{tr('judge4')}</li>
          <li>{tr('judge5')}</li>
          <li>{tr('judge6')}</li>
        </ol>
      </section>
    </div>
  )
}
