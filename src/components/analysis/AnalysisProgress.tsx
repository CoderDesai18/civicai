import { useLang } from '../../context/LanguageContext'
import type { TKey } from '../../data/translations'

const STEPS: TKey[] = ['stepFile', 'stepImage', 'stepOcr', 'stepClass', 'stepExtract', 'stepAi', 'stepInsights']

export function AnalysisProgress({ step }: { step: number }) {
  const { tr } = useLang()
  return (
    <div>
      <p className="mb-4 font-medium text-navy-900">{tr('readingDoc')}</p>
      <ol className="card grid gap-3 p-5">
        {STEPS.map((key, i) => {
          const done = i < step
          const current = i === step
          return (
            <li key={key} className="flex items-center gap-3">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                  done ? 'bg-india-600 text-white' : current ? 'bg-navy-900 text-white' : 'bg-navy-50 text-ink-500'
                }`}
                aria-current={current ? 'step' : undefined}
              >
                {done ? '✓' : i + 1}
              </span>
              <span className={current ? 'font-semibold text-navy-900' : 'text-ink-700'}>{tr(key)}</span>
              {current && <span className="ml-auto h-2 w-2 animate-pulse rounded-full bg-saffron-500" aria-hidden />}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
