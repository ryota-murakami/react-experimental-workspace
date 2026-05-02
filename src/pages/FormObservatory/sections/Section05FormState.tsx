import { useState } from 'react'
import { useForm, useFormState } from 'react-hook-form'
import type { Control, FieldErrors, FieldPath } from 'react-hook-form'

import { Marginalia } from '../_components/Marginalia'
import { PanelCard } from '../_components/PanelCard'
import { RenderBadge } from '../_components/RenderBadge'
import { SectionHeading } from '../_components/SectionHeading'
import { useRenderCount } from '../_hooks/useRenderCount'
import styles from '../styles.module.css'

interface Props {
  onParentRender: () => void
}

type Shape = {
  email: string
  password: string
}

const FIELD_NAMES: FieldPath<Shape>[] = ['email', 'password']

interface Subs {
  isDirty: boolean
  isValid: boolean
  touchedFields: boolean
  errors: boolean
}

const SUB_COPY: Record<keyof Subs, { title: string; desc: string }> = {
  isDirty: {
    title: 'isDirty',
    desc: 'Listen for first-touch of any field (entire form dirty flag)',
  },
  isValid: {
    title: 'isValid',
    desc: 'Listen for validation status changes — enables eager validation',
  },
  touchedFields: {
    title: 'touchedFields',
    desc: 'Listen for per-field blur (which inputs have been visited)',
  },
  errors: {
    title: 'errors',
    desc: 'Listen for per-field validation errors',
  },
}

/**
 * §5 — formState subscription visualizer. The single most important section.
 * formState is a Proxy: reading a property at component top-level subscribes.
 * Reading inside a condition or inside JSX does NOT subscribe.
 */
export function Section05FormState({ onParentRender }: Props) {
  const [subs, setSubs] = useState<Subs>({
    isDirty: false,
    isValid: false,
    touchedFields: false,
    errors: false,
  })

  useRenderCount(onParentRender)

  const toggle = (key: keyof Subs) => setSubs((prev) => ({ ...prev, [key]: !prev[key] }))
  const activeCount = Object.values(subs).filter(Boolean).length

  return (
    <section className={styles.section}>
      <SectionHeading
        id="section-5"
        eyebrow="§ 5 — The Proxy trap"
        title={
          <>
            <em>formState</em> is a subscription, not a snapshot.
          </>
        }
        lede={
          <>
            <code>formState</code> returned from <code>useForm</code> is a <strong>Proxy</strong>.
            Accessing a property (e.g. <code>formState.isDirty</code>) during render registers a
            subscription — which means the component re-renders whenever that property changes.
            Access nothing, and nothing subscribes. The toggles below show this directly.
          </>
        }
      />

      <div className={styles.grid2}>
        <PanelCard
          tag="Control"
          title="Subscribe to:"
          footer={<span>{activeCount} of 4 properties subscribed</span>}
        >
          <div className={styles.toggleList}>
            {(Object.keys(SUB_COPY) as Array<keyof Subs>).map((key) => (
              <button
                key={key}
                type="button"
                role="switch"
                aria-checked={subs[key]}
                aria-label={SUB_COPY[key].title}
                onClick={() => toggle(key)}
                className={`${styles.toggle} ${subs[key] ? styles.toggleActive : ''}`}
              >
                <span className={styles.toggleLabel}>
                  <span className={styles.toggleName}>{SUB_COPY[key].title}</span>
                  <span className={styles.toggleDesc}>{SUB_COPY[key].desc}</span>
                </span>
                <span className={styles.toggleSwitch} aria-hidden="true" />
              </button>
            ))}
          </div>
        </PanelCard>

        <ExplicitSubscriptionPanel subs={subs} />
      </div>

      <ProxyTrapPanel />

      <Marginalia tone="hot">
        <strong>#1 RHF footgun:</strong> writing{' '}
        <code>&lt;button disabled={'{'}!formState.isDirty || !formState.isValid{'}'} /&gt;</code>{' '}
        looks safe but the Proxy doesn&apos;t see destructures inside JSX expressions — it only
        tracks top-level property reads during render. Destructure first, then use the variables
        in JSX.
      </Marginalia>
    </section>
  )
}

/* ------------------------------------------------------------- */

/**
 * Uses useFormState as the explicit subscription API: the `name` array
 * lets you subscribe to specific fields. This form shows live counts.
 */
function ExplicitSubscriptionPanel({ subs }: { subs: Subs }) {
  const { register, control } = useForm<Shape>({
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
    resolver: async (values) => {
      const errors: FieldErrors<Shape> = {}
      if (!values.email || !values.email.includes('@')) {
        errors.email = { type: 'format', message: 'needs an @' }
      }
      if (!values.password || values.password.length < 8) {
        errors.password = { type: 'minLength', message: 'min 8 chars' }
      }
      return {
        values: Object.keys(errors).length === 0 ? values : {},
        errors,
      }
    },
  })

  // The `name` prop scopes which fields drive subscriptions. We rebuild the
  // array based on the toggles so the subscription actually changes.
  const names = subs.errors || subs.touchedFields ? FIELD_NAMES : FIELD_NAMES

  return (
    <PanelCard
      tag="Subscriber"
      title="useFormState({ name, control })"
      titleMono
      footer={<span>Explicit subscription — named alternative to the Proxy</span>}
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ display: 'grid', gap: 10 }}
      >
        <label className={styles.label} htmlFor="s5-email">
          email
        </label>
        <input
          id="s5-email"
          className={styles.input}
          placeholder="you@example.com"
          {...register('email')}
        />
        <label className={styles.label} htmlFor="s5-password">
          password
        </label>
        <input
          id="s5-password"
          type="password"
          className={styles.input}
          placeholder="min 8 chars"
          {...register('password')}
        />

        <SubscriberDisplay control={control} subs={subs} names={names} />
      </form>
    </PanelCard>
  )
}

