import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import type { Control, UseFormRegister } from 'react-hook-form'

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

type Strategy = 'getValues' | 'watch' | 'useWatchPerField'

type FieldShape = Record<`field${number}`, string>

const FIELD_COUNT = 10
const FIELD_KEYS = Array.from({ length: FIELD_COUNT }, (_, i) => `field${i}` as const)

const STRATEGY_COPY: Record<Strategy, { title: string; summary: string }> = {
  getValues: {
    title: 'getValues',
    summary:
      'Parent does not subscribe. Press the button to capture all 10 values. Typing produces 0 parent re-renders.',
  },
  watch: {
    title: 'watch()',
    summary:
      'Parent subscribes to the whole form. Every keystroke in any field re-renders the parent.',
  },
  useWatchPerField: {
    title: 'useWatch per field',
    summary:
      'Parent does not subscribe. Each field has its own child component calling useWatch → only the touched field re-renders, and only at its leaf.',
  },
}

/**
 * §2 — Render heatmap. 10 fields, 3 strategies, 1 stable form.
 * Fields remain mounted across strategy switches so the render counters
 * represent true cross-strategy comparisons (no remount bias).
 */
export function Section02Heatmap({ onParentRender }: Props) {
  const [strategy, setStrategy] = useState<Strategy>('watch')
  const { register, control, getValues } = useForm<FieldShape>({
    defaultValues: Object.fromEntries(FIELD_KEYS.map((k) => [k, ''])) as FieldShape,
  })

  useRenderCount(onParentRender)

  return (
    <section className={styles.section}>
      <SectionHeading
        id="section-2"
        eyebrow="§ 2 — Render heatmap"
        title={
          <>
            Ten fields, three strategies, <em>one stable form.</em>
          </>
        }
        lede={
          <>
            The inputs below never unmount — only the consuming display on the right swaps. Flip
            the strategy tabs and type in any field. Notice how the consumer badge behaves
            radically differently without any change to the input markup.
          </>
        }
      />

      <div role="tablist" aria-label="Consumer strategy" className={styles.tabs}>
        {(Object.keys(STRATEGY_COPY) as Strategy[]).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={strategy === key}
            className={`${styles.tab} ${strategy === key ? styles.tabActive : ''}`}
            onClick={() => setStrategy(key)}
          >
            {STRATEGY_COPY[key].title}
          </button>
        ))}
      </div>

      <PanelCard
        tag="Strategy"
        title={STRATEGY_COPY[strategy].title}
        titleMono
        footer={<span>{STRATEGY_COPY[strategy].summary}</span>}
      >
        <div className={styles.heatmapWrap}>
          <div className={styles.heatmapFields}>
            {FIELD_KEYS.map((key, i) => (
              <HeatmapField
                key={key}
                index={i}
                register={register}
                control={control}
                name={key}
                showChildCounter={strategy === 'useWatchPerField'}
              />
            ))}
          </div>

          <div style={{ display: 'grid', gap: 12 }}>
            {strategy === 'getValues' ? (
              <GetValuesDisplay getValues={getValues} />
            ) : strategy === 'watch' ? (
              <WatchAllDisplay control={control} />
            ) : (
              <UseWatchSummary control={control} />
            )}
          </div>
        </div>
      </PanelCard>

      <Marginalia>
        <strong>Honest caveat:</strong> <code>useWatch</code> per field is not magically
        &quot;cheaper&quot; than <code>watch()</code>. The total subscriber count is the same — the
        difference is that each subscriber lives in a small leaf component that can be memoized,
        instead of re-rendering the whole form body.
      </Marginalia>
    </section>
  )
}

/* ------------------------------------------------------------- */

interface FieldProps {
  index: number
  name: `field${number}`
  register: UseFormRegister<FieldShape>
  control: Control<FieldShape>
  showChildCounter: boolean
}

function HeatmapField({ index, name, register, control, showChildCounter }: FieldProps) {
  return (
    <div className={styles.heatmapField}>
      <label className={styles.heatmapFieldLabel} htmlFor={`heatmap-${name}`}>
        <span>
          field <b>{String(index).padStart(2, '0')}</b>
        </span>
        {showChildCounter ? <FieldChildBadge control={control} name={name} /> : null}
      </label>
      <input
        id={`heatmap-${name}`}
        className={styles.input}
        placeholder={`value ${index}`}
        {...register(name)}
      />
    </div>
  )
}

function FieldChildBadge({
  control,
  name,
}: {
  control: Control<FieldShape>
  name: `field${number}`
}) {
  useWatch({ control, name })
  const renders = useRenderCount()
  return <RenderBadge count={renders} label="leaf" tone="hot" />
}

/* ------------------------------------------------------------- */

function DisplayHeader({
  label,
  count,
  tone,
}: {
  label: string
  count: number
  tone: 'hot' | 'cool'
}) {
  return (
    <div className={styles.heatmapConsumerHeader}>
      <span className={styles.heatmapConsumerLabel}>consumer</span>
      <RenderBadge count={count} label={label} tone={tone} />
    </div>
  )
}

function GetValuesDisplay({ getValues }: { getValues: () => FieldShape }) {
  const [snapshot, setSnapshot] = useState<FieldShape | null>(null)
  const renders = useRenderCount()
  return (
    <>
      <DisplayHeader label="consumer" count={renders} tone="cool" />
      <button
        type="button"
        className={`${styles.button} ${styles.buttonPrimary}`}
        onClick={() => setSnapshot({ ...getValues() })}
      >
        Take snapshot of all fields
      </button>
      <CodeReadout
        label="snapshot"
        value={snapshot}
        placeholder="press the button to capture all 10 values"
      />
    </>
  )
}

function WatchAllDisplay({ control }: { control: Control<FieldShape> }) {
  const values = useWatch({ control })
  const renders = useRenderCount()
  return (
    <>
      <DisplayHeader label="consumer" count={renders} tone="hot" />
      <CodeReadout label="watch() — live" value={values} />
    </>
  )
}

function UseWatchSummary({ control }: { control: Control<FieldShape> }) {
  const renders = useRenderCount()
  return (
    <>
      <DisplayHeader label="parent consumer" count={renders} tone="cool" />
      <CodeReadout
        label="parent"
        value="parent does not subscribe — look at the leaf badges inside each field"
      />
      <div style={{ display: 'grid', gap: 6 }}>
        {FIELD_KEYS.map((key) => (
          <LeafValue key={key} control={control} name={key} />
        ))}
      </div>
    </>
  )
}

function LeafValue({ control, name }: { control: Control<FieldShape>; name: `field${number}` }) {
  const value = useWatch({ control, name })
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr',
        gap: 8,
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'var(--ink-soft)',
      }}
    >
      <span style={{ color: 'var(--muted)' }}>{name}</span>
      <span>{value || '—'}</span>
    </div>
  )
}
