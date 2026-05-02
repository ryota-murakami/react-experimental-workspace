import type { ReactNode } from 'react'

import styles from '../styles.module.css'

interface Props {
  tone?: 'cool' | 'hot'
  icon?: string
  children: ReactNode
}

/**
 * Tufte-style marginalia note. Used to flag footguns, caveats, and historical notes
 * without interrupting the main narrative.
 *
 * @param tone - "cool" for informational (indigo), "hot" for warnings/footguns (orange)
 * @param icon - Custom icon character (default: "§" for cool, "!" for hot)
 * @param children - Note content (supports inline <code> and <strong>)
 * @example
 * <Marginalia tone="hot">
 *   <strong>Footgun:</strong> <code>formState</code> is a Proxy — only destructured properties subscribe.
 * </Marginalia>
 */
export function Marginalia({ tone = 'cool', icon, children }: Props) {
  const defaultIcon = tone === 'hot' ? '!' : '§'
  return (
    <aside
      className={`${styles.marginalia} ${tone === 'hot' ? styles.marginaliaHot : ''}`}
      role="note"
    >
      <span className={styles.marginaliaIcon} aria-hidden="true">
        {icon ?? defaultIcon}
      </span>
      <div>{children}</div>
    </aside>
  )
}
