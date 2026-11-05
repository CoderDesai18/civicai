import { useLang } from '../../context/LanguageContext'

export function Disclaimer({ kind = 'general' }: { kind?: 'general' | 'legal' | 'eligibility' }) {
  const { tr } = useLang()
  const text =
    kind === 'legal' ? tr('legalDisclaimer') : kind === 'eligibility' ? `${tr('likelyMatch')} ${tr('verifyOfficial')}` : tr('preliminary')
  return (
    <p className="rounded-md border border-saffron-100 bg-saffron-100/60 px-3 py-2 text-sm text-ink-700" role="note">
      {text}
    </p>
  )
}
