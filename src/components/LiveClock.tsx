import { useNow } from '../hooks'

const TIME_PARTS = new Intl.DateTimeFormat('id-ID', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'Asia/Jakarta',
})

/** Jam WIB yang berdetak tiap detik; titik dua berkedip lembut lewat CSS. */
export default function LiveClock() {
  const now = useNow(1000)
  const parts = TIME_PARTS.formatToParts(now)
  const hour = parts.find((part) => part.type === 'hour')?.value ?? '00'
  const minute = parts.find((part) => part.type === 'minute')?.value ?? '00'

  return (
    <span className="clock" aria-label={`Pukul ${hour}.${minute} WIB`}>
      <span aria-hidden="true">{hour}</span>
      <span className="clock__colon" aria-hidden="true">
        :
      </span>
      <span aria-hidden="true">{minute}</span>
      <em aria-hidden="true">WIB</em>
    </span>
  )
}
