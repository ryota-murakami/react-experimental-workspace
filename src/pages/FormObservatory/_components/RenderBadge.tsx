import styles from '../styles.module.css'

type Tone = 'neutral' | 'hot' | 'cool'

interface Props {
  count: number
  label?: string
  tone?: Tone
}

/**
 * Visual render counter badge. The `key` prop on the inner span forces a
 * remount every time `count` changes, which re-fires the CSS `pulseFlash`
 * keyframe animation WITHOUT triggering a parent re-render.
 *
 * @param count - The current render count
 * @param label - Optional label text shown before the number (default: "renders")
 * @param tone - Visual tone: "neutral" (static), "hot" (lively, orange pulse), "cool" (calm, indigo)
 * @example
 * <RenderBadge count={watchRenderCount} label="parent" tone="hot" />
 */
export function RenderBadge({ count, label = 'renders', tone = 'neutral' }: Props) {
  const className = [
    styles.badge,
    tone === 'hot' && styles.badgeHot,
    tone === 'cool' && styles.badgeCool,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={className} aria-live="polite">
      <span className={styles.badgeDot} />
      <span>{label}</span>
      <span key={count} className={`${styles.badgeCount} ${tone === 'hot' ? styles.pulse : ''}`}>
        {count}
      </span>
    </span>
  )
}
