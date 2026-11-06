import type { CSSProperties } from 'react'

/** Jejak kaki yang melangkah satu per satu saat halaman dibuka — mengulang motif logo PMD. */
const STEPS = [
  { x: 62, y: 88, r: 28, s: 70 },
  { x: 65, y: 60, r: 40, s: 80 },
  { x: 73, y: 84, r: 30, s: 88 },
  { x: 81, y: 54, r: 42, s: 96 },
  { x: 89, y: 82, r: 32, s: 104 },
  { x: 96, y: 40, r: 44, s: 114 },
]

function Paw() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <ellipse cx="50" cy="66" rx="25" ry="21" />
      <ellipse cx="19" cy="44" rx="8.5" ry="12" transform="rotate(-24 19 44)" />
      <ellipse cx="37" cy="25" rx="9" ry="13" transform="rotate(-9 37 25)" />
      <ellipse cx="63" cy="25" rx="9" ry="13" transform="rotate(9 63 25)" />
      <ellipse cx="81" cy="44" rx="8.5" ry="12" transform="rotate(24 81 44)" />
    </svg>
  )
}

export default function PawTrail() {
  return (
    <div className="paws" aria-hidden="true">
      {STEPS.map((step, index) => {
        const style = {
          left: `${step.x}%`,
          top: `${step.y}%`,
          '--size': `${step.s}px`,
          '--rot': `${step.r}deg`,
          '--step-delay': `${520 + index * 190}ms`,
        } as CSSProperties
        return (
          <span key={index} className={`paw paw--${index}`} style={style}>
            <Paw />
          </span>
        )
      })}
    </div>
  )
}
