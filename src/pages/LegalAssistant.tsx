import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { searchArticles } from '../data/constitution'
import { answerQuestion } from '../data/groundedAnswers'
import { searchLaws } from '../data/laws'
import { searchTerms } from '../data/legalTerms'
import { loc } from '../services/api'
import { askCivicAI } from '../services/ai'
import { isStandalone } from '../standalone'

const SAMPLES = [
  'What is Article 21?',
  'Article 14',
  'What are my rights as a tenant?',
  'What is indemnity?',
  'Consumer Protection Act',
  'What can I do if a company misuses my personal data?',
]

export function LegalAssistant() {
  const { lang, tr } = useLang()
  const [params] = useSearchParams()
  const [q, setQ] = useState(params.get('q') ?? '')
  const [asked, setAsked] = useState(params.get('q') ?? '')
  const [aiText, setAiText] = useState('')
  const [aiErr, setAiErr] = useState('')
  const [aiBusy, setAiBusy] = useState(false)

  const query = q.trim()
  const articles = useMemo(() => (query.length >= 2 ? searchArticles(query).slice(0, 6) : []), [query])
  const laws = useMemo(() => (query.length >= 2 ? searchLaws(query).slice(0, 6) : []), [query])
  const terms = useMemo(() => (query.length >= 2 ? searchTerms(query).slice(0, 6) : []), [query])
  const catalog = useMemo(() => (asked ? answerQuestion(asked) : query.length >= 2 ? answerQuestion(query) : null), [asked, query])

  function runAsk(text: string) {
    const question = text.trim()
    if (!question) return
    setQ(question)
    setAsked(question)
    setAiText('')
    setAiErr('')
    setAiBusy(true)
    void askCivicAI({ question, language: lang }).then((r) => {
      setAiBusy(false)
      setAiText(r.text)
      setAiErr(r.error || '')
    })
  }

  useEffect(() => {
    const initial = params.get('q')
    if (initial) runAsk(initial)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const hasHits = articles.length + laws.length + terms.length > 0 || Boolean(catalog)

  return (
    <div style={{ maxWidth: 880 }}>
      <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#111827' }}>{tr('askLaw')}</h1>
      <p style={{ color: '#6b7280', margin: '8px 0 16px' }}>{tr('legalInfoNotice')}</p>
      {isStandalone() && (
        <p className="auth-mailbox" style={{ marginBottom: 14 }}>
          Offline file: answers quote the Constitution of India (Legislative Department, as on 1 May 2026) plus CivicAI’s Act summaries and dictionary. This is not live AI and not legal advice.
        </p>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          runAsk(q)
        }}
        style={{ display: 'flex', gap: 8, marginBottom: 12 }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search Article 21, indemnity, tenant deposit, Consumer Protection…"
          autoFocus
          style={{
            flex: 1,
            border: '1px solid #d8dee8',
            borderRadius: 12,
            padding: '12px 14px',
            fontSize: 15,
            outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={aiBusy || !q.trim()}
          style={{
            background: '#16325c',
            color: '#fff',
            border: 0,
            borderRadius: 12,
            padding: '0 18px',
            fontWeight: 700,
            cursor: 'pointer',
            minWidth: 96,
          }}
        >
          {aiBusy ? '…' : 'Search'}
        </button>
      </form>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        {SAMPLES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => runAsk(s)}
            style={{
              border: '1px solid #e5e7eb',
              background: '#fff',
              borderRadius: 999,
              padding: '6px 12px',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {(aiBusy || aiText || aiErr) && (
        <article className="panel" style={{ marginBottom: 16, borderLeft: '4px solid #2563eb' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: 0.4 }}>
            CivicAI answer
          </div>
          {aiBusy && <p style={{ margin: '10px 0 0', color: '#6b7280' }}>Reading your question and writing a plain-language answer…</p>}
          {aiErr && <p style={{ margin: '10px 0 0', color: '#b42318' }}>{aiErr}</p>}
          {aiText && <p style={{ margin: '10px 0 0', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{aiText}</p>}
        </article>
      )}

      {catalog && (
        <article className="panel" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#b45309' }}>{tr('civicaiExplanation')}</div>
          <h2 style={{ margin: '6px 0', fontSize: 18 }}>{catalog.question}</h2>
          <p style={{ margin: 0, lineHeight: 1.6 }}>{loc(catalog.answer, lang)}</p>
          {catalog.relatedHref && (
            <Link to={catalog.relatedHref} style={{ display: 'inline-block', marginTop: 10, color: '#16325c', fontWeight: 600 }}>
              Open source page →
            </Link>
          )}
        </article>
      )}

      {query.length >= 2 && (
        <div style={{ display: 'grid', gap: 12 }}>
          {articles.length > 0 && (
            <section className="panel">
              <h2 style={{ margin: '0 0 10px', fontSize: 16 }}>Constitution</h2>
              {articles.map((a) => (
                <Link key={a.id} to={`/constitution/${a.id}`} style={{ display: 'block', padding: '8px 0', borderTop: '1px solid #f1f5f9', color: '#16325c', textDecoration: 'none', fontWeight: 600 }}>
                  {a.article === 'Preamble' ? 'Preamble' : `Article ${a.article}`} — {loc(a.title, lang)}
                </Link>
              ))}
            </section>
          )}
          {laws.length > 0 && (
            <section className="panel">
              <h2 style={{ margin: '0 0 10px', fontSize: 16 }}>Acts & sections</h2>
              {laws.map(({ law }) => (
                <Link key={law.id} to={`/laws/${law.id}`} style={{ display: 'block', padding: '8px 0', borderTop: '1px solid #f1f5f9', color: '#16325c', textDecoration: 'none', fontWeight: 600 }}>
                  {loc(law.name, lang)}
                </Link>
              ))}
            </section>
          )}
          {terms.length > 0 && (
            <section className="panel">
              <h2 style={{ margin: '0 0 10px', fontSize: 16 }}>{tr('legalDict')}</h2>
              {terms.map((t) => (
                <Link key={t.id} to={`/dictionary/${t.id}`} style={{ display: 'block', padding: '8px 0', borderTop: '1px solid #f1f5f9', color: '#16325c', textDecoration: 'none', fontWeight: 600 }}>
                  {loc(t.term, lang)}
                </Link>
              ))}
            </section>
          )}
          {!hasHits && !aiBusy && !aiText && (
            <p className="panel" style={{ color: '#92400e', background: '#fffbeb' }}>
              {tr('noReliable')} Try “Article 21” or tap a suggestion above.
            </p>
          )}
        </div>
      )}

      {query.length < 2 && !asked && (
        <p style={{ color: '#6b7280', fontSize: 14 }}>Type at least 2 characters, or tap a suggestion. Press Search for a CivicAI explanation.</p>
      )}
    </div>
  )
}
