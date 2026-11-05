import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ActionCard } from '../components/analysis/ActionCard'
import { EvidenceViewer } from '../components/analysis/EvidenceViewer'
import { ExtractedFieldCard } from '../components/analysis/ExtractedFieldCard'
import { RequirementChecklist } from '../components/analysis/RequirementChecklist'
import { EvidenceTrail } from '../components/evidence/EvidenceTrail'
import { SchemeMatchCard } from '../components/schemes/SchemeMatchCard'
import { Disclaimer } from '../components/ui/Disclaimer'
import { LanguageSwitcher } from '../components/ui/LanguageSwitcher'
import { useApp } from '../context/AppContext'
import { useLang } from '../context/LanguageContext'
import { ANALYSES } from '../data/documents'
import { EXTRA_ANALYSES } from '../data/extraAnalyses'
import { SCHEMES } from '../data/schemes'
import type { TKey } from '../data/translations'
import { DEFAULT_ANSWERS, loc, matchSchemes } from '../services/api'
import type { ExtractedField } from '../types'

const SECTIONS: { id: string; key: TKey }[] = [
  { id: 'overview', key: 'overview' },
  { id: 'explanation', key: 'explanation' },
  { id: 'fields', key: 'fields' },
  { id: 'requirements', key: 'requirements' },
  { id: 'schemes', key: 'relevantSchemes' },
  { id: 'evidence', key: 'evidenceTitle' },
  { id: 'actions', key: 'nextActions' },
]

