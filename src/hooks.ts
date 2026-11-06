import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react'

/** Waktu sekarang yang diperbarui tiap `intervalMs`. */
export function useNow(intervalMs: number) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs])

  return now
}

/** true setelah halaman di-scroll lebih dari `offset` px (untuk bayangan header). */
export function useScrolled(offset = 8) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])

  return scrolled
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * FLIP: saat daftar kartu berubah (filter / pencarian), kartu yang tetap tampil
 * meluncur halus ke posisi barunya, bukan melompat.
 * Tandai setiap kartu dengan atribut `data-flip="<kunci unik>"`.
 */
export function useFlip(containerRef: RefObject<HTMLElement | null>, signature: string) {
  const previous = useRef<Map<string, { x: number; y: number }>>(new Map())

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const origin = container.getBoundingClientRect()
    const next = new Map<string, { x: number; y: number }>()
    const reduce = prefersReducedMotion()

    container.querySelectorAll<HTMLElement>('[data-flip]').forEach((node) => {
      const key = node.dataset.flip as string
      const rect = node.getBoundingClientRect()
      const pos = { x: rect.left - origin.left, y: rect.top - origin.top }
      next.set(key, pos)

      const before = previous.current.get(key)
      if (!before || reduce) return

      const dx = before.x - pos.x
      const dy = before.y - pos.y
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return

      node.animate(
        [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0, 0)' }],
        { duration: 460, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      )
    })

    previous.current = next
  }, [containerRef, signature])
}
