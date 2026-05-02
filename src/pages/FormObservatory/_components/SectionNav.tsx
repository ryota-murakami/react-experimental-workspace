import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

import styles from '../styles.module.css'

interface Entry {
  id: string
  number: string
  label: string
}

interface Props {
  entries: Entry[]
  globalCountNodeRef: RefObject<HTMLDivElement | null>
}

/**
 * Sticky left-rail section navigation with IntersectionObserver-driven active state.
 * On viewports <= 960px, collapses into a horizontal chip bar via CSS.
 *
 * The global render counter is updated IMPERATIVELY by the parent via a ref
 * to its DOM node — this keeps the nav out of the render loop while still
 * showing a live count. The counter starts at 0 and will be overwritten on
 * the first bump.
 *
 * @param entries - Section nav entries (id, number, label)
 * @param globalCountNodeRef - Ref to the counter's text node (mutated outside React)
 * @example
 * const counterRef = useRef<HTMLDivElement>(null)
 * <SectionNav entries={...} globalCountNodeRef={counterRef} />
 */
export function SectionNav({ entries, globalCountNodeRef }: Props) {
  const [activeId, setActiveId] = useState<string>(entries[0]?.id ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (observed) => {
        const visible = observed
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 },
    )

    for (const entry of entries) {
      const el = document.getElementById(entry.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [entries])

  return (
    <nav className={styles.nav} aria-label="Section navigation">
      <ol className={styles.navList}>
        {entries.map((entry) => {
          const isActive = entry.id === activeId
          const className = `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
          return (
            <li key={entry.id}>
              <a href={`#${entry.id}`} className={className}>
                <span className={styles.navItemNumber}>{entry.number}</span>
                {entry.label}
              </a>
            </li>
          )
        })}
      </ol>

      <div className={styles.navCounter} aria-live="polite">
        <div className={styles.navCounterLabel}>Section frame renders</div>
        <div ref={globalCountNodeRef} className={styles.navCounterValue}>
          0
        </div>
        <div className={styles.navCounterHint}>
          counts re-renders of the 6 section containers only — stays flat while you type,
          because the work is isolated to leaf consumers.
        </div>
      </div>

      <div className={styles.navLegend}>
        <div className={styles.navLegendTitle}>Legend</div>
        <div className={styles.navLegendRow}>
          <span className={`${styles.navLegendDot} ${styles.navLegendDotHot}`} />
          <span>subscribes → re-renders</span>
        </div>
        <div className={styles.navLegendRow}>
          <span className={`${styles.navLegendDot} ${styles.navLegendDotCool}`} />
          <span>snapshot / stable</span>
        </div>
      </div>
    </nav>
  )
}
