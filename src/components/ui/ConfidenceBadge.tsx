import { useLang } from '../../context/LanguageContext'
import type { Confidence } from '../../types'

export function ConfidenceBadge({ level }: { level: Confidence }) {
  const { tr } = useLang()
  const map = {
    high: 'bg-ok-100 text-ok-700',
    medium: 'bg-warn-100 text-warn-700',
    low: 'bg-bad-100 text-bad-700',
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${map[level]}`}>
      {tr(level)} {level === 'low' ? '· OCR' : ''}
    </span>
  )
}
