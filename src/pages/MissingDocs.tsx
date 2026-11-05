import { Link } from 'react-router-dom'
import { RequirementChecklist } from '../components/analysis/RequirementChecklist'
import { Disclaimer } from '../components/ui/Disclaimer'
import { useApp } from '../context/AppContext'
import { useLang } from '../context/LanguageContext'
import { ANALYSES } from '../data/documents'

export function MissingDocs() {
  const { tr } = useLang()
  const { analysis, updateRequirement, setAnalysis, saveChecklist } = useApp()
  const data = analysis ?? ANALYSES['demo-scholarship-mh']
  const missing = data.requirements.filter((r) => r.status === 'missing')

  if (!analysis) {
    // show demo requirements without mutating global until user opens analysis
  }

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-semibold text-navy-900">{tr('checkReq')}</h1>
      <Disclaimer />
      <p className="rounded-lg border border-warn-100 bg-warn-100/60 px-3 py-2 text-sm">
        {missing.length} {tr('missingOne')}
      </p>
      <RequirementChecklist
        items={data.requirements}
        onChange={(id, patch) => {
          if (!analysis) setAnalysis(structuredClone(ANALYSES['demo-scholarship-mh']))
          updateRequirement(id, patch)
        }}
        onPrint={() => window.print()}
        onDownload={saveChecklist}
      />
      <Link className="text-navy-700 underline" to="/package">
        {tr('packageTitle')}
      </Link>
    </div>
  )
}
