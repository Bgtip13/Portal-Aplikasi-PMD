import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react'
import AppCard from './components/AppCard'
import LiveClock from './components/LiveClock'
import PawTrail from './components/PawTrail'
import { CalendarIcon, ClockIcon, LinkIcon, SearchIcon } from './components/icons'
import { apps, categories, type Category } from './data/apps'
import { prefersReducedMotion, useFlip, useNow, useScrolled } from './hooks'

const DATE_FORMAT = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Asia/Jakarta',
})

const HOUR_FORMAT = new Intl.DateTimeFormat('id-ID', {
  hour: 'numeric',
  hour12: false,
  timeZone: 'Asia/Jakarta',
})

function greetingFor(hour: number) {
  if (hour < 11) return 'Selamat pagi'
  if (hour < 15) return 'Selamat siang'
  if (hour < 19) return 'Selamat sore'
  return 'Selamat malam'
}

/** Waktu (ms) sampai animasi pembuka selesai; setelah itu kartu masuk lebih cepat. */
const INTRO_MS = 1900

export default function App() {
  const now = useNow(30_000)
  const scrolled = useScrolled(8)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category>('Semua')
  const [intro, setIntro] = useState(true)

  const searchRef = useRef<HTMLInputElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const trayRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const [pill, setPill] = useState({ x: 0, width: 0, ready: false })

  const hour = Number(HOUR_FORMAT.format(now)) % 24
  const greeting = greetingFor(hour)
  const connected = apps.filter((app) => app.href).length

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return apps.filter((app) => {
      const inCategory = category === 'Semua' || app.category === category
      if (!inCategory) return false
      if (!q) return true
      return `${app.name} ${app.short} ${app.description} ${app.tag} ${app.category}`
        .toLowerCase()
        .includes(q)
    })
  }, [query, category])

  useFlip(gridRef, filtered.map((app) => app.slug).join('|'))

  // Akhiri mode "intro" setelah animasi pembuka selesai.
  useEffect(() => {
    const id = window.setTimeout(() => setIntro(false), INTRO_MS)
    return () => window.clearTimeout(id)
  }, [])

  // Tekan "/" di mana saja untuk langsung mencari aplikasi.
  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return
      }
      event.preventDefault()
      searchRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Posisi indikator filter (pil yang bergeser mengikuti kategori aktif).
  const measurePill = useCallback(() => {
    const active = tabRefs.current[categories.indexOf(category)]
    if (!active) return
    setPill((prev) => ({ x: active.offsetLeft, width: active.offsetWidth, ready: prev.ready }))
  }, [category])

  useLayoutEffect(() => {
    measurePill()
  }, [measurePill])

  useEffect(() => {
    // Aktifkan transisi setelah posisi awal terpasang, supaya pil tidak "terbang" saat dibuka.
    const id = window.requestAnimationFrame(() => setPill((prev) => ({ ...prev, ready: true })))
    const tray = trayRef.current
    const observer = tray ? new ResizeObserver(measurePill) : null
    if (tray && observer) observer.observe(tray)
    document.fonts?.ready.then(measurePill)
    return () => {
      window.cancelAnimationFrame(id)
      observer?.disconnect()
    }
  }, [measurePill])

  // Pada layar sempit, jaga kategori aktif tetap terlihat di baris filter.
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    tabRefs.current[categories.indexOf(category)]?.scrollIntoView({
      inline: 'center',
      block: 'nearest',
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
  }, [category])

  const resetFilters = () => {
    setQuery('')
    setCategory('Semua')
  }

  const onSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setQuery('')
      event.currentTarget.blur()
    }
    if (event.key === 'Enter') {
      const first = filtered.find((app) => app.href)
      if (first?.href) window.open(first.href, '_blank', 'noopener,noreferrer')
    }
  }

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = categories.length - 1
    let next = index
    if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1
    else if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = last
    else return
    event.preventDefault()
    setCategory(categories[next])
    tabRefs.current[next]?.focus()
  }

  const rise = (delay: number) => ({ '--d': `${delay}ms` }) as CSSProperties
  const pillStyle = {
    width: pill.width,
    transform: `translateX(${pill.x}px)`,
  } as CSSProperties

  return (
    <div className="page">
      <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="shell header__inner">
          <a className="brand" href="/" aria-label="Portal Aplikasi Karyawan PMD — beranda">
            <span className="brand__mark">
              <img src="/logo.png" alt="" width={40} height={40} />
            </span>
            <span className="brand__text">
              <strong>Portal Aplikasi Karyawan PMD</strong>
              <small>CV Prima Mandiri Distribusi</small>
            </span>
          </a>

          <span className="status">
            <span className="status__dot" aria-hidden="true" />
            Sistem operasional
          </span>
        </div>
      </header>

      <main className="shell">
        <section className="hero" aria-labelledby="hero-title">
          <PawTrail />

          <div className="hero__copy">
            <h1 id="hero-title" className="hero__title rise" style={rise(180)}>
              Portal Aplikasi Karyawan PMD
            </h1>
            <p className="hero__lead rise" style={rise(280)}>
              <strong>{greeting}.</strong> Semua aplikasi kerja PMD ada di satu tempat, mulai dari
              sistem keuangan, aplikasi mobile, sampai laporan ekspedisi. Pilih aplikasi di bawah untuk
              membukanya.
            </p>

            <ul className="hero__facts rise" style={rise(380)}>
              <li>
                <CalendarIcon size={15} />
                <span>{DATE_FORMAT.format(now)}</span>
              </li>
              <li>
                <ClockIcon size={15} />
                <LiveClock />
              </li>
              <li>
                <LinkIcon size={15} />
                <span>
                  {connected} dari {apps.length} aplikasi terhubung
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section className="apps" aria-labelledby="apps-title">
          <div className="apps__head rise" style={rise(560)}>
            <div>
              <h2 id="apps-title">Daftar aplikasi</h2>
              <p className="apps__count" aria-live="polite">
                {query.trim() && filtered.some((app) => app.href)
                  ? `Tekan Enter untuk membuka ${filtered.find((app) => app.href)?.name}`
                  : `Menampilkan ${filtered.length} dari ${apps.length} aplikasi`}
              </p>
            </div>

            <label className="search">
              <span className="search__icon" aria-hidden="true">
                <SearchIcon size={17} />
              </span>
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onSearchKeyDown}
                placeholder="Cari aplikasi"
                aria-label="Cari aplikasi"
                spellCheck={false}
                autoComplete="off"
              />
              {query ? (
                <button
                  type="button"
                  className="search__clear"
                  onClick={() => {
                    setQuery('')
                    searchRef.current?.focus()
                  }}
                  aria-label="Hapus pencarian"
                >
                  &times;
                </button>
              ) : (
                <kbd className="search__key" aria-hidden="true">
                  /
                </kbd>
              )}
            </label>
          </div>

          <div className="filters rise" style={rise(620)}>
            <div
              ref={trayRef}
              className="filters__tray"
              role="tablist"
              aria-label="Filter kategori"
            >
              <span
                className={`filters__pill${pill.ready ? ' is-ready' : ''}`}
                style={pillStyle}
                aria-hidden="true"
              />
              {categories.map((item, index) => {
                const isActive = category === item
                return (
                  <button
                    key={item}
                    ref={(node) => {
                      tabRefs.current[index] = node
                    }}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="app-grid"
                    tabIndex={isActive ? 0 : -1}
                    className={`chip${isActive ? ' is-active' : ''}`}
                    onClick={() => setCategory(item)}
                    onKeyDown={(event) => onTabKeyDown(event, index)}
                  >
                    {item}
                  </button>
                )
              })}
            </div>
          </div>

          <div id="app-grid" role="tabpanel" ref={gridRef}>
            {filtered.length > 0 ? (
              <div className="grid">
                {filtered.map((app, index) => (
                  <AppCard key={app.slug} app={app} index={index} intro={intro} />
                ))}
              </div>
            ) : (
              <div className="empty">
                <span className="empty__icon" aria-hidden="true">
                  <SearchIcon size={20} />
                </span>
                <p>Tidak ada aplikasi yang cocok dengan pencarian atau filter ini.</p>
                <button type="button" onClick={resetFilters}>
                  Tampilkan semua aplikasi
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="shell footer__inner">
          <p>&copy; {now.getFullYear()} CV Prima Mandiri Distribusi. Seluruh hak dilindungi.</p>
          <p className="footer__note">Akses internal. Jaga kerahasiaan akun dan kata sandi Anda.</p>
        </div>
      </footer>
    </div>
  )
}
