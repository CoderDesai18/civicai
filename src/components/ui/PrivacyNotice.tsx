import { useLang } from '../../context/LanguageContext'

export function PrivacyNotice({ variant = 'banner' }: { variant?: 'banner' | 'box' }) {
  const { tr } = useLang()
  const cls =
    variant === 'banner'
      ? 'rounded-lg border border-navy-100 bg-navy-50 px-3 py-2 text-sm text-navy-800'
      : 'card p-4 text-sm text-ink-700'
  return (
    <div className={cls} role="note">
      <p>{tr('privacyUpload')}</p>
    </div>
  )
}
