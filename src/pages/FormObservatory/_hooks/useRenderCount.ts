import { useRef } from 'react'

/**
 * Counts how many times the calling component has rendered.
 *
 * Increments a ref inside the render body — the only place where you can
 * observe render count WITHOUT scheduling another render. `useEffect` runs
 * AFTER commit, so it can't tell you the real count during render.
 *
 * @param onIncrement - Optional side-effect (e.g., increment a global counter)
 *                      called once per render. Must be a stable reference —
 *                      closures are read at call-time.
 * @returns The current render count (1 on the first render)
 * @example
 * function Panel() {
 *   const renders = useRenderCount(incrementGlobal)
 *   return <RenderBadge count={renders} />
 * }
 *
 * @remarks
 * Accuracy depends on React Strict Mode being OFF. This project does not
 * enable Strict Mode (see `src/main.tsx`), so this counter reports real
 * browser renders 1:1. Under Strict Mode, the counter would double in dev.
 */
export function useRenderCount(onIncrement?: () => void): number {
  const ref = useRef(0)
  ref.current += 1
  onIncrement?.()
  return ref.current
}
