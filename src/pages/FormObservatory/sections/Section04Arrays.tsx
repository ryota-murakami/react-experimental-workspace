import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
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

type Item = { name: string; quantity: number }
type Cart = { items: Item[] }

const DEFAULT_ITEMS: Item[] = [
  { name: 'Milk', quantity: 2 },
  { name: 'Eggs', quantity: 12 },
  { name: 'Bread', quantity: 1 },
]

/**
 * §4 — Dynamic arrays via useFieldArray. Left panel uses getValues on demand;
 * right panel uses per-row useWatch children for live-but-scoped updates.
 */
export function Section04Arrays({ onParentRender }: Props) {
  const { register, control, getValues } = useForm<Cart>({
    defaultValues: { items: DEFAULT_ITEMS },
  })
  const { fields, append, remove } = useFieldArray({ control, name: 'items' })

  useRenderCount(onParentRender)

  const handleAdd = () => append({ name: '', quantity: 1 })

  return (
    <section className={styles.section}>
      <SectionHeading
        id="section-4"
        eyebrow="§ 4 — Dynamic arrays"
        title={
          <>
            <em>useFieldArray</em>, but observed two ways.
          </>
        }
        lede={
          <>
            A shopping cart with add / remove operations. The left panel reads the array via{' '}
            <code>getValues</code> when you press the button. The right panel uses{' '}
            <code>useWatch</code> inside each row — only the edited row&apos;s badge advances.
          </>
        }
      />

      <PanelCard
        tag="Shared form"
        title="items: Item[]"
        titleMono
        right={
          <button
            type="button"
            className={`${styles.button} ${styles.buttonGhost}`}
            onClick={handleAdd}
          >
            <Plus size={14} />
            Add item
          </button>
        }
        footer={<span>Operations: append, remove — all fields stay registered</span>}
      >
        <div className={styles.arrayRows}>
          {fields.map((field, index) => (
            <div key={field.id} className={styles.arrayRow}>
              <span className={styles.arrayRowHandle}>#{String(index + 1).padStart(2, '0')}</span>
              <input
                className={styles.input}
                placeholder="item name"
                {...register(`items.${index}.name` as const)}
              />
              <input
                type="number"
                className={styles.input}
                min={0}
                {...register(`items.${index}.quantity` as const, { valueAsNumber: true })}
              />
              <RowBadge control={control} index={index} />
              <button
                type="button"
                className={`${styles.button} ${styles.buttonIcon} ${styles.buttonDanger}`}
                onClick={() => remove(index)}
                aria-label={`Remove item ${index + 1}`}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </PanelCard>

      <div className={styles.grid2}>
        <PanelCard tag="Left" title="getValues('items')" titleMono>
          <GetValuesDisplay getValues={getValues} />
        </PanelCard>

        <PanelCard
          tag="Right"
          title="watch('items')"
          titleMono
          right={<ItemsWatchBadge control={control} />}
          footer={<span>Subscribes to the entire array — re-renders on every keystroke</span>}
        >
          <WatchAllItems control={control} />
        </PanelCard>
      </div>

      <Marginalia>
        <strong>Array mutation caveat:</strong> <code>append</code>, <code>remove</code>, and{' '}
        <code>move</code> on <code>useFieldArray</code> re-register all affected rows at once. That
        is a structural re-render and is distinct from per-keystroke renders — the counter will
        jump in chunks when you add or remove rows.
      </Marginalia>
    </section>
  )
}

/* ------------------------------------------------------------- */

function RowBadge({ control, index }: { control: Control<Cart>; index: number }) {
  const renders = useRenderCount()
  useWatch({ control, name: `items.${index}.name` })
  useWatch({ control, name: `items.${index}.quantity` })
  return <RenderBadge count={renders} label="row" tone="hot" />
}

function WatchAllItems({ control }: { control: Control<Cart> }) {
  const items = useWatch({ control, name: 'items' })
  return <CodeReadout label="items (live)" value={items} placeholder="empty" />
}

function ItemsWatchBadge({ control }: { control: Control<Cart> }) {
  useWatch({ control, name: 'items' })
  const renders = useRenderCount()
  return <RenderBadge count={renders} label="renders" tone="hot" />
}

/**
 * Owns its own snapshot state so pressing the button only re-renders this
 * leaf — not the parent section or the sibling row badges.
 */
function GetValuesDisplay({ getValues }: { getValues: UseFormGetValues<Cart> }) {
  const [snapshot, setSnapshot] = useState<Item[] | null>(null)
  return (
    <>
      <CodeReadout
        label="last snapshot"
        value={snapshot}
        placeholder="press the button to capture"
      />
      <button
        type="button"
        className={`${styles.button} ${styles.buttonPrimary}`}
        style={{ marginTop: 12 }}
        onClick={() => setSnapshot(getValues('items').map((it) => ({ ...it })))}
      >
        Snapshot items
      </button>
    </>
  )
}
