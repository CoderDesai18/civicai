import { useLang } from '../context/LanguageContext'
import { useApp } from '../context/AppContext'
import type { Lang, UserProfile } from '../types'

export function Profile() {
  const { tr, setLang } = useLang()
  const { profile, setProfile } = useApp()

  function set<K extends keyof UserProfile>(k: K, v: UserProfile[K]) {
    setProfile({ ...profile, [k]: v })
  }

  return (
    <div className="grid max-w-xl gap-6">
      <h1 className="text-3xl font-semibold text-navy-900">{tr('profile')}</h1>
      <p className="text-sm text-ink-600">{tr('purposeLimit')}</p>
      <form
        className="card grid gap-3 p-5"
        onSubmit={(e) => {
          e.preventDefault()
          setLang(profile.language)
        }}
      >
        <label className="grid gap-1 text-sm">
          Name
          <input className="rounded-md border border-line px-3 py-2" value={profile.name} onChange={(e) => set('name', e.target.value)} />
        </label>
        <label className="grid gap-1 text-sm">
          {tr('state')}
          <select className="rounded-md border border-line px-3 py-2" value={profile.state} onChange={(e) => set('state', e.target.value)}>
            <option value="MH">Maharashtra</option>
            <option value="OTHER">Other</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          {tr('language')}
          <select
            className="rounded-md border border-line px-3 py-2"
            value={profile.language}
            onChange={(e) => set('language', e.target.value as Lang)}
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="mr">मराठी</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          {tr('userCat')}
          <input className="rounded-md border border-line px-3 py-2" value={profile.occupation} onChange={(e) => set('occupation', e.target.value)} />
        </label>
        <label className="grid gap-1 text-sm">
          {tr('ageGroup')}
          <input className="rounded-md border border-line px-3 py-2" value={profile.ageGroup} onChange={(e) => set('ageGroup', e.target.value)} />
        </label>
        <button type="submit" className="rounded-md bg-navy-900 px-4 py-2 font-semibold text-white">
          {tr('saveProfile')}
        </button>
      </form>
    </div>
  )
}
