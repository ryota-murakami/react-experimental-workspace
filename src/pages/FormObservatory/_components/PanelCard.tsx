import type { ReactNode } from 'react'

import styles from '../styles.module.css'

interface Props {
  tag?: string
  title: string
  titleMono?: boolean
  right?: ReactNode
  footer?: ReactNode
  children: ReactNode
}

/**
 * Standard panel card used throughout Form Observatory sections.
 * Consists of header (tag + title + optional right-aligned slot), body, and optional footer.
 *
 * @param tag - Small uppercase tag text above the title (e.g., "Panel A")
 * @param title - Main title (serif by default, mono if titleMono=true)
 * @param titleMono - Use monospace font for the title (useful for API names like "watch()")
 * @param right - Slot for controls placed at the header's right edge (typically RenderBadge)
 * @param footer - Optional footer content (typically an action button or explainer)
 * @param children - Panel body content
 * @example
 * <PanelCard tag="Panel A" title="getValues()" titleMono right={<RenderBadge count={n} />}>
 *   <input />
 * </PanelCard>
 */
export function PanelCard({ tag, title, titleMono = false, right, footer, children }: Props) {
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.panelTitle}>
          {tag ? <span className={styles.panelTag}>{tag}</span> : null}
          <span className={titleMono ? styles.panelNameMono : styles.panelName}>{title}</span>
        </div>
        {right ? <div>{right}</div> : null}
      </div>
      <div className={styles.panelBody}>{children}</div>
      {footer ? <div className={styles.panelFooter}>{footer}</div> : null}
    </div>
  )
}
