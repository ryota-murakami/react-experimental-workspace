import { useId } from 'react'

function setPrefix(id: string) {
  return function generateFormElementId(name: string) {
    return `${id}-${name}`
  }
}

export function useFormId() {
  const uniqueId = useId()
  return setPrefix(uniqueId)
}
