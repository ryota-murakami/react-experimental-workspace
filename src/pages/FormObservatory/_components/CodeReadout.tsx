import styles from '../styles.module.css'

interface Props {
  label?: string
  value: unknown
  placeholder?: string
}

/**
 * Monospace JSON-ish readout for displaying form values, snapshots, and subscribed state.
 * Renders `value` with JSON.stringify when it's an object, or as a plain string otherwise.
 * Falls back to `placeholder` (muted italic) when value is null/undefined/empty string.
 *
 * @param label - Optional uppercase label above the readout
 * @param value - The value to display (primitives, objects, arrays all supported)
 * @param placeholder - Text to show when value is empty (default: "(empty)")
 * @example
 * <CodeReadout label="snapshot" value={form.getValues()} />
 * <CodeReadout label="watched" value={watch('address')} />
 */
export function CodeReadout({ label, value, placeholder = '(empty)' }: Props) {
  const isEmpty =
    value === null ||
    value === undefined ||
    value === '' ||
    (Array.isArray(value) && value.length === 0)

  const display =
    typeof value === 'string'
      ? value
      : typeof value === 'number' || typeof value === 'boolean'
        ? String(value)
        : JSON.stringify(value, null, 2)

  return (
    <div>
      {label ? <span className={styles.readoutLabel}>{label}</span> : null}
      <pre className={styles.readout}>
        {isEmpty ? <span className={styles.readoutPlaceholder}>{placeholder}</span> : display}
      </pre>
    </div>
  )
}
