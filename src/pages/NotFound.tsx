import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

export function NotFound() {
  const { tr } = useLang()
  return (
    <div className="card p-8 text-center">
      <h1 className="text-2xl font-semibold">{tr('notFound')}</h1>
      <Link className="mt-4 inline-block text-navy-700 underline" to="/">
        {tr('goHome')}
      </Link>
    </div>
  )
}
