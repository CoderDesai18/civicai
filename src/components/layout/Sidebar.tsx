import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useLang } from '../../context/LanguageContext'
import { Ico } from '../ui/Icons'
import type { TKey } from '../../data/translations'

const ITEMS: { to: string; key: TKey; icon: string; exact?: boolean }[] = [
  { to: '/', key: 'navDashboard', icon: 'home', exact: true },
  { to: '/analyze', key: 'navAnalyze', icon: 'doc' },
  { to: '/rent-checker', key: 'tileRent', icon: 'house' },
  { to: '/legal', key: 'tileLaw', icon: 'scale' },
  { to: '/constitution', key: 'exploreConst', icon: 'book' },
  { to: '/schemes', key: 'tileScheme', icon: 'bank' },
  { to: '/missing', key: 'navDocCheck', icon: 'check' },
  { to: '/history', key: 'myDocs', icon: 'folder' },
  { to: '/checklists', key: 'navChecklists', icon: 'list' },
  { to: '/generate', key: 'tileCreate', icon: 'pen' },
  { to: '/dictionary', key: 'legalDict', icon: 'dict' },
  { to: '/legal', key: 'askLaw', icon: 'chat' },
  { to: '/compare', key: 'compareDocs', icon: 'cmp' },
]

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { tr } = useLang()
  const { signOut } = useAuth()
  const nav = useNavigate()
  return (
    <>
      {open && <button type="button" className="side-scrim" aria-label={tr('closeMenu')} onClick={onClose} />}
      <aside className={`shell-side ${open ? 'open' : ''}`}>
        <nav className="flex-1 overflow-y-auto py-3" aria-label="Primary">
          {ITEMS.map((item, i) => (
            <NavLink
              key={`${item.key}-${i}`}
              to={item.to}
              end={item.exact}
              onClick={onClose}
              className={({ isActive }) => `nav-item ${isActive ? (item.exact ? 'active' : 'soft active') : ''}`}
            >
              <Ico name={item.icon} />
              {tr(item.key)}
            </NavLink>
          ))}
          <div style={{ height: 8 }} />
          <NavLink to="/settings" onClick={onClose} className="nav-item">
            <Ico name="gear" />
            {tr('settings')}
          </NavLink>
          <button
            type="button"
            className="nav-item"
            style={{ width: 'calc(100% - 20px)', border: 0, background: 'transparent', cursor: 'pointer' }}
            onClick={() => {
              onClose()
              void signOut().then(() => nav('/login', { replace: true }))
            }}
          >
            <Ico name="out" />
            {tr('logout')}
          </button>
        </nav>
        <div style={{ padding: 12 }}>
          <NavLink
            to="/demo"
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#eaf1ff',
              borderRadius: 16,
              padding: '12px 14px',
              textDecoration: 'none',
            }}
          >
            <span>
              <span style={{ display: 'block', color: '#1d4ed8', fontWeight: 700, fontSize: 13 }}>{tr('needHelp')}</span>
              <span style={{ color: '#3b82f6', fontSize: 12 }}>{tr('watchDemo')}</span>
            </span>
            <span
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: '#2563eb',
                color: '#fff',
                display: 'grid',
                placeItems: 'center',
                fontSize: 12,
              }}
            >
              ▶
            </span>
          </NavLink>
        </div>
      </aside>
    </>
  )
}
