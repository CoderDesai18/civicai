import { useState } from 'react'
import { PrivacyNotice } from '../components/ui/PrivacyNotice'
import { useApp } from '../context/AppContext'
import { useLang } from '../context/LanguageContext'

export function Privacy() {
  const { tr } = useLang()
  const { deleteDocument, deleteSession, sessionNotice, analysis } = useApp()
  const [timeoutOn, setTimeoutOn] = useState(true)

  return (
    <div className="grid max-w-3xl gap-6">
      <h1 className="text-3xl font-semibold text-navy-900">{tr('privacyTitle')}</h1>
      <PrivacyNotice variant="box" />
      <section className="card grid gap-2 p-5 text-sm">
        <p>✓ {tr('encrypted')} (prototype indicator)</p>
        <p>✓ {tr('tempSession')}</p>
        <p>✓ {tr('autoDelete')}</p>
        <p>✓ {tr('noTraining')}</p>
        <p>✓ {tr('maskNote')}</p>
        <p>✓ {tr('purposeLimit')}</p>
        <p>✓ {tr('noCert')}</p>
      </section>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={timeoutOn} onChange={(e) => setTimeoutOn(e.target.checked)} />
        {tr('sessionExpired')}
      </label>
      <div className="flex flex-wrap gap-3">
        <button type="button" className="rounded-lg border border-bad-700 px-4 py-2 text-sm font-medium text-bad-700" onClick={deleteDocument} disabled={!analysis}>
          {tr('deleteDoc')}
        </button>
        <button type="button" className="rounded-lg bg-bad-700 px-4 py-2 text-sm font-semibold text-white" onClick={deleteSession}>
          {tr('deleteSession')}
        </button>
      </div>
      {sessionNotice === 'deleted' && (
        <p className="rounded-md bg-ok-100 px-3 py-2 text-ok-700" role="status">
          {tr('deleted')}
        </p>
      )}
      <article className="card p-5">
        <h2 className="font-semibold">{tr('privacyPolicy')}</h2>
        <p className="mt-2 text-sm text-ink-700">
          This placeholder policy is for the SIH prototype. CivicAI processes a document only after consent, only for the
          requested explanation and checklist, and does not publish uploads. Official decisions stay with government
          officers and courts.
        </p>
      </article>
    </div>
  )
}
