import type { ReactNode } from 'react'

import styles from '../styles.module.css'

interface Props {
  id: string
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
}

/**
 * Section heading for each of the 6 sections in Form Observatory.
 * The `id` is used as the anchor target for the sticky nav (scroll & IntersectionObserver).
 *
 * @param id - Anchor ID (e.g., "section-1") — matches href in SectionNav
 * @param eyebrow - Section number marker (e.g., "§ 1 — Primary distinction")
 * @param title - Main heading (serif, mixed italic/regular encouraged)
 * @param lede - Optional lead paragraph below the title
 * @example
 * <SectionHeading
 *   id="section-1"
 *   eyebrow="§ 1 — Primary distinction"
 *   title={<>The same form, <em>three consumers.</em></>}
 *   lede="Only the subscription strategy differs."
 * />
 */
export function SectionHeading({ id, eyebrow, title, lede }: Props) {
  return (
    <header id={id} className={styles.sectionHeader}>
      <div className={styles.sectionEyebrow}>{eyebrow}</div>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {lede ? <p className={styles.sectionLede}>{lede}</p> : null}
    </header>
  )
}
