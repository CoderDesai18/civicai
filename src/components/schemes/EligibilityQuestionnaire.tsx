import { useLang } from '../../context/LanguageContext'
import type { EligibilityAnswers } from '../../types'

export function EligibilityQuestionnaire({
  value,
  onChange,
  onSubmit,
}: {
  value: EligibilityAnswers
  onChange: (next: EligibilityAnswers) => void
  onSubmit: () => void
}) {
  const { tr } = useLang()
  function set<K extends keyof EligibilityAnswers>(key: K, v: EligibilityAnswers[K]) {
    onChange({ ...value, [key]: v })
  }
  return (
    <form
      className="card grid gap-4 p-5 md:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <h2 className="md:col-span-2 text-xl font-semibold text-navy-900">{tr('questionnaire')}</h2>
      <p className="md:col-span-2 text-sm text-ink-500">{tr('neverEligible')}</p>
      <label className="grid gap-1 text-sm">
        {tr('state')}
        <select className="rounded-md border border-line px-3 py-2" value={value.state} onChange={(e) => set('state', e.target.value)}>
          <option value="MH">Maharashtra</option>
          <option value="OTHER">Other state / UT</option>
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        {tr('district')}
        <input className="rounded-md border border-line px-3 py-2" value={value.district} onChange={(e) => set('district', e.target.value)} />
      </label>
      <label className="grid gap-1 text-sm">
        {tr('ageGroup')}
        <select className="rounded-md border border-line px-3 py-2" value={value.ageGroup} onChange={(e) => set('ageGroup', e.target.value)}>
          <option value="under18">Under 18</option>
          <option value="18-25">18–25</option>
          <option value="26-40">26–40</option>
          <option value="40plus">40+</option>
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        {tr('userCat')}
        <select className="rounded-md border border-line px-3 py-2" value={value.categoryUser} onChange={(e) => set('categoryUser', e.target.value)}>
          <option value="student">{tr('student')}</option>
          <option value="worker">{tr('worker')}</option>
          <option value="farmer">{tr('farmer')}</option>
          <option value="other">{tr('other')}</option>
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        {tr('income')}
        <input
          type="number"
          min={0}
          className="rounded-md border border-line px-3 py-2"
          value={value.income ?? ''}
          onChange={(e) => set('income', e.target.value === '' ? null : Number(e.target.value))}
        />
      </label>
      <label className="grid gap-1 text-sm">
        {tr('gender')}
        <select className="rounded-md border border-line px-3 py-2" value={value.gender} onChange={(e) => set('gender', e.target.value)}>
          <option value="prefer_not">{tr('preferNot')}</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">{tr('other')}</option>
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        {tr('disability')}
        <select className="rounded-md border border-line px-3 py-2" value={value.disability} onChange={(e) => set('disability', e.target.value)}>
          <option value="prefer_not">{tr('preferNot')}</option>
          <option value="yes">{tr('yes')}</option>
          <option value="no">{tr('no')}</option>
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        {tr('social')}
        <select className="rounded-md border border-line px-3 py-2" value={value.socialCategory} onChange={(e) => set('socialCategory', e.target.value)}>
          <option value="prefer_not">{tr('preferNot')}</option>
          <option value="GEN">General / Open</option>
          <option value="EWS">EWS</option>
          <option value="OBC">OBC</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
          <option value="MINORITY">Notified minority</option>
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        {tr('education')}
        <select className="rounded-md border border-line px-3 py-2" value={value.education} onChange={(e) => set('education', e.target.value)}>
          <option value="upto10">Up to Class 10</option>
          <option value="11-12">Class 11–12</option>
          <option value="ug">Undergraduate</option>
          <option value="pg">Postgraduate</option>
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        {tr('employment')}
        <select className="rounded-md border border-line px-3 py-2" value={value.employment} onChange={(e) => set('employment', e.target.value)}>
          <option value="student">{tr('student')}</option>
          <option value="unemployed">Seeking work</option>
          <option value="employed">Employed</option>
          <option value="self">{tr('other')}</option>
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        {tr('domicile')}
        <select className="rounded-md border border-line px-3 py-2" value={value.domicileMh} onChange={(e) => set('domicileMh', e.target.value)}>
          <option value="yes">{tr('yes')}</option>
          <option value="no">{tr('no')}</option>
          <option value="unsure">{tr('unsure')}</option>
        </select>
      </label>
      <div className="md:col-span-2">
        <button type="submit" className="rounded-lg bg-navy-900 px-4 py-2 font-semibold text-white">
          {tr('applyAnswers')}
        </button>
      </div>
    </form>
  )
}
