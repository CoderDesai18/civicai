import { useMemo, useState } from 'react'
import { EligibilityQuestionnaire } from '../components/schemes/EligibilityQuestionnaire'
import { SchemeMatchCard } from '../components/schemes/SchemeMatchCard'
import { Disclaimer } from '../components/ui/Disclaimer'
import { useLang } from '../context/LanguageContext'
import { SCHEMES } from '../data/schemes'
import { DEFAULT_ANSWERS, loc, matchSchemes } from '../services/api'
import type { EligibilityAnswers } from '../types'

export function Schemes() {
  const { lang, tr } = useLang()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const [answers, setAnswers] = useState<EligibilityAnswers>(DEFAULT_ANSWERS)
  const [applied, setApplied] = useState<EligibilityAnswers>(DEFAULT_ANSWERS)

  const matches = useMemo(() => matchSchemes(applied), [applied])
  const filtered = matches.filter((m) => {
    const name = loc(m.scheme.name, lang).toLowerCase()
    const okQ = !q || name.includes(q.toLowerCase()) || m.scheme.department.toLowerCase().includes(q.toLowerCase())
    const okC = cat === 'all' || m.scheme.category === cat
    return okQ && okC
  })

  return (
    <div className="grid gap-6">
      <header>
        <h1 className="text-3xl font-semibold text-navy-900">{tr('exploreSchemes')}</h1>
        <p className="mt-1 text-ink-500">{tr('likelyMatch')}</p>
      </header>
      <Disclaimer kind="eligibility" />
      <EligibilityQuestionnaire value={answers} onChange={setAnswers} onSubmit={() => setApplied(answers)} />
      <div className="flex flex-wrap gap-3">
        <label className="text-sm">
          {tr('searchSchemes')}
          <input className="ml-2 rounded-md border border-line px-3 py-2" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <label className="text-sm">
          {tr('filter')}
          <select className="ml-2 rounded-md border border-line px-3 py-2" value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="all">{tr('allCategories')}</option>
            <option value="scholarship">Scholarship</option>
            <option value="certificate">Certificate</option>
            <option value="welfare">Welfare</option>
            <option value="farmer">Farmer</option>
            <option value="health">Health</option>
          </select>
        </label>
      </div>
      <p className="text-sm text-ink-500">
        {tr('results')}: {filtered.length} / {SCHEMES.length}
      </p>
      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((m) => (
          <SchemeMatchCard key={m.scheme.id} scheme={m.scheme} match={m} />
        ))}
      </div>
    </div>
  )
}
