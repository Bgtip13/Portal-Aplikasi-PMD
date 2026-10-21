type IconProps = {
  size?: number
  strokeWidth?: number
}

const base = (size: number, strokeWidth: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
})

/** Ikon fallback untuk tiap aplikasi — dipakai sebelum logo asli diunggah. */
export function AppGlyph({ slug, size = 28 }: { slug: string; size?: number }) {
  const props = base(size, 1.7)

  switch (slug) {
    case 'accurate':
      return (
        <svg {...props}>
          <path d="M4 20h16" />
          <rect x="5.5" y="11" width="3.6" height="6.5" rx="1.2" />
          <rect x="10.2" y="7" width="3.6" height="10.5" rx="1.2" />
          <rect x="14.9" y="13" width="3.6" height="4.5" rx="1.2" />
        </svg>
      )
    case 'pmd-apk':
      return (
        <svg {...props}>
          <rect x="6.5" y="2.5" width="11" height="19" rx="3" />
          <path d="M10.5 5.5h3" />
          <path d="M10.4 18.4h3.2" />
        </svg>
      )
    case 'pmd-web':
      return (
        <svg {...props}>
          <rect x="3.5" y="3.5" width="7.4" height="7.4" rx="2.2" />
          <rect x="13.1" y="3.5" width="7.4" height="7.4" rx="2.2" />
          <rect x="3.5" y="13.1" width="7.4" height="7.4" rx="2.2" />
          <rect x="13.1" y="13.1" width="7.4" height="7.4" rx="2.2" />
        </svg>
      )
    case 'laporan-ekspedisi':
      return (
        <svg {...props}>
          <path d="M2.8 7.2h10.6v9.6H2.8z" />
          <path d="M13.4 10.4h3.7l3 3v3.4h-6.7z" />
          <circle cx="7" cy="18.4" r="1.8" />
          <circle cx="17" cy="18.4" r="1.8" />
        </svg>
      )
    case 'website-pmd':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8.6" />
          <path d="M3.6 12h16.8" />
          <path d="M12 3.4c3.9 4.4 3.9 12.8 0 17.2" />
          <path d="M12 3.4c-3.9 4.4-3.9 12.8 0 17.2" />
        </svg>
      )
    case 'dashboard-spv':
      return (
        <svg {...props}>
          <path d="M3.6 19.4h16.8" />
          <path d="M4.6 15.2l4.2-5.1 3.4 3 3.8-5.7 3.3 3.2" />
          <circle cx="8.8" cy="10.1" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="12.2" cy="13.1" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="19.3" cy="10.6" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      )
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 8.2v4.3l2.8 1.9" />
        </svg>
      )
  }
}

export function CalendarIcon({ size = 14, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)}>
      <rect x="3.5" y="5.2" width="17" height="15.3" rx="3" />
      <path d="M8 3.2v3.6M16 3.2v3.6M3.5 10.2h17" />
    </svg>
  )
}

export function LinkIcon({ size = 14, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)}>
      <path d="M10.2 13.8a3.6 3.6 0 0 0 5.1 0l2.6-2.6a3.6 3.6 0 0 0-5.1-5.1l-1.4 1.4" />
      <path d="M13.8 10.2a3.6 3.6 0 0 0-5.1 0l-2.6 2.6a3.6 3.6 0 0 0 5.1 5.1l1.4-1.4" />
    </svg>
  )
}

export function SearchIcon({ size = 16, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)}>
      <circle cx="10.8" cy="10.8" r="6.6" />
      <path d="M15.6 15.6l4 4" />
    </svg>
  )
}

export function SparkIcon({ size = 13, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)}>
      <path d="M12 3.2l1.9 5.1 5.1 1.9-5.1 1.9-1.9 5.1-1.9-5.1L5 10.2l5.1-1.9z" />
    </svg>
  )
}
