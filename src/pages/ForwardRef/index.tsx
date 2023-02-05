import React, { useRef } from 'react'

import MyInput from './MyInput'
import { Layout, Row } from './style'

const ForwardRef = () => {
  const ref = useRef(null)
  console.log(ref.current)
  function handleClick() {
    // @ts-ignore
    ref.current.focus()
  }

  return (
    <Layout>
      <Row>
        <h1>ForwardRef</h1>
      </Row>
      <Row>
        <MyInput label={'MyInput'} ref={ref} />
        <button type="button" onClick={handleClick}>
          Edit
        </button>
      </Row>
    </Layout>
  )
}

export default ForwardRef
