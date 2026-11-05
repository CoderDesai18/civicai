export function Ico({ name, size = 18 }: { name: string; size?: number }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (name) {
    case 'home':
      return <svg {...p}><path d="M4 11 12 4l8 7v9H4z" /><path d="M10 20v-6h4v6" /></svg>
    case 'doc':
      return <svg {...p}><path d="M7 3h8l4 4v14H7z" /><path d="M15 3v5h5M9 13h6M9 17h4" /></svg>
    case 'house':
      return <svg {...p}><path d="M3 11 12 3l9 8v10H3z" /><path d="M9 21v-7h6v7" /></svg>
    case 'scale':
      return <svg {...p}><path d="M12 3v18M5 8h14" /><path d="M5 8c0 3 2 5 3.5 5S12 11 12 8M19 8c0 3-2 5-3.5 5S12 11 12 8" /></svg>
    case 'book':
      return <svg {...p}><path d="M4 5h7a3 3 0 0 1 3 3v13H7a3 3 0 0 0-3 3V5z" /><path d="M14 8h6v16h-6" /></svg>
    case 'bank':
      return <svg {...p}><path d="M3 10 12 4l9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 18h18" /></svg>
    case 'check':
      return <svg {...p}><path d="M5 12h14M5 6h14M5 18h9" /><path d="m15 16 2 2 4-4" /></svg>
    case 'folder':
      return <svg {...p}><path d="M3 7h6l2 2h10v11H3z" /></svg>
    case 'list':
      return <svg {...p}><path d="M9 6h12M9 12h12M9 18h12M4 6h.01M4 12h.01M4 18h.01" /></svg>
    case 'pen':
      return <svg {...p}><path d="M4 20h4L20 8l-4-4L4 16z" /></svg>
    case 'dict':
      return <svg {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
    case 'chat':
      return <svg {...p}><path d="M5 5h14v11H8l-3 3z" /></svg>
    case 'cmp':
      return <svg {...p}><rect x="3" y="4" width="7" height="16" rx="1" /><rect x="14" y="4" width="7" height="16" rx="1" /></svg>
    case 'gear':
      return <svg {...p}><circle cx="12" cy="12" r="3" /><path d="M12 3v2M12 19v2M4.9 6.5l1.5 1.5M17.6 16l1.5 1.5M3 12h2M19 12h2M4.9 17.5 6.4 16M17.6 8l1.5-1.5" /></svg>
    case 'out':
      return <svg {...p}><path d="M10 7V5a1 1 0 0 1 1-1h8v16h-8a1 1 0 0 1-1-1v-2M4 12h11M12 9l3 3-3 3" /></svg>
    case 'bell':
      return <svg {...p}><path d="M6 9a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9" /><path d="M10 20a2 2 0 0 0 4 0" /></svg>
    case 'menu':
      return <svg {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
    default:
      return <svg {...p}><circle cx="12" cy="12" r="8" /></svg>
  }
}
