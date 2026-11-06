import { memo, type CSSProperties, type PointerEvent } from 'react'
import type { PmdApp } from '../data/apps'
import AppIcon from './AppIcon'
import { ArrowUpRightIcon, ClockIcon } from './icons'

type Props = {
  app: PmdApp
  index: number
  /** true saat halaman pertama kali dibuka: kartu masuk berurutan setelah hero. */
  intro: boolean
}

/** Cahaya aksen mengikuti kursor di dalam kartu. */
function trackPointer(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== 'mouse') return
  const box = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--mx', `${event.clientX - box.left}px`)
  event.currentTarget.style.setProperty('--my', `${event.clientY - box.top}px`)
}

function AppCard({ app, index, intro }: Props) {
  const isLocked = !app.href

  const style = {
    '--accent': app.accent,
    '--enter-delay': `${intro ? 640 + index * 70 : index * 40}ms`,
  } as CSSProperties

  const content = (
    <>
      <span className="app-card__glow" aria-hidden="true" />

      <div className="app-card__top">
        <span className="app-card__icon">
          <AppIcon app={app} />
        </span>
        <span className="app-card__tag">{app.tag}</span>
      </div>

      <div className="app-card__body">
        <h3 className="app-card__title">{app.name}</h3>
        <p className="app-card__desc">{app.description}</p>
      </div>

      <div className="app-card__foot">
        <span className="app-card__cta">{isLocked ? 'Segera hadir' : 'Buka aplikasi'}</span>
        <span className="app-card__go" aria-hidden="true">
          {isLocked ? <ClockIcon size={16} /> : <ArrowUpRightIcon size={16} />}
        </span>
      </div>
    </>
  )

  if (isLocked) {
    return (
      <div
        className="app-card is-locked"
        style={style}
        data-flip={app.slug}
        aria-disabled="true"
        title="Tautan aplikasi belum tersedia"
      >
        {content}
      </div>
    )
  }

  return (
    <a
      className="app-card"
      style={style}
      data-flip={app.slug}
      href={app.href ?? undefined}
      target="_blank"
      rel="noopener noreferrer"
      onPointerMove={trackPointer}
      aria-label={`Buka ${app.name} — ${app.short} (tab baru)`}
    >
      {content}
    </a>
  )
}

export default memo(AppCard)
