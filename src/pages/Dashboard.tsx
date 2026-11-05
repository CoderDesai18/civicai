import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LanguageContext'
import type { TKey } from '../data/translations'

const TILES: { to: string; title: TKey; desc: TKey; bg: string; fg: string; iconBg: string }[] = [
  { to: '/analyze', title: 'tileAnalyze', desc: 'tileAnalyzeD', bg: '#eef4ff', fg: '#1d4ed8', iconBg: '#dbe7ff' },
  { to: '/rent-checker', title: 'tileRent', desc: 'tileRentD', bg: '#ecfdf3', fg: '#15803d', iconBg: '#dcfce7' },
  { to: '/legal', title: 'tileLaw', desc: 'tileLawD', bg: '#f4eaff', fg: '#7c3aed', iconBg: '#ede0ff' },
  { to: '/schemes', title: 'tileScheme', desc: 'tileSchemeD', bg: '#fff4e8', fg: '#c2410c', iconBg: '#ffedd5' },
  { to: '/missing', title: 'tileCheck', desc: 'tileCheckD', bg: '#e8fbff', fg: '#0f766e', iconBg: '#ccfbf1' },
  { to: '/generate', title: 'tileCreate', desc: 'tileCreateD', bg: '#fff0f3', fg: '#be123c', iconBg: '#ffe4e6' },
]

const ICONS = ['📄', '🏠', '⚖️', '🏛️', '📋', '✏️']

const DEMO_ACTIVITY = [
  { name: 'Rent Agreement - 12 May 2024.pdf', kind: 'Rent Agreement Checker', href: '/rent-checker?demo=1', status: 'Completed', when: '2 hours ago', bg: '#ffe4e6', fg: '#e11d48' },
  { name: 'Income Certificate (Photo).jpg', kind: 'Document Analysis', href: '/analyze?demo=demo-income&run=1', status: 'Completed', when: '5 hours ago', bg: '#dcfce7', fg: '#16a34a' },
  { name: 'Employment Contract.pdf', kind: 'Legal Document Analysis', href: '/analyze?demo=demo-employment&run=1', status: 'Completed', when: 'Yesterday', bg: '#ede9fe', fg: '#7c3aed' },
  { name: 'Article 21 - Right to Life', kind: 'Indian Law Explorer', href: '/constitution/art-21', status: 'Viewed', when: 'Yesterday', bg: '#ffedd5', fg: '#ea580c' },
  { name: 'PMAY (Urban) — official scheme page', kind: 'Scheme Finder', href: '/schemes', status: 'Viewed', when: '2 days ago', bg: '#dbeafe', fg: '#2563eb' },
]

