import React, { memo, useState } from 'react'

interface Props {}

const Popup: React.FC<Props> = memo(() => {
  const [text, setText] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value)
    if (window.opener) {
      // Popup is opened same-origin via window.open('/windowOpen/popup'), so pin the target to our own origin
      window.opener.postMessage(e.target.value, window.location.origin)
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
