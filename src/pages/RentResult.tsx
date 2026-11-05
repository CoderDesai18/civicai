import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Disclaimer } from '../components/ui/Disclaimer'
import { SourceCitation } from '../components/ui/SourceCitation'
import { ConfidenceBadge } from '../components/ui/ConfidenceBadge'
import { useApp } from '../context/AppContext'
import { useLang } from '../context/LanguageContext'
import { RENT_DEMO } from '../data/rentAgreement'
import { answerFromDocument } from '../data/groundedAnswers'
import { loc } from '../services/api'
import { askCivicAI } from '../services/ai'
import type { ClauseFlag } from '../types'

const FLAG: Record<ClauseFlag, { cls: string; key: 'flagNormal' | 'flagImportant' | 'flagReview' }> = {
  normal: { cls: 'bg-ok-100 text-ok-700', key: 'flagNormal' },
  important: { cls: 'bg-warn-100 text-warn-700', key: 'flagImportant' },
  review: { cls: 'bg-bad-100 text-bad-700', key: 'flagReview' },
}

export function RentResult() {
  const { lang, tr } = useLang()
  const { rentReview } = useApp()
  const review = rentReview ?? RENT_DEMO
  const [openId, setOpenId] = useState<string | null>(review.clauses[0]?.id ?? null)
  const [q, setQ] = useState('')
  const [qa, setQa] = useState<{ found: boolean; quote: string } | null>(null)
  const [aiText, setAiText] = useState('')
  const [aiBusy, setAiBusy] = useState(false)

  return (
    <div className="grid gap-6">
      <Link to="/rent-checker" className="text-sm underline">
        {tr('back')}
      </Link>
      <h1 className="text-3xl font-semibold text-navy-900">{tr('rentCheck')}</h1>
      <p className="text-sm text-ink-500">{review.documentName}</p>
      <Disclaimer kind="legal" />
      <p className="text-sm">{tr('legalInfoNotice')}</p>
      {review.prototype && <p className="text-sm font-medium text-saffron-600">{tr('prototypeData')}</p>}

      <section className="card p-5">
        <h2 className="font-semibold">{tr('overview')}</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {review.basics.map((f) => (
            <div key={f.id} className="rounded-lg border border-line p-3">
              <div className="flex justify-between gap-2">
                <p className="text-sm font-medium">{loc(f.label, lang)}</p>
                <ConfidenceBadge level={f.confidence} />
              </div>
              <p className="mt-1">{f.value}</p>
              <p className="text-xs text-navy-600">{tr('fromDocument')}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        <article className="card p-4">
          <h3 className="font-semibold text-ok-700">{tr('looksClear')}</h3>
          <ul className="mt-2 list-disc pl-5 text-sm">
            {review.clear.map((x) => (
              <li key={x.en}>{loc(x, lang)}</li>
            ))}
          </ul>
        </article>
        <article className="card p-4">
          <h3 className="font-semibold text-warn-700">{tr('needsAttention')}</h3>
          <ul className="mt-2 list-disc pl-5 text-sm">
            {review.attention.map((x) => (
              <li key={x.en}>{loc(x, lang)}</li>
            ))}
          </ul>
        </article>
        <article className="card p-4">
          <h3 className="font-semibold text-bad-700">{tr('appearsMissing')}</h3>
          <ul className="mt-2 list-disc pl-5 text-sm">
            {review.missing.map((x) => (
              <li key={x.en}>{loc(x, lang)}</li>
            ))}
          </ul>
        </article>
      </section>

      <section>
        <h2 className="text-xl font-semibold">{tr('fields')}</h2>
        <div className="mt-3 grid gap-3">
          {review.clauses.map((c) => {
            const f = FLAG[c.flag]
            return (
              <article key={c.id} className="card p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="font-semibold">{loc(c.title, lang)}</h3>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${f.cls}`}>{tr(f.key)}</span>
                </div>
                <button type="button" className="mt-2 text-sm underline" onClick={() => setOpenId(openId === c.id ? null : c.id)}>
                  {openId === c.id ? tr('close') : tr('open')}
                </button>
                {openId === c.id && (
                  <div className="mt-3 grid gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase">{tr('originalClause')}</p>
                      <blockquote className="mt-1 rounded-md bg-navy-50 p-3 text-sm">{c.originalText}</blockquote>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase">{tr('simplified')}</p>
                      <p className="text-xs text-saffron-600">{tr('civicaiExplanation')}</p>
                      <p className="mt-1">{loc(c.explanation, lang)}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase">{tr('whyMatters')}</p>
                      <p className="mt-1 text-sm">{loc(c.whyItMatters, lang)}</p>
                    </div>
                    {c.questions.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold uppercase">{tr('questionsConsider')}</p>
                        <ul className="mt-1 list-disc pl-5 text-sm">
                          {c.questions.map((qq) => (
                            <li key={qq.en}>{loc(qq, lang)}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {c.relatedTopic && (
                      <p className="text-sm">
                        <span className="font-medium">{tr('relatedLegal')}: </span>
                        {loc(c.relatedTopic, lang)}
                      </p>
                    )}
                    {c.relatedSource && <SourceCitation source={c.relatedSource} compact />}
                    <p className="text-xs text-ink-500">{tr('mayNeedReview')}</p>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </section>

      <section className="card p-5">
        <h2 className="font-semibold">{tr('questionsConsider')}</h2>
        <ul className="mt-2 list-disc pl-5">
          {review.suggestedQuestions.map((s) => (
            <li key={s.en}>{loc(s, lang)}</li>
          ))}
        </ul>
      </section>

      <section className="card p-5">
        <h2 className="font-semibold">{tr('askDoc')}</h2>
        <form
          className="mt-3 flex flex-wrap gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            setQa(answerFromDocument(q, review.extractedText))
            setAiBusy(true)
            setAiText('')
            void askCivicAI({ question: q, context: review.extractedText, language: lang }).then((r) => {
              setAiBusy(false)
              setAiText(r.text || r.error || '')
            })
          }}
        >
          <input className="flex-1 rounded-md border border-line px-3 py-2" value={q} onChange={(e) => setQ(e.target.value)} placeholder="What is the notice period?" />
          <button className="rounded-md bg-navy-900 px-3 py-2 text-white" type="submit">
            {tr('open')}
          </button>
        </form>
        {qa && (
          <div className="mt-3 text-sm">
            {qa.found ? (
              <p>
                {tr('basedOnInfo')} <mark className="bg-saffron-100">{qa.quote}</mark>
              </p>
            ) : (
              <p>{tr('notInDoc')}</p>
            )}
          </div>
        )}
        {aiBusy && <p className="mt-2 text-sm text-ink-500">CivicAI is reading the agreement…</p>}
        {aiText && <p className="mt-2 whitespace-pre-wrap text-sm text-ink-800">{aiText}</p>}
      </section>
      <p className="text-sm">{tr('consultPro')}</p>
    </div>
  )
}