export function Dashboard() {
  const { tr } = useLang()
  const { profile, history, analysis } = useApp()
  const { user } = useAuth()
  const nav = useNavigate()
  const [q, setQ] = useState('')
  const first = (user?.name || profile.name || 'there').split(' ')[0]
  const hour = new Date().getHours()
  const greet = hour < 12 ? tr('goodMorning') : hour < 17 ? tr('goodAfternoon') : tr('goodEvening')

  const activity = useMemo(() => {
    if (history.length) {
      return history.slice(0, 5).map((h) => ({
        name: h.name,
        kind: h.typeLabel,
        href: h.href,
        status: 'Completed',
        when: h.date,
        bg: '#eef2ff',
        fg: '#4338ca',
      }))
    }
    return DEMO_ACTIVITY
  }, [history])

  const available = analysis ? analysis.requirements.filter((r) => r.status === 'completed').length : 4
  const missing = analysis ? analysis.requirements.filter((r) => r.status === 'missing').length : 1
  const totalReq = Math.max(available + missing, 5)
  const pct = available / totalReq
  const r = 38
  const circ = 2 * Math.PI * r

  return (
    <div>
      <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#111827' }}>
        {greet}, {first}! 👋
      </h1>
      <p style={{ margin: '6px 0 20px', color: '#6b7280' }}>{tr('whatDo')}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
        {TILES.map((t, i) => (
          <Link key={t.title} to={t.to} className="tile" style={{ background: t.bg }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ width: 36, height: 36, borderRadius: 10, background: t.iconBg, display: 'grid', placeItems: 'center', fontSize: 18 }}>{ICONS[i]}</span>
              <span style={{ color: t.fg, fontWeight: 700 }}>→</span>
            </div>
            <div style={{ marginTop: 'auto' }}>
              <div style={{ color: t.fg, fontWeight: 800, fontSize: 14.5, marginTop: 14 }}>{tr(t.title)}</div>
              <div style={{ color: '#4b5563', fontSize: 12, marginTop: 6, lineHeight: 1.45 }}>{tr(t.desc)}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="dash-split" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(280px, 1fr)', gap: 16, marginTop: 16 }}>
        <section className="panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: 17 }}>{tr('recentActivity')}</h2>
            <Link to="/history" style={{ color: '#2563eb', fontSize: 13, textDecoration: 'none' }}>
              {tr('viewAll')}
            </Link>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0' }}>
            {activity.map((row) => (
              <li key={row.name} style={{ borderTop: '1px solid #f1f5f9' }}>
                <Link to={row.href} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', textDecoration: 'none', color: 'inherit' }}>
                  <span style={{ width: 40, height: 40, borderRadius: 12, background: row.bg, color: row.fg, display: 'grid', placeItems: 'center', fontWeight: 800 }}>▣</span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontWeight: 700, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.name}</span>
                    <span style={{ display: 'block', color: '#6b7280', fontSize: 12 }}>{row.kind}</span>
                  </span>
                  <span style={{ background: row.status === 'Completed' ? '#ecfdf5' : '#eff6ff', color: row.status === 'Completed' ? '#059669' : '#2563eb', borderRadius: 999, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>
                    {row.status}
                  </span>
                  <span style={{ color: '#9ca3af', fontSize: 12, width: 78, textAlign: 'right' }}>{row.when}</span>
                  <span style={{ color: '#cbd5e1' }}>›</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel">
          <h2 style={{ margin: 0, fontSize: 17 }}>{tr('appReady')}</h2>
          <div style={{ display: 'flex', gap: 18, alignItems: 'center', marginTop: 16 }}>
            <svg width="108" height="108" viewBox="0 0 108 108">
              <circle cx="54" cy="54" r={r} fill="none" stroke="#e5e7eb" strokeWidth="11" />
              <circle cx="54" cy="54" r={r} fill="none" stroke="#22c55e" strokeWidth="11" strokeLinecap="round" strokeDasharray={`${pct * circ} ${circ}`} transform="rotate(-90 54 54)" />
              <text x="54" y="52" textAnchor="middle" fontSize="18" fontWeight="800" fill="#111827">
                {available}/{totalReq}
              </text>
              <text x="54" y="70" textAnchor="middle" fontSize="11" fill="#6b7280">
                {tr('readyWord')}
              </text>
            </svg>
            <div style={{ fontSize: 13, lineHeight: 1.9 }}>
              <div>
                <span style={{ display: 'inline-block', width: 10, height: 10, background: '#22c55e', borderRadius: 2, marginRight: 6 }} />
                {available} {tr('availableN')}
              </div>
              <div>
                <span style={{ display: 'inline-block', width: 10, height: 10, background: '#f59e0b', borderRadius: 2, marginRight: 6 }} />
                {missing} {tr('missing')}
              </div>
              <div>
                <span style={{ display: 'inline-block', width: 10, height: 10, background: '#d1d5db', borderRadius: 2, marginRight: 6 }} />
                0 {tr('optionalN')}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 16, background: '#eef4ff', borderRadius: 14, padding: 14 }}>
            <div style={{ fontWeight: 700, color: '#1d4ed8' }}>{tr('almostReady')}</div>
            <div style={{ color: '#3b82f6', fontSize: 13, marginTop: 4 }}>{tr('uploadMissing')}</div>
            <Link to="/missing" style={{ display: 'inline-block', marginTop: 10, background: '#2563eb', color: '#fff', borderRadius: 8, padding: '7px 12px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
              {tr('viewChecklist')}
            </Link>
          </div>
        </section>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 16 }}>
        <section className="panel">
          <h2 style={{ margin: 0, fontSize: 16 }}>{tr('statusOverview')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 14 }}>
            {[
              { n: 8, l: tr('analyzedCount'), bg: '#ecfdf5', fg: '#059669' },
              { n: 3, l: tr('processingCount'), bg: '#eff6ff', fg: '#2563eb' },
              { n: 1, l: tr('actionRequired'), bg: '#fff7ed', fg: '#d97706' },
              { n: 12, l: tr('totalDocs'), bg: '#f5f3ff', fg: '#7c3aed' },
            ].map((s) => (
              <div key={s.l} style={{ background: s.bg, color: s.fg, borderRadius: 14, padding: '14px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800 }}>{s.n}</div>
                <div style={{ fontSize: 11, lineHeight: 1.3 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2 style={{ margin: 0, fontSize: 16 }}>{tr('quickAi')}</h2>
          <form
            style={{ display: 'flex', gap: 8, marginTop: 12 }}
            onSubmit={(e) => {
              e.preventDefault()
              nav(`/legal?q=${encodeURIComponent(q || 'What is Article 21?')}`)
            }}
          >
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={tr('askAnything')}
              style={{ flex: 1, border: '1px solid #e5e7eb', borderRadius: 12, padding: '10px 12px', fontSize: 13 }}
            />
            <button type="submit" style={{ width: 40, height: 40, border: 0, borderRadius: '50%', background: '#2563eb', color: '#fff', cursor: 'pointer', fontWeight: 800 }}>
              →
            </button>
          </form>
          <div style={{ display: 'grid', gap: 8, marginTop: 10 }}>
            {['What is the notice period in my agreement?', 'Explain Article 14 in simple words', 'What documents do I still need?'].map((s) => (
              <button key={s} type="button" onClick={() => nav(`/legal?q=${encodeURIComponent(s)}`)} style={{ textAlign: 'left', border: 0, background: '#f8fafc', borderRadius: 10, padding: '9px 12px', fontSize: 13, cursor: 'pointer' }}>
                {s}
              </button>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2 style={{ margin: 0, fontSize: 16 }}>{tr('todayInsights')}</h2>
          <div style={{ display: 'grid', gap: 12, marginTop: 14 }}>
            <Link to="/rent-checker?demo=1" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{tr('insight1')}</div>
              <div style={{ color: '#6b7280', fontSize: 12 }}>{tr('insight1d')}</div>
            </Link>
            <Link to="/schemes" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{tr('insight2')}</div>
              <div style={{ color: '#6b7280', fontSize: 12 }}>{tr('insight2d')}</div>
            </Link>
            <Link to="/missing" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{tr('insight3')}</div>
              <div style={{ color: '#6b7280', fontSize: 12 }}>{tr('insight3d')}</div>
            </Link>
          </div>
        </section>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .panel + .panel {}
        }
        @media (max-width: 900px) {
          main .shell-content { }
        }
      `}</style>
    </div>
  )
}
