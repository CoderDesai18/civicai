import { useState } from 'react'
import { Disclaimer } from '../components/ui/Disclaimer'
import { useApp } from '../context/AppContext'
import { useLang } from '../context/LanguageContext'
import { TEMPLATES, fillTemplate } from '../data/templates'
import { loc } from '../services/api'

export function DocumentGenerator() {
  const { lang, tr } = useLang()
  const { addDraft, addHistory } = useApp()
  const [tid, setTid] = useState(TEMPLATES[0].id)
  const template = TEMPLATES.find((t) => t.id === tid) ?? TEMPLATES[0]
  const [values, setValues] = useState<Record<string, string>>({})
  const [output, setOutput] = useState('')

  function generate() {
    const body = fillTemplate(template.id, values)
    setOutput(body)
    const id = `draft-${Date.now()}`
    addDraft({ id, templateId: template.id, title: loc(template.name, lang), body, createdAt: new Date().toISOString() })
    addHistory({
      id,
      name: loc(template.name, lang),
      kind: 'generated',
      typeLabel: 'Draft',
      date: new Date().toISOString().slice(0, 10),
      status: 'Draft only',
      href: '/generate',
    })
  }

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-semibold text-navy-900">{tr('prepareDoc')}</h1>
      <Disclaimer />
      <p className="rounded-md bg-saffron-100/70 px-3 py-2 text-sm">{tr('draftNotice')}</p>
      <label className="grid max-w-md gap-1 text-sm">
        Template
        <select
          className="rounded-md border border-line px-3 py-2"
          value={tid}
          onChange={(e) => {
            setTid(e.target.value)
            setValues({})
            setOutput('')
          }}
        >
          {TEMPLATES.map((t) => (
            <option key={t.id} value={t.id}>
              {loc(t.name, lang)}
            </option>
          ))}
        </select>
      </label>
      <p className="text-sm text-ink-600">{loc(template.description, lang)}</p>
      <form
        className="grid gap-3 md:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault()
          generate()
        }}
      >
        {template.fields.map((f) => (
          <label key={f.id} className="grid gap-1 text-sm">
            {loc(f.label, lang)}
            <input
              className="rounded-md border border-line px-3 py-2"
              placeholder={f.placeholder}
              value={values[f.id] ?? ''}
              onChange={(e) => setValues((v) => ({ ...v, [f.id]: e.target.value }))}
            />
          </label>
        ))}
        <div className="md:col-span-2">
          <button type="submit" className="rounded-md bg-navy-900 px-4 py-2 font-semibold text-white">
            {tr('generate')}
          </button>
        </div>
      </form>
      {output && (
        <pre className="card overflow-auto whitespace-pre-wrap p-5 text-sm leading-relaxed">{output}</pre>
      )}
    </div>
  )
}
