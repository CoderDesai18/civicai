import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type ThemePref = 'light' | 'dark' | 'system'
export type TextSize = 'sm' | 'md' | 'lg' | 'xl'

export interface AppSettings {
  theme: ThemePref
  notifications: boolean
  notificationSound: boolean
  vibration: boolean
  textSize: TextSize
  highContrast: boolean
  reduceMotion: boolean
  screenReader: boolean
  autoSave: boolean
  rememberLogin: boolean
  startPage: string
}

const DEFAULTS: AppSettings = {
  theme: 'system',
  notifications: true,
  notificationSound: true,
  vibration: false,
  textSize: 'md',
  highContrast: false,
  reduceMotion: false,
  screenReader: true,
  autoSave: true,
  rememberLogin: true,
  startPage: '/',
}

const KEY = 'civicai-settings'

function load(): AppSettings {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...DEFAULTS }
    return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<AppSettings>) }
  } catch {
    return { ...DEFAULTS }
  }
}

function apply(s: AppSettings) {
  const root = document.documentElement
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const dark = s.theme === 'dark' || (s.theme === 'system' && systemDark)
  root.dataset.theme = dark ? 'dark' : 'light'
  root.dataset.text = s.textSize
  root.dataset.contrast = s.highContrast ? 'high' : 'normal'
  root.dataset.motion = s.reduceMotion ? 'reduce' : 'ok'
}

interface Ctx {
  settings: AppSettings
  patch: (p: Partial<AppSettings>) => void
  reset: () => void
}

const C = createContext<Ctx | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => load())

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(settings))
    apply(settings)
  }, [settings])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => apply(settings)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [settings])

  const value = useMemo<Ctx>(
    () => ({
      settings,
      patch: (p) => setSettings((s) => ({ ...s, ...p })),
      reset: () => setSettings({ ...DEFAULTS }),
    }),
    [settings],
  )
  return <C.Provider value={value}>{children}</C.Provider>
}

export function useSettings() {
  const ctx = useContext(C)
  if (!ctx) throw new Error('useSettings outside provider')
  return ctx
}
