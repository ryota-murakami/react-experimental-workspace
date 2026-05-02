import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import type { Control } from 'react-hook-form'

import { CodeReadout } from '../_components/CodeReadout'
import { Marginalia } from '../_components/Marginalia'
import { PanelCard } from '../_components/PanelCard'
import { RenderBadge } from '../_components/RenderBadge'
import { SectionHeading } from '../_components/SectionHeading'
import { useRenderCount } from '../_hooks/useRenderCount'
import styles from '../styles.module.css'

interface Props {
  onParentRender: () => void
}

type FormShape = { text: string }

/**
 * §1 — Primary distinction between getValues, watch, and useWatch.
 * Three independent useForm instances, three independent consumers,
 * three independent render counts. The learner can type in each panel
 * and see how parent re-render behavior differs.
 */
export function Section01Primary({ onParentRender }: Props) {
  useRenderCount(onParentRender)

  return (
    <section className={styles.section}>
      <SectionHeading
        id="section-1"
        eyebrow="§ 1 — Primary distinction"
        title={
          <>
            The same input, <em>three consumers.</em>
          </>
        }
        lede={
          <>
            Every panel below wires up a single text field via <code>register</code>. The only
            difference is how the value is <em>consumed</em> — <code>getValues</code> on demand,{' '}
            <code>watch</code> as a subscription, or <code>useWatch</code> scoped to a child.
            Watch the render badges as you type.
          </>
        }
      />

      <div className={styles.grid3}>
        <GetValuesPanel />
        <WatchPanel />
        <UseWatchPanel />
      </div>

      <Marginalia tone="hot">
        <strong>Footgun:</strong> calling <code>useWatch</code> in the <em>same</em> component as{' '}
        <code>useForm</code> gains you nothing — the isolation only kicks in when you push it down
        into a child component that receives <code>control</code> as a prop. Panel C demonstrates
        this: the parent render counter never moves.
      </Marginalia>
    </section>
  )
}

/* ------------------------------------------------------------- */

function GetValuesPanel() {
  const [snapshot, setSnapshot] = useState<string | null>(null)
  const { register, getValues } = useForm<FormShape>({ defaultValues: { text: '' } })
  const renders = useRenderCount()

  return (
    <PanelCard
      tag="Panel A"
      title="getValues()"
      titleMono
      right={<RenderBadge count={renders} label="renders" tone="cool" />}
      footer={
        <>
          <span>Snapshot on demand</span>
          <button
            type="button"
            className={`${styles.button} ${styles.buttonPrimary}`}
            onClick={() => setSnapshot(getValues('text'))}
          >
            Take snapshot
          </button>
        </>
      }
    >
      <label className={styles.label} htmlFor="p1-a-text">
        text
      </label>
      <input
        id="p1-a-text"
        className={styles.input}
        placeholder="type here…"
        {...register('text')}
      />
      <CodeReadout
        label="last snapshot"
        value={snapshot}
        placeholder="press the button to capture the current value"
      />
    </PanelCard>
  )
}

/* ------------------------------------------------------------- */

function WatchPanel() {
  const { register, watch } = useForm<FormShape>({ defaultValues: { text: '' } })
  const text = watch('text')
  const renders = useRenderCount()

  return (
    <PanelCard
      tag="Panel B"
      title="watch('text')"
      titleMono
      right={<RenderBadge count={renders} label="renders" tone="hot" />}
      footer={<span>Parent subscribes → re-renders on every keystroke</span>}
    >
      <label className={styles.label} htmlFor="p1-b-text">
        text
      </label>
      <input
        id="p1-b-text"
        className={styles.input}
        placeholder="type here…"
        {...register('text')}
      />
      <CodeReadout label="live value" value={text} placeholder="…" />
    </PanelCard>
  )
}

/* ------------------------------------------------------------- */

function UseWatchPanel() {
  const { register, control } = useForm<FormShape>({ defaultValues: { text: '' } })
  const parentRenders = useRenderCount()

  return (
    <PanelCard
      tag="Panel C"
      title="useWatch (child)"
      right={<RenderBadge count={parentRenders} label="parent" tone="cool" />}
      footer={<span>Only the child subscribes — parent stays at 1</span>}
    >
      <label className={styles.label} htmlFor="p1-c-text">
        text
      </label>
      <input
        id="p1-c-text"
        className={styles.input}
        placeholder="type here…"
        {...register('text')}
      />
      <UseWatchChild control={control} />
    </PanelCard>
  )
}

function UseWatchChild({ control }: { control: Control<FormShape> }) {
  const text = useWatch({ control, name: 'text' })
  const childRenders = useRenderCount()

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <RenderBadge count={childRenders} label="child" tone="hot" />
      </div>
      <CodeReadout label="live value (child only)" value={text} placeholder="…" />
    </div>
  )
}
