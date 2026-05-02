import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { UseFormRegister } from 'react-hook-form'

import { Marginalia } from '../_components/Marginalia'
import { PanelCard } from '../_components/PanelCard'
import { RenderBadge } from '../_components/RenderBadge'
import { SectionHeading } from '../_components/SectionHeading'
import { useRenderCount } from '../_hooks/useRenderCount'
import styles from '../styles.module.css'

interface Props {
  onParentRender: () => void
}

type Role = 'designer' | 'developer' | 'pm' | 'exec'

type Profile = {
  name: string
  email: string
  role: Role
}

const PROFILE_DEFAULTS: Profile = {
  name: '',
  email: '',
  role: 'developer',
}

const ROLE_LABELS: Record<Role, string> = {
  designer: 'Designer',
  developer: 'Developer',
  pm: 'Product Manager',
  exec: 'Executive',
}

type Strategy = 'watch' | 'getValues' | 'subscribe'

const STRATEGY_COPY: Record<Strategy, { title: string; note: string }> = {
  watch: {
    title: 'watch()',
    note: 'Parent re-renders on every keystroke — React reconciles the whole preview tree.',
  },
  getValues: {
    title: 'getValues()',
    note: 'Parent never re-renders from typing. You must click "Update preview" to refresh.',
  },
  subscribe: {
    title: 'form.subscribe()',
    note: 'Zero React re-renders, yet the preview updates live — via an imperative DOM callback.',
  },
}

/**
 * §6 — The escape hatch. A signup form + live preview card, implemented three ways.
 * Tabs swap the consumer strategy; each panel owns its own form so the render
 * counters are fully isolated.
 */
export function Section06Subscribe({ onParentRender }: Props) {
  const [strategy, setStrategy] = useState<Strategy>('watch')
  useRenderCount(onParentRender)

  return (
    <section className={styles.section}>
      <SectionHeading
        id="section-6"
        eyebrow="§ 6 — The escape hatch"
        title={
          <>
            <em>form.subscribe()</em> — zero re-renders, live preview.
          </>
        }
        lede={
          <>
            A realistic signup form with a live preview card next to it. Three tabs show three
            ways to keep the preview in sync: <code>watch()</code> subscribes the component tree,{' '}
            <code>getValues()</code> is a button-triggered snapshot, and <code>form.subscribe()</code>{' '}
            wires a callback that writes directly to the DOM — bypassing React&apos;s render phase
            entirely.
          </>
        }
      />

      <div role="tablist" aria-label="Preview strategy" className={styles.tabs}>
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

      {strategy === 'watch' ? <WatchStrategyPanel /> : null}
      {strategy === 'getValues' ? <GetValuesStrategyPanel /> : null}
      {strategy === 'subscribe' ? <SubscribeStrategyPanel /> : null}

      <Marginalia tone="hot">
        <strong>Don&apos;t mutate form state from inside the callback.</strong> The official docs
        warn against calling <code>setValue</code> or <code>reset</code> inside a{' '}
        <code>subscribe</code> callback — doing so risks infinite subscription loops.{' '}
        <code>subscribe</code> is strictly for reading. If you need to write, dispatch the update
        via a different channel (e.g. a <code>queueMicrotask</code> → React state update, or a
        separate event handler).
      </Marginalia>
    </section>
  )
}

/* ------------------------------------------------------------- */

