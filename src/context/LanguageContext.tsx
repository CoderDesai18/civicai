import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { t, type TKey } from '../data/translations'
import type { Lang } from '../types'

interface LanguageCtx {
  lang: Lang
  setLang: (l: Lang) => void
  tr: (key: TKey) => string
}

const Ctx = createContext<LanguageCtx | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('civicai-lang')
    return saved === 'hi' || saved === 'mr' || saved === 'en' ? saved : 'en'
  })

  useEffect(() => {
    localStorage.setItem('civicai-lang', lang)
    document.documentElement.lang = lang === 'en' ? 'en' : lang === 'hi' ? 'hi' : 'mr'
  }, [lang])

  const value = useMemo<LanguageCtx>(
    () => ({
      lang,
      setLang: setLangState,
      tr: (key) => t(lang, key),
    }),
    [lang],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useLang() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useLang outside provider')
  return ctx
}
