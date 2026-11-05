import { LANG_LABEL } from '../../data/translations'
import { useLang } from '../../context/LanguageContext'
import type { Lang } from '../../types'

const LANGS: Lang[] = ['en', 'hi', 'mr']

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang, tr } = useLang()
  return (
    <div className="inline-flex items-center gap-1" role="group" aria-label={tr('language')}>
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          className={`rounded-md px-2 py-1 text-sm font-medium ${
            lang === l ? 'bg-navy-900 text-white' : 'text-ink-700 hover:bg-navy-50'
          }`}
          aria-pressed={lang === l}
        >
          {compact ? l.toUpperCase() : LANG_LABEL[l]}
        </button>
      ))}
    </div>
  )
}
