import { Link } from 'react-router-dom'
import { Disclaimer } from '../components/ui/Disclaimer'
import { useLang } from '../context/LanguageContext'

const SCENARIOS = [
  { to: '/rent-checker?demo=1', title: 'Rent agreement', d: 'Extract rent, deposit, notice. Flag unclear refund timeline.' },
  { to: '/analyze?demo=demo-employment&run=1', title: 'Employment contract', d: 'Read role, CTC and notice. Low-confidence probation line stays unmarked.' },
  { to: '/analyze?demo=demo-scholarship&run=1', title: 'Government application', d: '4/5 proofs present. Income certificate missing. Scheme + checklist.' },
  { to: '/constitution/art-21', title: 'Constitution', d: 'Article 21 — official text, simple explanation, Marathi via language switch.' },
  { to: '/analyze?demo=demo-loan&run=1', title: 'Loan agreement', d: 'Principal and tenure extracted. Unclear rate is not invented.' },
  { to: '/analyze?demo=demo-insurance&run=1', title: 'Insurance policy', d: 'Sum insured and period. Waiting period pointed to official wording.' },
]

export function DemoHub() {
  const { tr } = useLang()
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-semibold text-navy-900">{tr('tryADemo')}</h1>
      <p className="text-ink-600">{tr('fiveMin')}</p>
      <Disclaimer />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SCENARIOS.map((s) => (
          <Link key={s.to} to={s.to} className="card p-5 hover:border-navy-700">
            <h2 className="text-lg font-semibold text-navy-900">{s.title}</h2>
            <p className="mt-2 text-sm text-ink-600">{s.d}</p>
            <p className="mt-3 text-sm font-medium text-navy-800">{tr('startThisDemo')} →</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
