import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useLang } from '../../context/LanguageContext'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'
import { Logo } from '../ui/Logo'
import type { TKey } from '../../data/translations'

const LINKS: { to: string; key: TKey }[] = [
  { to: '/dashboard', key: 'navDashboard' },
  { to: '/analyze', key: 'analyzeCta' },
  { to: '/rent-checker', key: 'navRent' },
  { to: '/legal', key: 'navLawAsk' },
  { to: '/schemes', key: 'navSchemes' },
  { to: '/demo', key: 'tryADemo' },
]

const MORE: { to: string; key: TKey }[] = [
  { to: '/constitution', key: 'exploreConst' },
  { to: '/dictionary', key: 'legalDict' },
  { to: '/compare', key: 'compareDocs' },
  { to: '/missing', key: 'checkReq' },
  { to: '/generate', key: 'prepareDoc' },
  { to: '/history', key: 'myDocs' },
  { to: '/checklists', key: 'navChecklists' },
  { to: '/privacy', key: 'navPrivacy' },
  { to: '/how-it-works', key: 'navHow' },
]

export function Header() {
  const { tr } = useLang()
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  const home = loc.pathname === '/'

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white text-navy-900">
      <div className="h-1 bg-navy-900" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <NavLink to="/" className="shrink-0" aria-label="CivicAI home">
          <Logo light={false} />
        </NavLink>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 text-sm font-medium ${isActive ? 'bg-navy-900 text-white' : 'text-ink-700 hover:bg-navy-50'}`
              }
            >
              {tr(l.key)}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <NavLink to="/analyze" className="hidden rounded-full bg-navy-900 px-3 py-1.5 text-sm font-semibold text-white sm:inline-flex">
            {tr('analyzeCta')}
          </NavLink>
          <LanguageSwitcher compact />
          <button
            type="button"
            className="rounded-md border border-line px-2 py-1 text-sm"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? tr('closeMenu') : tr('openMenu')}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-line bg-white px-4 py-3">
          <ul className="grid gap-1 sm:grid-cols-2">
            {[...LINKS, ...MORE].map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} onClick={() => setOpen(false)} className="block rounded-md px-2 py-2 text-sm">
                  {tr(l.key)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
      {home && <p className="sr-only">CivicAI home</p>}
    </header>
  )
}
