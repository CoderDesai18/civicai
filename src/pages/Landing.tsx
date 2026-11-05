import { Link } from 'react-router-dom'
import { Disclaimer } from '../components/ui/Disclaimer'
import { useLang } from '../context/LanguageContext'

export function Landing() {
  const { tr } = useLang()
  return (
    <div>
      <section className="border-b border-line bg-white px-4 pb-16 pt-12">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-saffron-600">CivicAI · Digital public service</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-navy-900 md:text-6xl">CivicAI</h1>
          <p className="mt-4 max-w-2xl text-2xl font-medium text-navy-800">{tr('productLine')}</p>
          <p className="mt-4 max-w-2xl text-lg text-ink-700">{tr('heroDesc')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/analyze" className="rounded-full bg-navy-900 px-6 py-3 font-semibold text-white">
              {tr('analyzeCta')}
            </Link>
            <Link to="/constitution" className="rounded-full border border-navy-900 px-6 py-3 font-semibold text-navy-900">
              {tr('exploreConst')}
            </Link>
          </div>
          <p className="mt-6 text-sm text-ink-500">{tr('fromComplex')}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-12 md:grid-cols-2 lg:grid-cols-4">
        {[
          { to: '/legal', t: tr('featLegal'), d: tr('featLegalD') },
          { to: '/schemes', t: tr('featGov'), d: tr('featGovD') },
          { to: '/analyze', t: tr('featDoc'), d: tr('featDocD') },
          { to: '/package', t: tr('featAuto'), d: tr('featAutoD') },
        ].map((f) => (
          <Link key={f.t} to={f.to} className="card p-5 hover:border-navy-600">
            <h2 className="text-lg font-semibold text-navy-900">{f.t}</h2>
            <p className="mt-2 text-sm text-ink-600">{f.d}</p>
          </Link>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-6">
        <Disclaimer />
        <p className="mt-3 text-sm text-ink-600">{tr('legalInfoNotice')}</p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-2">
        <article className="rounded-2xl border border-line bg-navy-50 p-6">
          <h2 className="font-semibold text-ink-500">{tr('oldWay')}</h2>
          <p className="mt-3 text-sm leading-7 text-ink-800">
            Complex paper → search manually → decode terminology → hunt requirements → guess schemes → fill forms → confusion.
          </p>
        </article>
        <article className="rounded-2xl border border-india-100 bg-india-100/60 p-6">
          <h2 className="font-semibold text-india-700">{tr('civicWay')}</h2>
          <p className="mt-3 text-sm leading-7 text-ink-800">
            Document → CivicAI reads → explains → checks → finds official next steps → checklist → action.
          </p>
        </article>
      </section>
    </div>
  )
}
