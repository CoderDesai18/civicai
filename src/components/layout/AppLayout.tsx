import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useLang } from '../../context/LanguageContext'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

export function AppLayout() {
  const { tr } = useLang()
  const [open, setOpen] = useState(false)
  return (
    <div className="shell">
      <a className="skip-link" href="#main">
        {tr('skip')}
      </a>
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="shell-main">
        <TopBar onMenu={() => setOpen((v) => !v)} />
        <main id="main" className="shell-content">
          <Outlet />
        </main>
        <footer style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', padding: '10px 28px', fontSize: 12, color: '#6b7280', borderTop: '1px solid #e8ecf4', background: '#fff' }}>
          <span>⚠ {tr('legalInfoNotice')} Verify with official sources.</span>
          <span>
            {tr('madeWith')} <span style={{ color: '#138808' }}>●</span>
          </span>
        </footer>
      </div>
    </div>
  )
}
