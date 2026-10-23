import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import AppCard from './components/AppCard'
import { CalendarIcon, LinkIcon, SearchIcon, SparkIcon } from './components/icons'
import { apps, categories, type Category } from './data/apps'

const DATE_FORMAT = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Asia/Jakarta',
})

const TIME_FORMAT = new Intl.DateTimeFormat('id-ID', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
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

const PARTICLE_COLORS = ['#a78bfa', '#45d0ff', '#ffb340', '#ff7ab6', '#2ee6a8', '#8b95ff']

export default function App() {
  const [now, setNow] = useState(() => new Date())
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category>('Semua')
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const el = glowRef.current
    if (!el) return
    let frame = 0
    let x = window.innerWidth / 2
    let y = window.innerHeight / 3

    const render = () => {
      frame = 0
      el.style.transform = `translate3d(${x - 260}px, ${y - 260}px, 0)`
    }

    const handleMove = (event: PointerEvent) => {
      x = event.clientX
      y = event.clientY
      if (!frame) frame = window.requestAnimationFrame(render)
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    render()
    return () => {
      window.removeEventListener('pointermove', handleMove)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const particles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: (i * 37 + 11) % 100,
        size: 2 + ((i * 13) % 4),
        delay: (i * 1.9) % 20,
        duration: 16 + ((i * 7) % 14),
        color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
      })),
    [],
  )

  const hour = Number(HOUR_FORMAT.format(now))
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

  return (
    <div className="page">
      <div className="bg" aria-hidden="true">
        <span className="bg__blob bg__blob--1" />
        <span className="bg__blob bg__blob--2" />
        <span className="bg__blob bg__blob--3" />
        <span className="bg__blob bg__blob--4" />
        <span className="bg__halo" />
        <span className="bg__grid" />
        <span className="bg__vignette" />
        <span className="bg__grain" />
        <div className="bg__particles">
          {particles.map((p) => (
            <span
              key={p.id}
              style={
                {
                  left: `${p.left}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  background: p.color,
                  boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
                  animationDelay: `-${p.delay}s`,
                  animationDuration: `${p.duration}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      </div>

      <div className="cursor-glow" ref={glowRef} aria-hidden="true" />

      <div className="shell">
        <header className="topbar">
          <div className="brand">
            <span className="brand__mark" aria-hidden="true">
              <img src="/logo.png" alt="Logo PMD" className="brand__logo-img" />
            </span>
            <span className="brand__text">
              <strong>Portal Aplikasi PMD</strong>
              <small>CV Prima Mandiri Distribusi</small>
            </span>
          </div>

          <div className="topbar__right">
            <span className="live">
              <span className="live__dot" />
              Sistem aktif
            </span>
            <span className="timepill">
              {TIME_FORMAT.format(now)}
              <em>WIB</em>
            </span>
          </div>
        </header>

        <main>
          <section className="hero">
            <p className="eyebrow">
              <span className="eyebrow__spark" aria-hidden="true">
                <SparkIcon />
              </span>
              Pusat Sistem · CV Prima Mandiri Distribusi
            </p>

            <h1 className="hero__title">
              <span className="hero__greeting">{greeting},</span>
              <span className="hero__main">
                Selamat datang di <span className="grad">Portal Aplikasi PMD</span>
              </span>
            </h1>

            <p className="hero__lead">
              Anda berhasil masuk ke pusat sistem milik CV Prima Mandiri Distribusi. Semua aplikasi
              perusahaan kini dalam satu pintu — pilih kartu di bawah untuk langsung membuka
              aplikasinya.
            </p>

            <div className="hero__meta">
              <span className="meta-pill">
                <span className="meta-pill__icon" aria-hidden="true">
                  <CalendarIcon />
                </span>
                {DATE_FORMAT.format(now)}
              </span>
              <span className="meta-pill">
                <span className="meta-pill__icon" aria-hidden="true">
                  <LinkIcon />
                </span>
                {connected} dari {apps.length} aplikasi terhubung
              </span>
            </div>
          </section>

          <section className="launcher" aria-labelledby="launcher-title">
            <div className="launcher__head">
              <div className="launcher__heading">
                <h2 id="launcher-title">Aplikasi</h2>
                <span className="launcher__count">{filtered.length} tampil</span>
              </div>

              <label className="search">
                <span className="search__icon" aria-hidden="true">
                  <SearchIcon />
                </span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Cari aplikasi…"
                  aria-label="Cari aplikasi"
                  spellCheck={false}
                />
                {query && (
                  <button
                    type="button"
                    className="search__clear"
                    onClick={() => setQuery('')}
                    aria-label="Hapus pencarian"
                  >
                    ×
                  </button>
                )}
              </label>
            </div>

            <div className="chips" role="tablist" aria-label="Filter kategori">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={category === item}
                  className={`chip${category === item ? ' is-active' : ''}`}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="grid">
              {filtered.map((app, index) => (
                <AppCard key={app.slug} app={app} index={index} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="empty">
                <span className="empty__icon" aria-hidden="true">
                  <SearchIcon size={24} />
                </span>
                <p>Tidak ada aplikasi yang cocok dengan pencarian itu.</p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    setCategory('Semua')
                  }}
                >
                  Reset filter
                </button>
              </div>
            )}
          </section>
        </main>

        <footer className="footer">
          <p>
            © {now.getFullYear()} <strong>CV Prima Mandiri Distribusi</strong> · Portal Aplikasi PMD
          </p>
          <p className="footer__note">
            Pusat akses internal. Jaga kerahasiaan akun dan kata sandi Anda.
          </p>
        </footer>
      </div>
    </div>
  )
}
