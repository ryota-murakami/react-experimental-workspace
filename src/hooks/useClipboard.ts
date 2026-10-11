/* Copy from https://github.com/modulz/stitches-site/blob/master/utils/useClipboard.ts */
import copy from 'copy-to-clipboard'
import { useState, useCallback, useEffect } from 'react'

import { DEFAULT_CLIPBOARD_RESET_TIMEOUT_MS } from './constants'

interface UseClipboardResult {
  hasCopied: boolean
  onCopy: () => void
  value: string
}

/**
 * Tracks clipboard copy state for buttons that call onCopy after a user click.
 * @param text - The text or value to copy.
 * @param timeout - Delay in ms before copied state resets.
 * @returns
 * - hasCopied: true while the copy feedback should be visible
 * - onCopy: starts the clipboard write and updates feedback state
 * - value: the text currently wired to the hook
 * @example
 * const { hasCopied, onCopy } = useClipboard('https://laststance.io')
 */
export function useClipboard(
  text: string,
  timeout = DEFAULT_CLIPBOARD_RESET_TIMEOUT_MS
): UseClipboardResult {
  const [hasCopied, setHasCopied] = useState(false)

  const onCopy = useCallback(() => {
    // Copy runs after a click; keep the handler void while the async API reports success.
    void copy(text)
      .then((didCopy) => {
        setHasCopied(didCopy)
      })
      .catch(() => {
        setHasCopied(false)
      })
  }, [text])

  useEffect(() => {
    if (hasCopied) {
      const id = setTimeout(() => {
        setHasCopied(false)
      }, timeout)

      return (): void => clearTimeout(id)
    }
  }, [timeout, hasCopied])

  return { hasCopied, onCopy, value: text }
}
