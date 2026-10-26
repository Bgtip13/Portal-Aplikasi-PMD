import { useEffect, useMemo, useState } from 'react'
import AppCard from './components/AppCard'
import { CalendarIcon, LinkIcon, SearchIcon } from './components/icons'
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

export default function App() {
  const [now, setNow] = useState(() => new Date())
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category>('Semua')

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(id)
  }, [])

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

  const resetFilters = () => {
    setQuery('')
    setCategory('Semua')
  }

  return (
    <div className="page">
      <header className="header">
        <div className="shell header__inner">
          <div className="brand">
            <span className="brand__mark">
              <img src="/logo.png" alt="Logo CV Prima Mandiri Distribusi" />
            </span>
            <span className="brand__text">
              <strong>Portal Aplikasi PMD</strong>
              <small>CV Prima Mandiri Distribusi</small>
            </span>
          </div>

          <div className="header__meta">
            <span className="header__clock">
              {TIME_FORMAT.format(now)}
              <em>WIB</em>
            </span>
            <span className="status">
              <span className="status__dot" aria-hidden="true" />
              Sistem operasional
            </span>
          </div>
        </div>
      </header>

      <main className="shell">
        <section className="hero">
          <p className="hero__eyebrow">Pusat Sistem Internal</p>
          <h1 className="hero__title">Portal Aplikasi PMD</h1>
          <p className="hero__lead">
            {greeting}. Seluruh aplikasi perusahaan tersedia dalam satu portal — mulai dari sistem
            keuangan, operasional ekspedisi, hingga pelaporan. Pilih aplikasi di bawah untuk langsung
            membukanya.
          </p>

          <ul className="hero__facts">
            <li>
              <CalendarIcon size={15} />
              <span>{DATE_FORMAT.format(now)}</span>
            </li>
            <li>
              <LinkIcon size={15} />
              <span>
                {connected} dari {apps.length} aplikasi terhubung
              </span>
            </li>
          </ul>
        </section>

        <section className="apps" aria-labelledby="apps-title">
          <div className="apps__head">
            <div>
              <h2 id="apps-title">Daftar aplikasi</h2>
              <p className="apps__count">
                Menampilkan {filtered.length} dari {apps.length} aplikasi
              </p>
            </div>

            <label className="search">
              <span className="search__icon" aria-hidden="true">
                <SearchIcon size={15} />
              </span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari aplikasi"
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
                  &times;
                </button>
              )}
            </label>
          </div>

          <div className="filters" role="tablist" aria-label="Filter kategori">
            {categories.map((item) => {
              const isActive = category === item
              return (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`chip${isActive ? ' is-active' : ''}`}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              )
            })}
          </div>

          {filtered.length > 0 ? (
            <div className="grid">
              {filtered.map((app, index) => (
                <AppCard key={app.slug} app={app} index={index} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <span className="empty__icon" aria-hidden="true">
                <SearchIcon size={20} />
              </span>
              <p>Tidak ada aplikasi yang sesuai dengan pencarian atau filter tersebut.</p>
              <button type="button" onClick={resetFilters}>
                Atur ulang filter
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <div className="shell footer__inner">
          <p>&copy; {now.getFullYear()} CV Prima Mandiri Distribusi. Seluruh hak dilindungi.</p>
          <p className="footer__note">
            Akses internal — jaga kerahasiaan akun dan kata sandi Anda.
          </p>
        </div>
      </footer>
    </div>
  )
}
