import { useState } from 'react'
import { Disclaimer } from '../components/ui/Disclaimer'
import { useLang } from '../context/LanguageContext'
import { SAMPLE_RENT_TEXT } from '../data/rentAgreement'

const OLD = SAMPLE_RENT_TEXT
const NEWER = SAMPLE_RENT_TEXT.replace('Rs. 22,000', 'Rs. 24,000').replace(
  'thirty (30) days',
  'sixty (60) days',
)

function lines(t: string) {
  return t.split('\n').map((l) => l.trim()).filter(Boolean)
}

export function Compare() {
  const { tr } = useLang()
  const [left, setLeft] = useState(OLD)
  const [right, setRight] = useState(NEWER)
  const [ran, setRan] = useState(false)

  const a = new Set(lines(left))
  const b = new Set(lines(right))
  const added = [...b].filter((x) => !a.has(x))
  const removed = [...a].filter((x) => !b.has(x))

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-semibold text-navy-900">{tr('compareDocs')}</h1>
      <Disclaimer />
      <p className="text-sm text-ink-600">{tr('compareHint')}</p>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1 text-sm">
          {tr('oldDoc')}
          <textarea className="min-h-48 rounded-md border border-line p-3 font-mono text-xs" value={left} onChange={(e) => setLeft(e.target.value)} />
        </label>
        <label className="grid gap-1 text-sm">
          {tr('newDoc')}
          <textarea className="min-h-48 rounded-md border border-line p-3 font-mono text-xs" value={right} onChange={(e) => setRight(e.target.value)} />
        </label>
      </div>
      <button type="button" className="w-fit rounded-full bg-navy-900 px-4 py-2 text-white" onClick={() => setRan(true)}>
        {tr('compareDocs')}
      </button>
      {ran && (
        <div className="grid gap-4 md:grid-cols-2">
          <article className="card p-4">
            <h2 className="font-semibold text-ok-700">{tr('added')}</h2>
            <ul className="mt-2 list-disc pl-5 text-sm">
              {added.map((x) => (
                <li key={x}>{x}</li>
              ))}
              {added.length === 0 && <li>—</li>}
            </ul>
          </article>
          <article className="card p-4">
            <h2 className="font-semibold text-bad-700">{tr('removed')}</h2>
            <ul className="mt-2 list-disc pl-5 text-sm">
              {removed.map((x) => (
                <li key={x}>{x}</li>
              ))}
              {removed.length === 0 && <li>—</li>}
            </ul>
          </article>
        </div>
      )}
      <p className="text-sm">{tr('notSureInfo')} CivicAI only diffs the text you provided.</p>
    </div>
  )
}
