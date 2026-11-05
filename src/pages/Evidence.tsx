import { Link } from 'react-router-dom'
import { EvidenceTrail } from '../components/evidence/EvidenceTrail'
import { useApp } from '../context/AppContext'
import { useLang } from '../context/LanguageContext'
import { ANALYSES } from '../data/documents'

export function Evidence() {
  const { tr } = useLang()
  const { analysis } = useApp()
  const nodes = analysis?.evidenceTrail ?? ANALYSES['demo-scholarship-mh'].evidenceTrail
  const isDemoFallback = !analysis

  return (
    <div className="grid gap-6">
      {isDemoFallback && <p className="text-sm text-ink-500">{tr('noEvidence')} Showing the judged demo trail.</p>}
      <EvidenceTrail nodes={nodes} />
      <Link className="text-navy-700 underline" to={analysis ? `/analysis/${analysis.id}?tour=1` : '/analyze?demo=demo-scholarship&run=1'}>
        {analysis ? tr('continueLast') : tr('tryDemo')}
      </Link>
    </div>
  )
}