function ProfileInputs({ register, idPrefix }: { register: UseFormRegister<Profile>; idPrefix: string }) {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div>
        <label className={styles.label} htmlFor={`${idPrefix}-name`}>
          name
        </label>
        <input
          id={`${idPrefix}-name`}
          className={styles.input}
          placeholder="Ada Lovelace"
          autoComplete="off"
          {...register('name')}
        />
      </div>
      <div>
        <label className={styles.label} htmlFor={`${idPrefix}-email`}>
          email
        </label>
        <input
          id={`${idPrefix}-email`}
          className={styles.input}
          placeholder="ada@example.com"
          autoComplete="off"
          {...register('email')}
        />
      </div>
      <div>
        <label className={styles.label} htmlFor={`${idPrefix}-role`}>
          role
        </label>
        <select id={`${idPrefix}-role`} className={styles.select} {...register('role')}>
          {(Object.keys(ROLE_LABELS) as Role[]).map((role) => (
            <option key={role} value={role}>
              {ROLE_LABELS[role]}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------- */

function ReactivePreviewCard({ profile }: { profile: Profile }) {
  const hasName = profile.name.trim().length > 0
  return (
    <div className={styles.previewCard}>
      <div className={styles.previewCardHeader}>
        {hasName ? profile.name : <span style={{ color: 'var(--muted)' }}>— no name yet —</span>}
      </div>
      <div className={styles.previewRow}>
        <span className={styles.previewKey}>email</span>
        <span className={styles.previewValue}>{profile.email || '—'}</span>
      </div>
      <div className={styles.previewRow}>
        <span className={styles.previewKey}>role</span>
        <span className={styles.previewValue}>{ROLE_LABELS[profile.role]}</span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------- */

function WatchStrategyPanel() {
  const { register, watch } = useForm<Profile>({ defaultValues: PROFILE_DEFAULTS })
  // Calling watch() at the parent subscribes to the entire form → re-renders
  // on every keystroke. This is the "reactive" strategy — easy to write but
  // burns React work on each input event.
  const values = watch()
  const renders = useRenderCount()

  return (
    <div className={styles.grid2}>
      <PanelCard
        tag="Form"
        title="watch()"
        titleMono
        right={<RenderBadge count={renders} label="parent" tone="hot" />}
        footer={<span>{STRATEGY_COPY.watch.note}</span>}
      >
        <ProfileInputs register={register} idPrefix="s6-watch" />
      </PanelCard>

      <PanelCard tag="Preview" title="Live preview">
        <ReactivePreviewCard profile={values} />
      </PanelCard>
    </div>
  )
}

/* ------------------------------------------------------------- */

function GetValuesStrategyPanel() {
  const { register, getValues } = useForm<Profile>({ defaultValues: PROFILE_DEFAULTS })
  const [snapshot, setSnapshot] = useState<Profile>(PROFILE_DEFAULTS)
  const renders = useRenderCount()

  return (
    <div className={styles.grid2}>
      <PanelCard
        tag="Form"
        title="getValues()"
        titleMono
        right={<RenderBadge count={renders} label="parent" tone="cool" />}
        footer={<span>{STRATEGY_COPY.getValues.note}</span>}
      >
        <ProfileInputs register={register} idPrefix="s6-gv" />
      </PanelCard>

      <PanelCard
        tag="Preview"
        title="Snapshot preview"
        footer={
          <button
            type="button"
            className={`${styles.button} ${styles.buttonPrimary}`}
            onClick={() => setSnapshot(getValues())}
          >
            Update preview
          </button>
        }
      >
        <ReactivePreviewCard profile={snapshot} />
      </PanelCard>
    </div>
  )
}

/* ------------------------------------------------------------- */

/**
 * The escape-hatch strategy: form.subscribe() registers a callback that fires
 * on every value change, but the callback lives OUTSIDE React's render phase.
 * We write directly to DOM nodes via refs, so React never learns anything
 * changed — parent render count stays pinned at 1, yet the preview updates
 * on every keystroke.
 */
function SubscribeStrategyPanel() {
  const { register, subscribe, getValues } = useForm<Profile>({
    defaultValues: PROFILE_DEFAULTS,
  })
  const renders = useRenderCount()

  const nameRef = useRef<HTMLSpanElement>(null)
  const emailRef = useRef<HTMLSpanElement>(null)
  const roleRef = useRef<HTMLSpanElement>(null)
  const domUpdatesRef = useRef<HTMLSpanElement>(null)
  const lastChangedRef = useRef<HTMLSpanElement>(null)
  const domUpdateCountRef = useRef(0)

  useEffect(() => {
    // Seed the DOM with whatever values are currently in the form. We can't
    // rely on the callback to fire on mount — it only fires on *change*.
    const paint = (values: Profile, changedName?: string) => {
      if (nameRef.current) {
        nameRef.current.textContent = values.name || '— no name yet —'
      }
      if (emailRef.current) {
        emailRef.current.textContent = values.email || '—'
      }
      if (roleRef.current) {
        roleRef.current.textContent = ROLE_LABELS[values.role]
      }
      if (changedName && lastChangedRef.current) {
        lastChangedRef.current.textContent = changedName
      }
    }

    paint(getValues())

    const unsubscribe = subscribe({
      formState: { values: true },
      callback: ({ values, name }) => {
        domUpdateCountRef.current += 1
        if (domUpdatesRef.current) {
          domUpdatesRef.current.textContent = String(domUpdateCountRef.current)
        }
        paint(values, name)
      },
    })

    return () => unsubscribe()
  }, [subscribe, getValues])

  return (
    <div className={styles.grid2}>
      <PanelCard
        tag="Form"
        title="form.subscribe()"
        titleMono
        right={
          <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
            <span className={styles.newBadge}>v7.55</span>
            <RenderBadge count={renders} label="parent" tone="cool" />
          </span>
        }
        footer={<span>{STRATEGY_COPY.subscribe.note}</span>}
      >
        <ProfileInputs register={register} idPrefix="s6-sub" />
      </PanelCard>

      <PanelCard tag="Preview" title="Imperative preview">
        <div className={styles.previewCard}>
          <div className={styles.previewCardHeader}>
            <span ref={nameRef} style={{ color: 'var(--muted)' }}>
              — no name yet —
            </span>
          </div>
          <div className={styles.previewRow}>
            <span className={styles.previewKey}>email</span>
            <span className={styles.previewValue} ref={emailRef}>
              —
            </span>
          </div>
          <div className={styles.previewRow}>
            <span className={styles.previewKey}>role</span>
            <span className={styles.previewValue} ref={roleRef}>
              {ROLE_LABELS[PROFILE_DEFAULTS.role]}
            </span>
          </div>
          <div
            style={{
              marginTop: 8,
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--muted)',
            }}
          >
            <span>
              last changed:{' '}
              <b ref={lastChangedRef} style={{ color: 'var(--cool)' }}>
                —
              </b>
            </span>
            <span>
              DOM updates:{' '}
              <b ref={domUpdatesRef} style={{ color: 'var(--hot)' }}>
                0
              </b>
            </span>
          </div>
        </div>
      </PanelCard>
    </div>
  )
}
