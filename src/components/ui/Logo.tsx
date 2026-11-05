export function Logo({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  const ink = light ? '#F4F7FA' : '#0B1F3A'
  const paper = light ? '#0B1F3A' : '#F4F7FA'
  return (
    <span className="inline-flex items-center gap-2">
      <svg width="36" height="36" viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="12" fill={light ? '#123056' : '#0B1F3A'} />
        <path d="M16 38 V22 h10 l4 5 h18 v11" fill="none" stroke={paper} strokeWidth="2.2" />
        <path d="M16 38 h32 v10 a3 3 0 0 1-3 3 H19 a3 3 0 0 1-3-3z" fill={paper} />
        <path d="M22 28 h8 M22 33 h14" stroke={ink} strokeWidth="1.6" strokeLinecap="round" opacity="0.0" />
        <path d="M22 28h8M22 33h12" stroke={paper} strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="46" cy="46" r="11" fill="#0F6B4C" />
        <path d="M41 46.2l3.2 3.2 7-7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {!compact && (
        <span className={`font-semibold tracking-tight ${light ? 'text-white' : 'text-navy-900'}`}>
          CivicAI
        </span>
      )}
    </span>
  )
}