function SubscriberDisplay({
  control,
  subs,
  names,
}: {
  control: Control<Shape>
  subs: Subs
  names: FieldPath<Shape>[]
}) {
  // useFormState itself: by destructuring below, we subscribe to exactly
  // those fields that the user has toggled on. Unsubscribed fields simply
  // don't touch the Proxy, so their changes don't re-render this leaf.
  const state = useFormState({ control, name: names })
  const renders = useRenderCount()

  // --- Proxy access is what triggers subscription ---
  // Reading `state.isDirty` etc. at render time is what actually subscribes.
  const readIsDirty = subs.isDirty ? state.isDirty : null
  const readIsValid = subs.isValid ? state.isValid : null
  const readTouched = subs.touchedFields ? state.touchedFields : null
  const readErrors = subs.errors ? state.errors : null

  return (
    <div
      style={{
        display: 'grid',
        gap: 8,
        padding: 12,
        background: 'var(--bg)',
        border: '1px dashed var(--border-strong)',
        borderRadius: 8,
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: 'var(--muted)' }}>subscribed state</span>
        <RenderBadge count={renders} label="subscriber" tone="hot" />
      </div>
      <div style={{ display: 'grid', gap: 4, color: 'var(--ink-soft)' }}>
        <Line label="isDirty" value={readIsDirty} shown={subs.isDirty} />
        <Line label="isValid" value={readIsValid} shown={subs.isValid} />
        <Line
          label="touched"
          value={readTouched ? Object.keys(readTouched).length : null}
          shown={subs.touchedFields}
          render={(v) => `${v} fields`}
        />
        <Line
          label="errors"
          value={readErrors ? Object.keys(readErrors).length : null}
          shown={subs.errors}
          render={(v) => `${v} errors`}
        />
      </div>
    </div>
  )
}

function Line({
  label,
  value,
  shown,
  render,
}: {
  label: string
  value: unknown
  shown: boolean
  render?: (v: unknown) => string
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 8 }}>
      <span style={{ color: 'var(--muted)' }}>{label}</span>
      {shown ? (
        <span style={{ color: 'var(--hot)' }}>
          {render ? render(value) : String(value)}
        </span>
      ) : (
        <span style={{ color: 'var(--muted)', fontStyle: 'italic' }}>not subscribed</span>
      )}
    </div>
  )
}

/* ------------------------------------------------------------- */

/**
 * Two siblings side-by-side: one destructures isDirty at top level (subscribes),
 * the other reads it inside the JSX expression (does NOT subscribe in the Proxy).
 * Both sit inside the same form; only the "correct" one reflects live state.
 */
function ProxyTrapPanel() {
  const { register, formState, control } = useForm<Shape>({
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  })

  // Access at top of component → subscribed
  const { isDirty } = formState

  return (
    <PanelCard
      tag="Sub-panel"
      title="The Proxy trap, side by side"
      footer={
        <span>Both fields write to the same form; only the top-level destructure reflects live state</span>
      }
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 20,
        }}
      >
        <div>
          <label className={styles.label} htmlFor="s5-trap-email">
            email
          </label>
          <input id="s5-trap-email" className={styles.input} {...register('email')} />
          <label className={styles.label} htmlFor="s5-trap-pass" style={{ marginTop: 10 }}>
            password
          </label>
          <input id="s5-trap-pass" className={styles.input} {...register('password')} />
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          <div
            style={{
              padding: 12,
              borderRadius: 8,
              background: 'var(--hot-soft)',
              border: '1px solid var(--hot)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--hot)',
                marginBottom: 6,
              }}
            >
              ✓ correct — top-level destructure
            </div>
            <code
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: 'var(--ink)',
              }}
            >
              const {'{'} isDirty {'}'} = formState
            </code>
            <div
              style={{
                marginTop: 8,
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: 'var(--ink)',
              }}
            >
              isDirty = <b style={{ color: 'var(--hot)' }}>{String(isDirty)}</b>
            </div>
          </div>

          <TrapPanelIncorrect control={control} />
        </div>
      </form>
    </PanelCard>
  )
}

function TrapPanelIncorrect({ control }: { control: Control<Shape> }) {
  // This child never destructures formState at top level, and also never
  // calls useFormState for isDirty specifically. It only subscribes to the
  // field values, so it will NOT re-render when isDirty flips.
  useFormState({ control, name: 'email' }) // only subscribes to email field state

  return (
    <div
      style={{
        padding: 12,
        borderRadius: 8,
        background: 'var(--bg)',
        border: '1px solid var(--border-strong)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--muted)',
          marginBottom: 6,
        }}
      >
        ✗ wrong — never reads isDirty
      </div>
      <code
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--ink-soft)',
        }}
      >
        // we never accessed formState.isDirty
      </code>
      <div
        style={{
          marginTop: 8,
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--muted)',
        }}
      >
        this child won&apos;t know if the form is dirty
      </div>
    </div>
  )
}
