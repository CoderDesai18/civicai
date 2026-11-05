import { Link } from 'react-router-dom'
import { useLang } from '../../context/LanguageContext'

export function Footer() {
  const { tr } = useLang()
  return (
    <footer className="mt-12 border-t border-line bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-ink-500 md:flex-row md:items-center md:justify-between">
        <p>{tr('footerNote')}</p>
        <div className="flex flex-wrap gap-4">
          <Link className="underline" to="/privacy">
            {tr('navPrivacy')}
          </Link>
          <Link className="underline" to="/how-it-works">
            {tr('navHow')}
          </Link>
          <a className="underline" href="https://www.indiacode.nic.in" target="_blank" rel="noreferrer">
            India Code
          </a>
          <a className="underline" href="https://www.myscheme.gov.in" target="_blank" rel="noreferrer">
            myScheme
          </a>
        </div>
      </div>
    </footer>
  )
}
