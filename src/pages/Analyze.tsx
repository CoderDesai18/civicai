import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AnalysisProgress } from '../components/analysis/AnalysisProgress'
import { DocumentQualityCheck } from '../components/upload/DocumentQualityCheck'
import { PrivacyNotice } from '../components/ui/PrivacyNotice'
import { Disclaimer } from '../components/ui/Disclaimer'
import { useApp } from '../context/AppContext'
import { useLang } from '../context/LanguageContext'
import { DEMO_DOCS } from '../data/documents'
import { runAnalysis, wait } from '../services/api'
import { classifyFile } from '../services/classify'

const TYPES = [
  { id: 'government', label: 'Government application / certificate' },
  { id: 'rent', label: 'Rent / leave-and-licence' },
  { id: 'employment', label: 'Employment contract' },
  { id: 'loan', label: 'Loan agreement' },
  { id: 'insurance', label: 'Insurance policy' },
  { id: 'legal', label: 'Other legal document' },
]

let lastAutoRun = 0

export function Analyze() {
  const { tr } = useLang()
  const nav = useNavigate()
  const [params] = useSearchParams()
  const { consent, setConsent, setAnalysis, setProcessingSecure, setDemoMode, addHistory } = useApp()
  const [fileName, setFileName] = useState('')
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'idle' | 'quality' | 'classify' | 'running' | 'error'>('idle')
  const [guess, setGuess] = useState<{ type: string; confidence: 'high' | 'medium' | 'low'; demoId?: string } | null>(null)
  const [error, setError] = useState('')
  const [cameraOn, setCameraOn] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const pdfRef = useRef<HTMLInputElement>(null)
  const photoRef = useRef<HTMLInputElement>(null)
  const started = useRef(false)

  function stopCam() {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    setCameraOn(false)
  }

  async function startCam() {
    setError('')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      streamRef.current = stream
      setCameraOn(true)
      requestAnimationFrame(() => {
        if (videoRef.current) videoRef.current.srcObject = stream
      })
    } catch {
      setError(tr('ocrFail') + ' Using demo capture instead.')
      setCameraOn(true)
    }
  }

  function captureFrame() {
    const video = videoRef.current
    if (video && video.videoWidth) {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      canvas.getContext('2d')?.drawImage(video, 0, 0)
      canvas.toBlob((blob) => {
        stopCam()
        if (blob) void onFile(new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' }))
      }, 'image/jpeg', 0.85)
      return
    }
    stopCam()
    void begin('demo-domicile', 'camera-scan-sample.jpg', { skipConsent: true })
  }

  async function onFile(file: File) {
    if (!consent) {
      setError(tr('needConsent'))
      return
    }
    const ok =
      ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'].includes(file.type) ||
      /\.(pdf|jpe?g|png|webp)$/i.test(file.name)
    if (!ok || file.size > 10 * 1024 * 1024) {
      setError(tr('processFail'))
      return
    }
    setError('')
    setFileName(file.name)
    const c = classifyFile(file.name, file.type)
    setGuess(c)
    if (c.confidence === 'low') {
      setPhase('classify')
      return
    }
    if (c.demoId === 'demo-domicile') {
      setPhase('quality')
      return
    }
    if (c.type === 'rent') {
      nav('/rent-checker?demo=1')
      return
    }
    await runPipeline(c.demoId, file.name)
  }

  async function begin(id?: string, name?: string, opts?: { skipConsent?: boolean }) {
    if (!opts?.skipConsent && !consent) {
      setError(tr('needConsent'))
      return
    }
    setError('')
    const resolved = id ?? 'demo-scholarship'
    const chosen = DEMO_DOCS.find((d) => d.id === resolved)
    if (chosen?.qualityPreview && params.get('run') !== '1') {
      setPhase('quality')
      setFileName(chosen.fileName)
      return
    }
    await runPipeline(resolved, name ?? chosen?.fileName)
  }

  async function runPipeline(id?: string, name?: string) {
    setPhase('running')
    setProcessingSecure(true)
    setProgress(0)
    for (let i = 0; i < 7; i++) {
      setProgress(i)
      await wait(280)
    }
    setProgress(7)
    const result = await runAnalysis({ demoId: id, fileName: name })
    setAnalysis(result)
    addHistory({
      id: result.id,
      name: result.documentName,
      kind: 'government',
      typeLabel: 'Document',
      date: new Date().toISOString().slice(0, 10),
      status: result.status,
      href: `/analysis/${result.id}`,
    })
    setProcessingSecure(false)
    nav(`/analysis/${result.id}`)
  }

  useEffect(() => {
    const q = params.get('demo')
    const run = params.get('run') === '1'
    if (run && !started.current && Date.now() - lastAutoRun > 1500) {
      started.current = true
      lastAutoRun = Date.now()
      setConsent(true)
      setDemoMode(true)
      const id = q && DEMO_DOCS.some((d) => d.id === q) ? q : 'demo-scholarship'
      void begin(id, DEMO_DOCS.find((d) => d.id === id)?.fileName, { skipConsent: true })
    }
    return () => stopCam()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  return (
    <div className="grid gap-6">
      <header>
        <h1 className="text-3xl font-semibold text-navy-900">{tr('analyzeCta')}</h1>
        <p className="mt-1 text-ink-500">{tr('uploadHint')}</p>
      </header>
      <Disclaimer />
      <PrivacyNotice />

      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
        <span>{tr('consentLabel')}</span>
      </label>
      {error && (
        <p className="text-sm text-bad-700" role="alert">
          {error}
        </p>
      )}

      {phase === 'idle' && (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <button type="button" className="card p-6 text-left hover:border-navy-700" onClick={() => pdfRef.current?.click()}>
              <p className="text-sm font-semibold text-india-700">01</p>
              <h2 className="mt-1 text-xl font-semibold">{tr('uploadPdf')}</h2>
              <p className="mt-2 text-sm text-ink-600">PDF · max 10 MB</p>
            </button>
            <button type="button" className="card p-6 text-left hover:border-navy-700" onClick={() => photoRef.current?.click()}>
              <p className="text-sm font-semibold text-india-700">02</p>
              <h2 className="mt-1 text-xl font-semibold">{tr('uploadPhoto')}</h2>
              <p className="mt-2 text-sm text-ink-600">JPG · PNG · WEBP</p>
            </button>
            <button type="button" className="card p-6 text-left hover:border-navy-700" onClick={() => void startCam()}>
              <p className="text-sm font-semibold text-india-700">03</p>
              <h2 className="mt-1 text-xl font-semibold">{tr('takePhoto')}</h2>
              <p className="mt-2 text-sm text-ink-600">{tr('captureDoc')}</p>
            </button>
          </div>
          <input ref={pdfRef} type="file" accept="application/pdf,.pdf" className="sr-only" onChange={(e) => e.target.files?.[0] && void onFile(e.target.files[0])} />
          <input
            ref={photoRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
            className="sr-only"
            onChange={(e) => e.target.files?.[0] && void onFile(e.target.files[0])}
          />
          {fileName && (
            <p className="text-sm text-ink-500">
              {tr('uploadProgress')}: {fileName}
            </p>
          )}

          {cameraOn && (
            <div className="card p-4">
              <video ref={videoRef} autoPlay playsInline className="mx-auto max-h-72 w-full rounded-lg bg-navy-950" />
              <div className="mt-3 flex gap-2">
                <button type="button" className="rounded-full bg-navy-900 px-4 py-2 text-sm text-white" onClick={captureFrame}>
                  {tr('captureNow')}
                </button>
                <button type="button" className="rounded-full border px-4 py-2 text-sm" onClick={stopCam}>
                  {tr('closeCamera')}
                </button>
              </div>
            </div>
          )}

          <p className="text-sm">
            <Link className="font-medium text-navy-800 underline" to="/demo">
              {tr('tryADemo')}
            </Link>
          </p>
        </>
      )}

      {phase === 'classify' && (
        <section className="card p-5">
          <h2 className="text-xl font-semibold">{tr('whatType')}</h2>
          <p className="mt-1 text-sm text-ink-500">{tr('notSureInfo')}</p>
          <div className="mt-4 grid gap-2">
            {TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                className="rounded-lg border border-line px-3 py-2 text-left hover:border-navy-700"
                onClick={() => {
                  if (t.id === 'rent') nav('/rent-checker?demo=1')
                  else void runPipeline(guess?.demoId ?? 'demo-scholarship', fileName)
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </section>
      )}

      {phase === 'quality' && (
        <DocumentQualityCheck
          issues={[
            {
              type: 'glare',
              severity: 'warning',
              message: { en: 'Glare detected.', hi: 'चमक मिली।', mr: 'चमक आढळली.' },
            },
          ]}
          onRetake={() => {
            setPhase('idle')
            void startCam()
          }}
          onClearer={() => setPhase('idle')}
          onContinue={() => void runPipeline('demo-domicile', fileName || 'scan.jpg')}
        />
      )}

      {phase === 'running' && <AnalysisProgress step={Math.min(progress, 6)} />}
    </div>
  )
}
