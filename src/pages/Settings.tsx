import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LanguageContext'
import { useSettings, type TextSize, type ThemePref } from '../context/SettingsContext'
import { LANG_LABEL } from '../data/translations'
import { authApi } from '../services/auth'
import type { Lang } from '../types'

function Toggle({
  checked,
  onChange,
  disabled,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  disabled?: boolean
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      className={`switch ${checked ? 'on' : ''} ${disabled ? 'off' : ''}`}
      onClick={() => onChange(!checked)}
    />
  )
}

export function Settings() {
  const { settings, patch, reset } = useSettings()
  const { lang, setLang } = useLang()
  const { user, signOut, refresh } = useAuth()
  const nav = useNavigate()
  const [confirmReset, setConfirmReset] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [msg, setMsg] = useState('')
  const [currentPw, setCurrentPw] = useState('')
  const [nextPw, setNextPw] = useState('')
  const [sessions, setSessions] = useState<{ id: string; current: boolean; lastSeen: string; ua: string; ip: string }[]>([])
  const [activity, setActivity] = useState<{ at: string; event: string; detail: string }[]>([])
  const [twoSecret, setTwoSecret] = useState('')
  const [twoCode, setTwoCode] = useState('')
  const [recovery, setRecovery] = useState<string[]>([])
  const [disablePw, setDisablePw] = useState('')
  const [disableCode, setDisableCode] = useState('')
  const [delPw, setDelPw] = useState('')

  useEffect(() => {
    void authApi.sessions().then((r) => setSessions(r.sessions)).catch(() => undefined)
    void authApi.activity().then((r) => setActivity(r.activity)).catch(() => undefined)
  }, [])

  function beep() {
    if (!settings.notifications || !settings.notificationSound) return
    const ctx = new AudioContext()
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.connect(g)
    g.connect(ctx.destination)
    o.frequency.value = 880
    g.gain.value = 0.04
    o.start()
    o.stop(ctx.currentTime + 0.12)
  }

  function buzz() {
    if (!settings.notifications || !settings.vibration) return
    navigator.vibrate?.(40)
  }

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <p className="muted">Preferences stay on this device. Passwords are hashed on the server and never shown.</p>
      {msg && <p className="auth-mailbox">{msg}</p>}

      <nav className="settings-jump" aria-label="Settings sections">
        {['Appearance', 'Notifications', 'Accessibility', 'Language', 'Security', 'Preferences', 'About'].map((s) => (
          <a key={s} href={`#${s.toLowerCase()}`}>
            {s}
          </a>
        ))}
      </nav>

      <section id="appearance" className="panel">
        <h2>Appearance</h2>
        <label className="set-row">
          <span>
            <strong>Theme</strong>
            <em>Applies instantly across CivicAI.</em>
          </span>
          <select value={settings.theme} onChange={(e) => patch({ theme: e.target.value as ThemePref })} aria-label="Theme">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System default</option>
          </select>
        </label>
        <label className="set-row">
          <span>
            <strong>Text size</strong>
            <em>Scales labels, forms and body text.</em>
          </span>
          <select value={settings.textSize} onChange={(e) => patch({ textSize: e.target.value as TextSize })} aria-label="Text size">
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
            <option value="xl">Extra large</option>
          </select>
        </label>
      </section>

      <section id="notifications" className="panel">
        <h2>Notifications</h2>
        <div className="set-row">
          <span>
            <strong>Enable notifications</strong>
            <em>Prototype alerts only — no push service.</em>
          </span>
          <Toggle checked={settings.notifications} onChange={(v) => patch({ notifications: v })} label="Enable notifications" />
        </div>
        <div className="set-row">
          <span>
            <strong>Notification sound</strong>
            <em>Play a short tone for in-app tests.</em>
          </span>
          <Toggle
            checked={settings.notificationSound}
            disabled={!settings.notifications}
            onChange={(v) => {
              patch({ notificationSound: v })
              if (v) beep()
            }}
            label="Notification sound"
          />
        </div>
        <div className="set-row">
          <span>
            <strong>Vibration</strong>
            <em>Uses the device vibrator when available.</em>
          </span>
          <Toggle
            checked={settings.vibration}
            disabled={!settings.notifications}
            onChange={(v) => {
              patch({ vibration: v })
              if (v) buzz()
            }}
            label="Vibration"
          />
        </div>
      </section>

      <section id="accessibility" className="panel">
        <h2>Accessibility</h2>
        <div className="set-row">
          <span>
            <strong>High contrast</strong>
            <em>Stronger borders and text contrast.</em>
          </span>
          <Toggle checked={settings.highContrast} onChange={(v) => patch({ highContrast: v })} label="High contrast mode" />
        </div>
        <div className="set-row">
          <span>
            <strong>Reduce motion</strong>
            <em>Turns off decorative transitions.</em>
          </span>
          <Toggle checked={settings.reduceMotion} onChange={(v) => patch({ reduceMotion: v })} label="Reduce motion" />
        </div>
        <div className="set-row">
          <span>
            <strong>Screen-reader friendly UI</strong>
            <em>Keeps labels on buttons, forms and switches.</em>
          </span>
          <Toggle checked={settings.screenReader} onChange={(v) => patch({ screenReader: v })} label="Screen reader friendly UI" />
        </div>
      </section>

      <section id="language" className="panel">
        <h2>Language</h2>
        <label className="set-row">
          <span>
            <strong>Interface language</strong>
            <em>English is the default. Hindi and Marathi are available.</em>
          </span>
          <select value={lang} onChange={(e) => setLang(e.target.value as Lang)} aria-label="Language">
            <option value="en">{LANG_LABEL.en}</option>
            <option value="hi">{LANG_LABEL.hi}</option>
            <option value="mr">{LANG_LABEL.mr}</option>
          </select>
        </label>
      </section>

      <section id="security" className="panel">
        <h2>Security & privacy</h2>
        <p className="muted">Signed in as {user?.email}. Last login: {user?.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : '—'}</p>
        <form
          className="stack"
          onSubmit={async (e) => {
            e.preventDefault()
            try {
              const r = await authApi.changePassword(currentPw, nextPw)
              setMsg(r.error || 'Password updated.')
              setCurrentPw('')
              setNextPw('')
            } catch (err) {
              setMsg(err instanceof Error ? err.message : 'Could not update password.')
            }
          }}
        >
          <strong>Change password</strong>
          <input type="password" placeholder="Current password" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} autoComplete="current-password" />
          <input type="password" placeholder="New password" value={nextPw} onChange={(e) => setNextPw(e.target.value)} autoComplete="new-password" />
          <button type="submit" className="auth-btn">
            Update password
          </button>
        </form>

        <div className="stack" style={{ marginTop: 18 }}>
          <strong>Two-factor authentication</strong>
          <p className="muted">{user?.twoFactorEnabled ? 'Enabled on this account.' : 'Optional extra step after password.'}</p>
          {!user?.twoFactorEnabled && !twoSecret && (
            <button
              type="button"
              className="auth-btn"
              onClick={async () => {
                const r = await authApi.begin2fa()
                setTwoSecret(r.secret)
              }}
            >
              Enable 2FA
            </button>
          )}
          {twoSecret && (
            <form
              className="stack"
              onSubmit={async (e) => {
                e.preventDefault()
                try {
                  const r = await authApi.confirm2fa(twoSecret, twoCode)
                  if (r.recovery) setRecovery(r.recovery)
                  setTwoSecret('')
                  setTwoCode('')
                  await refresh()
                  setMsg('Two-factor authentication is on. Save recovery codes now — they will not be shown again.')
                } catch (err) {
                  setMsg(err instanceof Error ? err.message : 'Could not enable 2FA.')
                }
              }}
            >
              <p className="auth-mailbox">Authenticator secret (shown once): {twoSecret}</p>
              <input placeholder="Enter current 6-digit code" value={twoCode} onChange={(e) => setTwoCode(e.target.value)} />
              <button className="auth-btn" type="submit">
                Confirm and enable
              </button>
            </form>
          )}
          {recovery.length > 0 && (
            <div className="auth-mailbox">
              Recovery codes: {recovery.join(' · ')}
            </div>
          )}
          {user?.twoFactorEnabled && (
            <form
              className="stack"
              onSubmit={async (e) => {
                e.preventDefault()
                if (!window.confirm('Disable two-factor authentication?')) return
                try {
                  await authApi.disable2fa(disablePw, disableCode)
                  setDisablePw('')
                  setDisableCode('')
                  await refresh()
                  setMsg('Two-factor authentication is off.')
                } catch (err) {
                  setMsg(err instanceof Error ? err.message : 'Could not disable 2FA.')
                }
              }}
            >
              <input type="password" placeholder="Password" value={disablePw} onChange={(e) => setDisablePw(e.target.value)} />
              <input placeholder="Authenticator or recovery code" value={disableCode} onChange={(e) => setDisableCode(e.target.value)} />
              <button type="submit" className="auth-btn ghost">
                Disable 2FA
              </button>
            </form>
          )}
        </div>

        <div style={{ marginTop: 18 }}>
          <strong>Active sessions</strong>
          <ul className="plain">
            {sessions.map((s) => (
              <li key={s.id}>
                {s.current ? 'This device' : 'Other session'} · {s.ip || 'local'} · last seen {new Date(s.lastSeen).toLocaleString()}
                <div className="muted">{s.ua}</div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="auth-btn ghost"
            onClick={async () => {
              await authApi.logoutAll()
              nav('/login', { replace: true })
            }}
          >
            Log out from all devices
          </button>
        </div>

        <div style={{ marginTop: 18 }}>
          <strong>Login activity</strong>
          <ul className="plain">
            {activity.slice(0, 8).map((a) => (
              <li key={a.at + a.event}>
                {new Date(a.at).toLocaleString()} — {a.detail}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: 18 }}>
          <strong>Privacy</strong>
          <p className="muted">Document analysis stays in this browser session. Preferences are stored locally.</p>
          <button
            type="button"
            className="auth-btn ghost"
            onClick={() => {
              localStorage.removeItem('civicai-settings')
              setMsg('Local application data cleared. Reload to apply defaults.')
            }}
          >
            Clear locally stored application data
          </button>
        </div>

        <div style={{ marginTop: 18 }}>
          <strong>Delete account</strong>
          {!confirmDelete ? (
            <button type="button" className="auth-btn ghost" onClick={() => setConfirmDelete(true)}>
              Delete account…
            </button>
          ) : (
            <form
              className="stack"
              onSubmit={async (e) => {
                e.preventDefault()
                try {
                  await authApi.deleteAccount(delPw)
                  nav('/login', { replace: true })
                } catch (err) {
                  setMsg(err instanceof Error ? err.message : 'Could not delete account.')
                }
              }}
            >
              <p>This permanently removes the account. Type your password to confirm.</p>
              <input type="password" value={delPw} onChange={(e) => setDelPw(e.target.value)} placeholder="Password" />
              <div className="row-btns">
                <button type="button" onClick={() => setConfirmDelete(false)}>
                  Cancel
                </button>
                <button type="submit" className="danger">
                  Delete account
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <section id="preferences" className="panel">
        <h2>Application preferences</h2>
        <div className="set-row">
          <span>
            <strong>Auto-save preferences</strong>
            <em>Saves settings as you change them.</em>
          </span>
          <Toggle checked={settings.autoSave} onChange={(v) => patch({ autoSave: v })} label="Auto-save preferences" />
        </div>
        <div className="set-row">
          <span>
            <strong>Remember login</strong>
            <em>Used as the default on the sign-in screen.</em>
          </span>
          <Toggle checked={settings.rememberLogin} onChange={(v) => patch({ rememberLogin: v })} label="Remember login" />
        </div>
        <label className="set-row">
          <span>
            <strong>Default start screen</strong>
            <em>Opened after a successful sign-in.</em>
          </span>
          <select value={settings.startPage} onChange={(e) => patch({ startPage: e.target.value })} aria-label="Default start screen">
            <option value="/">Dashboard</option>
            <option value="/analyze">Analyze document</option>
            <option value="/legal">Ask Indian Law</option>
            <option value="/schemes">Government schemes</option>
            <option value="/settings">Settings</option>
          </select>
        </label>
        {!confirmReset ? (
          <button type="button" className="auth-btn ghost" onClick={() => setConfirmReset(true)}>
            Reset all settings
          </button>
        ) : (
          <div className="confirm">
            <p>Are you sure you want to reset all settings to their default values?</p>
            <div className="row-btns">
              <button type="button" onClick={() => setConfirmReset(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="danger"
                onClick={() => {
                  reset()
                  setConfirmReset(false)
                  setMsg('Settings restored to defaults. Your account and documents were not changed.')
                }}
              >
                Reset settings
              </button>
            </div>
          </div>
        )}
      </section>

      <section id="about" className="panel">
        <h2>About</h2>
        <p>
          <strong>CivicAI</strong> · version 1.0.0 (SIH 2026 prototype)
        </p>
        <p className="muted">Informational assistance only. Not legal advice. Verify on official portals.</p>
        <p>
          <a href="/privacy">Privacy Policy</a> · <a href="/how-it-works">Terms & how CivicAI works</a>
        </p>
        <button type="button" className="auth-btn ghost" onClick={() => void signOut().then(() => nav('/login', { replace: true }))}>
          Sign out
        </button>
      </section>
    </div>
  )
}
