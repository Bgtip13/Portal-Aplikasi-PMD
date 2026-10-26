import type { CSSProperties } from 'react'
import type { PmdApp } from '../data/apps'
import AppIcon from './AppIcon'
import { ArrowRightIcon, ArrowUpRightIcon, ClockIcon } from './icons'

type Props = {
  app: PmdApp
  index: number
}

export default function AppCard({ app, index }: Props) {
  const isLocked = !app.href

  const style = {
    '--accent': app.accent,
    '--enter-delay': `${index * 30}ms`,
  } as CSSProperties

  const content = (
    <>
      <div className="app-card__top">
        <span className="app-card__icon">
          <AppIcon app={app} />
        </span>
        <span className="app-card__badge" aria-hidden="true">
          {isLocked ? <ClockIcon size={16} /> : <ArrowUpRightIcon size={16} />}
        </span>
      </div>

      <div className="app-card__body">
        <p className="app-card__tag">{app.tag}</p>
        <h3 className="app-card__title">{app.name}</h3>
        <p className="app-card__desc">{app.description}</p>
      </div>

      <div className="app-card__foot">
        <span className="app-card__cta">{isLocked ? 'Segera hadir' : 'Buka aplikasi'}</span>
        {!isLocked && (
          <span className="app-card__arrow" aria-hidden="true">
            <ArrowRightIcon size={15} />
          </span>
        )}
      </div>
    </>
  )

  if (isLocked) {
    return (
      <div
        className="app-card is-locked"
        style={style}
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
      href={app.href ?? undefined}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Buka ${app.name} — ${app.short} (tab baru)`}
    >
      {content}
    </a>
  )
}