export function AnalysisResult() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const { lang, tr } = useLang()
  const { analysis, setAnalysis, updateField, updateRequirement, saveChecklist, confirmReadableFields } = useApp()
  const [evidence, setEvidence] = useState<ExtractedField | null>(null)
  const [speaking, setSpeaking] = useState(false)
  const [step, setStep] = useState(0)
  const tour = params.get('tour') === '1'

  useEffect(() => {
    if (id && (!analysis || analysis.id !== id)) {
      if (ANALYSES[id]) setAnalysis(structuredClone(ANALYSES[id]))
      else if (EXTRA_ANALYSES[id]) setAnalysis(structuredClone(EXTRA_ANALYSES[id]))
    }
  }, [id, analysis, setAnalysis])

  useEffect(() => {
    if (!tour) return
    const el = document.getElementById(SECTIONS[step].id)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [step, tour])

  const matches = useMemo(() => {
    if (!analysis) return []
    return matchSchemes(DEFAULT_ANSWERS, analysis.schemeIds)
  }, [analysis])

  if (!analysis) {
    return (
      <div className="card p-6">
        <p>{tr('emptyDash')}</p>
        <Link className="mt-3 inline-block text-navy-700 underline" to="/analyze?demo=demo-scholarship&run=1">
          {tr('tryDemo')}
        </Link>
      </div>
    )
  }

  const current = analysis
  const unconfirmed = current.fields.filter((f) => !f.confirmed)
  const lowFields = current.fields.filter((f) => f.confidence === 'low')

  function downloadList() {
    const lines = current.requirements.map(
      (r) => `- [${r.status}] ${loc(r.title, lang)}${r.notes ? ` — ${r.notes}` : ''}`,
    )
    const blob = new Blob(
      [`CivicAI checklist (preliminary)\n${current.documentName}\n\n${lines.join('\n')}\n\n${tr('preliminary')}`],
      { type: 'text/plain' },
    )
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'civicai-checklist.txt'
    a.click()
    URL.revokeObjectURL(url)
    saveChecklist()
  }

  function toggleSpeech() {
    if (speaking) {
      window.speechSynthesis?.cancel()
      setSpeaking(false)
      return
    }
    const text = current.explanation.map((p) => loc(p, lang)).join(' ')
    if (!window.speechSynthesis) {
      setSpeaking(true)
      return
    }
    const u = new SpeechSynthesisUtterance(text)
    u.lang = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN'
    u.onend = () => setSpeaking(false)
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(u)
    setSpeaking(true)
  }

  return (
    <div className="grid gap-8">
      {tour && (
        <div className="card sticky top-[68px] z-30 flex flex-wrap items-center justify-between gap-3 bg-white/95 p-3 no-print">
          <p className="text-sm font-semibold text-navy-900">
            {tr('walkthrough')} · {step + 1}/{SECTIONS.length} · {tr(SECTIONS[step].key)}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-md border border-line px-3 py-1.5 text-sm disabled:opacity-40"
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
            >
              {tr('prevSection')}
            </button>
            <button
              type="button"
              className="rounded-md bg-navy-900 px-3 py-1.5 text-sm text-white disabled:opacity-40"
              disabled={step === SECTIONS.length - 1}
              onClick={() => setStep((s) => Math.min(SECTIONS.length - 1, s + 1))}
            >
              {tr('nextSection')}
            </button>
          </div>
        </div>
      )}

      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-india-700">{tr('workflow')}</p>
          <h1 className="text-3xl font-semibold text-navy-900">{tr('overview')}</h1>
          <p className="mt-1 text-sm text-ink-500">{tr('demoLoaded')}</p>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button type="button" className="text-sm underline" onClick={toggleSpeech}>
            {speaking ? tr('stopAudio') : tr('readAloud')}
          </button>
        </div>
      </header>
      {speaking && <p className="text-sm text-ink-500">{tr('speaking')}</p>}

      <Disclaimer />
      <p className="text-sm text-ink-600">{tr('factVsAi')}</p>
      {analysis.prototype && <p className="text-sm font-medium text-saffron-600">{tr('prototypeData')}</p>}

      <nav className="flex flex-wrap gap-2 no-print" aria-label={tr('jumpTo')}>
        {SECTIONS.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={() => setStep(i)}
            className={`rounded-full border px-3 py-1 text-sm ${
              step === i ? 'border-navy-900 bg-navy-900 text-white' : 'border-line bg-white text-navy-800'
            }`}
          >
            {i + 1}. {tr(s.key)}
          </a>
        ))}
      </nav>

      {analysis.qualityIssues.length > 0 && (
        <ul className="grid gap-2">
          {analysis.qualityIssues.map((q) => (
            <li key={q.type} className="rounded-lg border border-warn-100 bg-warn-100/60 px-3 py-2 text-sm">
              {loc(q.message, lang)}
            </li>
          ))}
        </ul>
      )}

      {unconfirmed.length > 0 && (
        <div className="rounded-lg border border-warn-100 bg-warn-100/70 p-4">
          <p className="font-medium text-ink-900">{tr('unconfirmedWarn')}</p>
          <p className="mt-1 text-sm text-ink-700">{tr('confirmPersonal')}</p>
          {lowFields.length > 0 && <p className="mt-1 text-sm text-bad-700">{tr('lowOcrNeverAuto')}</p>}
          <button type="button" className="mt-3 rounded-md bg-navy-900 px-3 py-1.5 text-sm text-white" onClick={confirmReadableFields}>
            {tr('confirmAll')}
          </button>
        </div>
      )}

      <section id="overview" className="card grid scroll-mt-28 gap-3 p-5 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase text-ink-500">{tr('overview')}</p>
          <p className="text-lg font-semibold">{analysis.documentName}</p>
          <span className="mt-1 inline-block rounded-full bg-navy-50 px-2 py-0.5 text-xs font-semibold text-navy-800">
            {tr('extractedFact')}
          </span>
        </div>
        <p>
          <span className="text-xs uppercase text-ink-500">{tr('type')}</span>
          <br />
          {loc(analysis.documentType, lang)}
        </p>
        <p>
          <span className="text-xs uppercase text-ink-500">{tr('purpose')}</span>
          <br />
          {loc(analysis.purpose, lang)}
        </p>
        <p>
          <span className="text-xs uppercase text-ink-500">{tr('authority')}</span>
          <br />
          {analysis.issuingAuthority}
        </p>
        <p>
          <span className="text-xs uppercase text-ink-500">{tr('docLang')}</span>
          <br />
          {analysis.language}
        </p>
        <p>
          <span className="text-xs uppercase text-ink-500">{tr('status')}</span>
          <br />
          {analysis.status}
        </p>
        <p>
          <span className="text-xs uppercase text-ink-500">{tr('dateAnalyzed')}</span>
          <br />
          {analysis.createdAt.slice(0, 10)}
        </p>
        <p>
          <span className="text-xs uppercase text-ink-500">{tr('pages')}</span>
          <br />1
        </p>
      </section>

      <section id="explanation" className="card scroll-mt-28 p-5">
        <h2 className="text-xl font-semibold text-navy-900">{tr('whatIsThis')}</h2>
        <p className="mt-1 text-xs font-semibold uppercase text-saffron-600">{tr('civicaiExplanation')}</p>
        <div className="prose-civic mt-3 max-w-3xl">
          {analysis.explanation.map((p) => (
            <p key={p.en}>{loc(p, lang)}</p>
          ))}
        </div>
      </section>

      <section id="fields" className="scroll-mt-28">
        <h2 className="mb-3 text-xl font-semibold text-navy-900">{tr('importantInfo')}</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {analysis.fields.map((f) => (
            <ExtractedFieldCard key={f.id} field={f} onEvidence={setEvidence} onSave={updateField} />
          ))}
          {analysis.fields.length === 0 && <p className="text-ink-500">{tr('noReliable')}</p>}
        </div>
      </section>

      <div id="requirements" className="scroll-mt-28">
        <h2 className="mb-3 text-xl font-semibold text-navy-900">{tr('thingsNotice')}</h2>
        <RequirementChecklist
          items={analysis.requirements}
          onChange={updateRequirement}
          onPrint={() => {
            saveChecklist()
            window.print()
          }}
          onDownload={downloadList}
        />
      </div>

      <section id="schemes" className="scroll-mt-28">
        <h2 className="mb-3 text-xl font-semibold text-navy-900">{tr('relevantSchemes')}</h2>
        <p className="mb-1 text-sm text-ink-500">{tr('likelyMatch')}</p>
        <p className="mb-3 text-sm font-medium text-saffron-600">{tr('neverEligible')}</p>
        <div className="grid gap-4 lg:grid-cols-2">
          {matches.slice(0, 4).map((m) => (
            <SchemeMatchCard key={m.scheme.id} scheme={m.scheme} match={m} />
          ))}
          {matches.length === 0 &&
            analysis.schemeIds
              .map((sid) => SCHEMES.find((s) => s.id === sid))
              .filter(Boolean)
              .slice(0, 3)
              .map((s) => s && <SchemeMatchCard key={s.id} scheme={s} />)}
        </div>
      </section>

      <div id="evidence" className="scroll-mt-28">
        <EvidenceTrail nodes={analysis.evidenceTrail} />
      </div>

      <section id="actions" className="scroll-mt-28">
        <h2 className="mb-3 text-xl font-semibold text-navy-900">{tr('whatNext')}</h2>
        <p className="mb-3 text-sm text-ink-500">{tr('complements')}</p>
        <div className="grid gap-3 md:grid-cols-2">
          {analysis.actions.map((a) => (
            <ActionCard key={a.id} action={a} />
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-3 no-print">
        <Link className="rounded-md border border-line px-4 py-2 text-sm" to="/privacy">
          {tr('goPrivacy')}
        </Link>
        <Link className="rounded-md border border-line px-4 py-2 text-sm" to="/how-it-works">
          {tr('navHow')}
        </Link>
        <Link className="rounded-md bg-navy-900 px-4 py-2 text-sm text-white" to="/analyze?demo=demo-income">
          {tr('demoDocs')}
        </Link>
      </div>

      {evidence && (
        <EvidenceViewer field={evidence} documentName={analysis.documentName} onClose={() => setEvidence(null)} />
      )}
    </div>
  )
}
