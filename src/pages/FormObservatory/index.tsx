import { useCallback, useRef } from 'react'

import { SectionNav } from './_components/SectionNav'
import { Section01Primary } from './sections/Section01Primary'
import { Section02Heatmap } from './sections/Section02Heatmap'
import { Section03Nested } from './sections/Section03Nested'
import { Section04Arrays } from './sections/Section04Arrays'
import { Section05FormState } from './sections/Section05FormState'
import { Section06Subscribe } from './sections/Section06Subscribe'
import styles from './styles.module.css'

const NAV_ENTRIES = [
  { id: 'section-1', number: '§1', label: 'Primary distinction' },
  { id: 'section-2', number: '§2', label: 'Render heatmap' },
  { id: 'section-3', number: '§3', label: 'Nested access' },
  { id: 'section-4', number: '§4', label: 'Dynamic arrays' },
  { id: 'section-5', number: '§5', label: 'The Proxy trap' },
  { id: 'section-6', number: '§6', label: 'The escape hatch' },
]

/**
 * Form Observatory — a 6-section visual lab for React Hook Form's
 * getValues / watch / useWatch / useFormState / form.subscribe APIs.
 *
 * Each section owns its own useForm instance(s) and tracks render counts
 * via useRenderCount() in the render body. Parent renders from every
 * section bubble up into a single global counter visible in the sticky nav.
 *
 * Design language: "Observation Chamber" — warm paper, Fraunces display,
 * JetBrains Mono code, signal-orange pulse on re-renders. Fully responsive
 * and honors prefers-color-scheme + prefers-reduced-motion.
 */
export default function FormObservatory() {
  // The global counter is updated IMPERATIVELY — no React state, no feedback
  // loop. Sections bump the ref during their own renders, and we write the
  // new value directly to the nav's DOM node via `textContent`. This mirrors
  // the imperative pattern from §6 (form.subscribe): the counter is live,
  // but React never learns that anything changed, so bumping cannot trigger
  // another round of renders.
  const counterRef = useRef(0)
  const globalCountNodeRef = useRef<HTMLDivElement>(null)

  const bumpGlobal = useCallback(() => {
    counterRef.current += 1
    const node = globalCountNodeRef.current
    if (node) node.textContent = String(counterRef.current)
  }, [])

  return (
    <div className={styles.chamber}>
      <div className={styles.layout}>
        <header className={styles.pageHeader}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Form Observatory · react-hook-form 7.72
          </div>
          <h1 className={styles.pageTitle}>
            Six ways to ask a form <em>&ldquo;what do you know?&rdquo;</em>
          </h1>
          <p className={styles.pageLede}>
            A visual lab for React Hook Form&apos;s subscription model.{' '}
            <code>getValues</code>, <code>watch</code>, <code>useWatch</code>,{' '}
            <code>useFormState</code>, and the new <code>form.subscribe</code> all read the same
            state — but each re-renders a radically different slice of your component tree. Type
            in any field below, watch the counters, and decide which one belongs in your code.
          </p>
          <div className={styles.pageMeta}>
            <span>
              <b>API focus</b> getValues vs watch
            </span>
            <span>
              <b>Strict mode</b> off · counters 1:1
            </span>
            <span>
              <b>Theme</b> follows OS
            </span>
          </div>
        </header>

        <SectionNav entries={NAV_ENTRIES} globalCountNodeRef={globalCountNodeRef} />

        <main className={styles.main}>
          <Section01Primary onParentRender={bumpGlobal} />
          <Section02Heatmap onParentRender={bumpGlobal} />
          <Section03Nested onParentRender={bumpGlobal} />
          <Section04Arrays onParentRender={bumpGlobal} />
          <Section05FormState onParentRender={bumpGlobal} />
          <Section06Subscribe onParentRender={bumpGlobal} />
        </main>

        <footer className={styles.pageFooter}>
          <span>
            Built against react-hook-form 7.72 · <a href="/">← back to workbench</a>
          </span>
          <span>Type in any field to watch the counters move.</span>
        </footer>
      </div>
    </div>
  )
}
