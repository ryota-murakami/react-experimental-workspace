import React, { memo, useContext } from 'react'
import styled from '@emotion/styled'
import StoreConext from './StoreContext'
import MyButton from './MyButton'

const Container = styled.div`
  margin: 30px;
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ViewChild = () => {
  const {
    store: { age },
    setStore
  } = useContext(StoreConext)
  return (
    <Container>
      <div style={{ marginBottom: 10 }}>Age: {age}</div>
      <MyButton onClick={() => setStore({ age: age + 1 })}>
        Inc Age From ViewChild
      </MyButton>
    </Container>
  )
}

export default memo(ViewChild)
