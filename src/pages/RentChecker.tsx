import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Disclaimer } from '../components/ui/Disclaimer'
import { useApp } from '../context/AppContext'
import { useLang } from '../context/LanguageContext'
import { RENT_DEMO } from '../data/rentAgreement'
import { wait } from '../services/api'

export function RentChecker() {
  const { tr } = useLang()
  const nav = useNavigate()
  const [params] = useSearchParams()
  const { setRentReview, addHistory, setConsent } = useApp()
  const [running, setRunning] = useState(false)
  const [consentOk, setConsentOk] = useState(false)

  async function runDemo() {
    setConsent(true)
    setRunning(true)
    await wait(900)
    const copy = structuredClone(RENT_DEMO)
    setRentReview(copy)
    addHistory({
      id: copy.id,
      name: copy.documentName,
      kind: 'rent',
      typeLabel: 'Leave and licence',
      date: '2026-08-19',
      status: 'Reviewed (preliminary)',
      href: '/rent-checker/demo-rent-pune',
    })
    setRunning(false)
    nav('/rent-checker/demo-rent-pune')
  }

  useEffect(() => {
    if (params.get('demo') === '1') void runDemo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-semibold text-navy-900">{tr('rentCheck')}</h1>
      <Disclaimer kind="legal" />
      <p>{tr('legalInfoNotice')}</p>
      <p className="text-sm">{tr('mayNeedReview')}</p>
      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" checked={consentOk} onChange={(e) => setConsentOk(e.target.checked)} className="mt-1" />
        <span>{tr('consentLabel')}</span>
      </label>
      <div className="card p-5">
        <p className="font-medium">{tr('demoDocs')}</p>
        <p className="mt-1 text-sm text-ink-600">Pune_Leave_and_Licence_Sample.pdf — 11 months, ₹22,000, deposit without refund timeline.</p>
        <button
          type="button"
          className="mt-3 rounded-md bg-india-600 px-4 py-2 font-semibold text-white disabled:opacity-50"
          disabled={running}
          onClick={() => void runDemo()}
        >
          {running ? tr('reading') : tr('startThisDemo')}
        </button>
      </div>
      <p className="text-sm">
        {tr('checkDoc')} —{' '}
        <Link className="underline" to="/analyze">
          {tr('analyzeCta')}
        </Link>
      </p>
    </div>
  )
}
