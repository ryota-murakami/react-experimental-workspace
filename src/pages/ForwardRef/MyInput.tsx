import React, { forwardRef } from 'react'

interface MyInputProps {
  label: string
}

const MyInput = forwardRef<HTMLInputElement, MyInputProps>((props, ref) => {
  return (
    <label>
      {props.label}
      <input ref={ref} />
    </label>
  )
})

export default MyInput
