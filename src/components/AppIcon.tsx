import { useState } from 'react'
import type { PmdApp } from '../data/apps'
import { AppGlyph } from './icons'

const EXTENSIONS = ['png', 'svg', 'webp', 'jpg', 'jpeg']

/**
 * Logo aplikasi. Mencari otomatis file di `public/icons/<slug>.<ext>`.
 * Kalau belum ada file logo, tampil ikon vektor bawaan supaya kartu tetap rapi.
 */
export default function AppIcon({ app }: { app: PmdApp }) {
  const [extIndex, setExtIndex] = useState(0)
  const [failed, setFailed] = useState(false)
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')

  if (failed) {
    return (
      <span className="app-icon__fallback">
        <AppGlyph slug={app.slug} />
      </span>
    )
  }

  return (
    <img
      className="app-icon__img"
      src={`${base}/icons/${app.slug}.${EXTENSIONS[extIndex]}`}
      alt={`Logo ${app.name}`}
      loading="lazy"
      draggable={false}
      onError={() => {
        if (extIndex < EXTENSIONS.length - 1) setExtIndex(extIndex + 1)
        else setFailed(true)
      }}
    />
  )
}
