import type { CSSProperties, PointerEvent } from 'react'
import type { PmdApp } from '../data/apps'
import AppIcon from './AppIcon'

type Props = {
  app: PmdApp
  index: number
}

export default function AppCard({ app, index }: Props) {
  const isLocked = !app.href

  const style = {
    '--accent': app.accent,
    '--accent-soft': app.accentSoft,
    '--enter-delay': `${index * 70}ms`,
  } as CSSProperties

  const handleMove = (event: PointerEvent<HTMLElement>) => {
    const el = event.currentTarget
    const rect = el.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
    el.style.setProperty('--ry', `${(x - 0.5) * 9}deg`)
    el.style.setProperty('--rx', `${(0.5 - y) * 9}deg`)
  }

  const handleLeave = (event: PointerEvent<HTMLElement>) => {
    const el = event.currentTarget
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  const content = (
    <>
      <span className="app-card__spot" aria-hidden="true" />
      <span className="app-card__sheen" aria-hidden="true" />

      <div className="app-card__top">
        <span className="app-icon">
          <AppIcon app={app} />
        </span>
        <span className="app-card__action" aria-hidden="true">
          {isLocked ? '⏳' : '↗'}
        </span>
      </div>

      <div className="app-card__text">
        <span className="app-card__tag">{app.tag}</span>
        <h3 className="app-card__title">{app.name}</h3>
        <p className="app-card__desc">{app.description}</p>
      </div>

      <div className="app-card__foot">
        <span className="app-card__cta">{isLocked ? 'Segera hadir' : 'Buka aplikasi'}</span>
        <span className="app-card__arrow" aria-hidden="true">
          →
        </span>
      </div>
    </>
  )

  if (isLocked) {
    return (
      <div
        className="app-card is-locked"
        style={style}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        aria-disabled="true"
        title="Tautan aplikasi APK belum tersedia"
      >
        {content}
      </div>
    )
  }

  return (
    <a
      className="app-card"
      style={style}
      href={app.href ?? undefined}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Buka ${app.name} — ${app.short}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {content}
    </a>
  )
}
