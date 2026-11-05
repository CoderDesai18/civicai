import { useRef, useState, type DragEvent, type ChangeEvent } from 'react'
import { useLang } from '../../context/LanguageContext'

const ALLOWED = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
const MAX = 10 * 1024 * 1024

export function UploadDropzone({
  onFile,
  disabled,
}: {
  onFile: (file: File) => void
  disabled?: boolean
}) {
  const { tr } = useLang()
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')
  const [over, setOver] = useState(false)

  function validate(file: File) {
    if (!ALLOWED.includes(file.type) && !/\.(pdf|jpe?g|png|webp)$/i.test(file.name)) {
      setError(tr('invalidFile'))
      return
    }
    if (file.size > MAX) {
      setError(tr('invalidFile'))
      return
    }
    setError('')
    onFile(file)
  }

  function onDrop(e: DragEvent) {
    e.preventDefault()
    setOver(false)
    const file = e.dataTransfer.files[0]
    if (file) validate(file)
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) validate(file)
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setOver(true)
        }}
        onDragLeave={() => setOver(false)}
        onDrop={onDrop}
        className={`flex min-h-44 flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-8 text-center ${
          over ? 'border-navy-700 bg-navy-50' : 'border-line bg-white'
        } ${disabled ? 'opacity-60' : ''}`}
      >
        <p className="font-medium text-ink-900">{tr('dropHere')}</p>
        <p className="mt-1 text-sm text-ink-500">{tr('uploadHint')}</p>
        <button
          type="button"
          disabled={disabled}
          className="mt-4 rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white"
          onClick={() => inputRef.current?.click()}
        >
          {tr('browse')}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/*"
          className="sr-only"
          onChange={onChange}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-bad-700" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
