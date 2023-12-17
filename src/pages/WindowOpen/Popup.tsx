import React, { memo, useState } from 'react'

interface Props {}

const Popup: React.FC<Props> = memo(() => {
  const [text, setText] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
    if (window.opener) {
      window.opener.postMessage(e.target.value, '*')
    }
  }

  return (
    <>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        className="border-4 border-black"
      />
    </>
  )
})

Popup.displayName = 'Popup'

export default Popup
