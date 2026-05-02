import { useMemo, useState } from 'react'
import type { InputHTMLAttributes } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import type { Control, UseFormGetValues } from 'react-hook-form'

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

type AddressShape = {
  address: {
    country: string
    state: string
    city: string
    zip: string
  }
}

const DEFAULTS: AddressShape = {
  address: { country: '', state: '', city: '', zip: '' },
}

/**
 * §3 — Nested object deep dive. One form, three cards, three different
 * subscription paths into the same nested subtree.
 */
export function Section03Nested({ onParentRender }: Props) {
  const { register, control, getValues } = useForm<AddressShape>({ defaultValues: DEFAULTS })
  useRenderCount(onParentRender)

  return (
    <section className={styles.section}>
      <SectionHeading
        id="section-3"
        eyebrow="§ 3 — Nested access"
        title={
          <>
            Subscribing into <em>deep subtrees.</em>
          </>
        }
        lede={
          <>
            One nested form, one set of inputs, three different ways to read from{' '}
            <code>address</code>. Notice how the card for <code>watch(&apos;address&apos;)</code>{' '}
            pulses on <em>any</em> sub-field change, while the country card ignores changes to
            city/state/zip entirely.
          </>
        }
      />

      <PanelCard
        tag="Shared form"
        title="address: {country, state, city, zip}"
        titleMono
        footer={<span>Each input writes directly to its nested path via register</span>}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: 12,
          }}
        >
          <NestedField label="country" {...register('address.country')} />
          <NestedField label="state" {...register('address.state')} />
          <NestedField label="city" {...register('address.city')} />
          <NestedField label="zip" {...register('address.zip')} />
        </div>
      </PanelCard>

      <div className={styles.grid3}>
        <CountryWatchCard control={control} />
        <AddressWatchCard control={control} />
        <CitySnapshotCard getValues={getValues} />
      </div>

      <Marginalia tone="hot">
        <strong>Reference identity footgun:</strong> <code>watch(&apos;address&apos;)</code>{' '}
        returns a <em>new object reference</em> on every keystroke, even if only one field
        changed. Passing that object into <code>useMemo</code> deps or{' '}
        <code>useEffect</code> deps will bust the memo on every render. Prefer path-specific
        subscriptions or compare by value.
      </Marginalia>
    </section>
  )
}

/* ------------------------------------------------------------- */

interface NestedFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

function NestedField({ label, ...inputProps }: NestedFieldProps) {
  const id = `s3-${label}`
  return (
    <div>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input id={id} className={styles.input} placeholder={label} {...inputProps} />
    </div>
  )
}

/* ------------------------------------------------------------- */

function CountryWatchCard({ control }: { control: Control<AddressShape> }) {
  const country = useWatch({ control, name: 'address.country' })
  const renders = useRenderCount()

  return (
    <PanelCard
      tag="Card 1"
      title="watch('address.country')"
      titleMono
      right={<RenderBadge count={renders} label="renders" tone="hot" />}
      footer={<span>Only re-renders when <code>country</code> changes</span>}
    >
      <CodeReadout label="country" value={country} placeholder="…" />
      <TreeHighlight highlightCountry highlightAll={false} />
    </PanelCard>
  )
}

/* ------------------------------------------------------------- */

function AddressWatchCard({ control }: { control: Control<AddressShape> }) {
  const address = useWatch({ control, name: 'address' })
  const renders = useRenderCount()

  const stringifiedLength = useMemo(
    () => JSON.stringify(address).length,
    [address], // ← new object identity each render → bust on every keystroke
  )

  return (
    <PanelCard
      tag="Card 2"
      title="watch('address')"
      titleMono
      right={<RenderBadge count={renders} label="renders" tone="hot" />}
      footer={<span>Re-renders on <em>any</em> sub-field change</span>}
    >
      <CodeReadout label="address (live)" value={address} />
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--muted)',
        }}
      >
        useMemo busted {renders}× (new obj ref every render) →{' '}
        <b style={{ color: 'var(--ink)' }}>{stringifiedLength} chars</b>
      </div>
      <TreeHighlight highlightAll highlightCountry={false} />
    </PanelCard>
  )
}

/* ------------------------------------------------------------- */

function CitySnapshotCard({ getValues }: { getValues: UseFormGetValues<AddressShape> }) {
  const [snapshot, setSnapshot] = useState<string | null>(null)
  const renders = useRenderCount()

  return (
    <PanelCard
      tag="Card 3"
      title="getValues('address.city')"
      titleMono
      right={<RenderBadge count={renders} label="renders" tone="cool" />}
      footer={
        <button
          type="button"
          className={`${styles.button} ${styles.buttonPrimary}`}
          onClick={() => setSnapshot(getValues('address.city'))}
        >
          Snapshot city
        </button>
      }
    >
      <CodeReadout label="last snapshot" value={snapshot} placeholder="press the button" />
      <TreeHighlight highlightCity />
    </PanelCard>
  )
}

/* ------------------------------------------------------------- */

interface TreeProps {
  highlightCountry?: boolean
  highlightAll?: boolean
  highlightCity?: boolean
}

function TreeHighlight({ highlightCountry, highlightAll, highlightCity }: TreeProps) {
  const countryCls = `${styles.treeNode} ${styles.treeIndent} ${highlightAll || highlightCountry ? styles.treeHot : ''}`
  const stateCls = `${styles.treeNode} ${styles.treeIndent} ${highlightAll ? styles.treeHot : ''}`
  const cityCls = `${styles.treeNode} ${styles.treeIndent} ${highlightAll || highlightCity ? styles.treeHot : ''}`
  const zipCls = `${styles.treeNode} ${styles.treeIndent} ${highlightAll ? styles.treeHot : ''}`

  return (
    <div className={styles.tree} aria-hidden="true">
      <div className={styles.treeNode}>
        <span className={styles.treeLead}>◌</span>
        <span className={styles.treeKey}>address</span>
      </div>
      <div className={countryCls}>
        <span className={styles.treeLead}>├</span>
        <span className={styles.treeKey}>country</span>
      </div>
      <div className={stateCls}>
        <span className={styles.treeLead}>├</span>
        <span className={styles.treeKey}>state</span>
      </div>
      <div className={cityCls}>
        <span className={styles.treeLead}>├</span>
        <span className={styles.treeKey}>city</span>
      </div>
      <div className={zipCls}>
        <span className={styles.treeLead}>└</span>
        <span className={styles.treeKey}>zip</span>
      </div>
    </div>
  )
}

