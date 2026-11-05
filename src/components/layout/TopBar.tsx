import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { useAuth } from '../../context/AuthContext'
import { useLang } from '../../context/LanguageContext'
import { LANG_LABEL } from '../../data/translations'
import { Ico } from '../ui/Icons'
import type { Lang } from '../../types'

export function TopBar({ onMenu }: { onMenu: () => void }) {
  const { tr, lang, setLang } = useLang()
  const { profile } = useApp()
  const { user } = useAuth()
  const [notes, setNotes] = useState(false)
  const [langs, setLangs] = useState(false)
  const name = user?.name || profile.name || 'CivicAI user'
  const initial = name.trim().charAt(0).toUpperCase() || 'V'

  return (
    <header className="shell-top">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button type="button" onClick={onMenu} aria-label={tr('openMenu')} style={{ border: 0, background: 'transparent', padding: 6, cursor: 'pointer', color: '#16325c' }}>
          <Ico name="menu" size={22} />
        </button>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <span
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: '#16325c',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 20V10l8-6 8 6v10H4z" stroke="#fff" strokeWidth="1.7" />
              <rect x="10" y="13" width="4" height="7" fill="#60a5fa" />
            </svg>
          </span>
          <span>
            <span style={{ display: 'block', fontWeight: 800, color: '#16325c', fontSize: 16, lineHeight: 1.1 }}>CivicAI</span>
            <span style={{ display: 'block', color: '#6b7280', fontSize: 11 }}>{tr('brandSub')}</span>
          </span>
        </Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setLangs((v) => !v)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              border: '1px solid #e5e7eb',
              background: '#fff',
              borderRadius: 999,
              padding: '6px 12px',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            🌐 {LANG_LABEL[lang]} ▾
          </button>
          {langs && (
            <div style={{ position: 'absolute', right: 0, top: 40, background: '#fff', border: '1px solid #e8ecf4', borderRadius: 12, width: 140, padding: 6, boxShadow: '0 8px 24px rgba(15,23,42,.12)', zIndex: 30 }}>
              {(['en', 'hi', 'mr'] as Lang[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => {
                    setLang(l)
                    setLangs(false)
                  }}
                  style={{ display: 'block', width: '100%', textAlign: 'left', border: 0, background: lang === l ? '#eef3f9' : 'transparent', padding: '8px 10px', borderRadius: 8, cursor: 'pointer' }}
                >
                  {LANG_LABEL[l]}
                </button>
              ))}
            </div>
          )}
        </div>
        <div style={{ position: 'relative' }}>
          <button type="button" aria-label={tr('notifications')} onClick={() => setNotes((v) => !v)} style={{ border: 0, background: 'transparent', padding: 6, cursor: 'pointer', position: 'relative' }}>
            <Ico name="bell" size={20} />
            <span style={{ position: 'absolute', top: 2, right: 2, background: '#ef4444', color: '#fff', fontSize: 10, fontWeight: 700, minWidth: 16, height: 16, borderRadius: 99, display: 'grid', placeItems: 'center' }}>3</span>
          </button>
          {notes && (
            <div style={{ position: 'absolute', right: 0, top: 40, width: 280, background: '#fff', border: '1px solid #e8ecf4', borderRadius: 12, padding: 12, boxShadow: '0 8px 24px rgba(15,23,42,.12)', zIndex: 30, fontSize: 13 }}>
              <b>{tr('notifications')}</b>
              <p style={{ margin: '8px 0 0' }}>{tr('insight1')}</p>
              <p style={{ margin: '8px 0 0' }}>{tr('insight3')}</p>
              <p style={{ margin: '8px 0 0' }}>{tr('lowRead')}</p>
            </div>
          )}
        </div>
        <Link to="/settings" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <span style={{ width: 36, height: 36, borderRadius: '50%', background: '#6d28d9', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700 }}>{initial}</span>
          <span className="hidden sm:block">
            <span style={{ display: 'block', fontWeight: 700, color: '#111827', fontSize: 13, lineHeight: 1.15 }}>{name}</span>
            <span style={{ display: 'block', color: '#f59e0b', fontSize: 11, fontWeight: 600 }}>{tr('premium')}</span>
          </span>
        </Link>
      </div>
    </header>
  )
}
