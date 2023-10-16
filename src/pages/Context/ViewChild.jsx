import { memo, useContext } from 'react'
import styled from 'styled-components'

import MyButton from './MyButton'
import StoreConext from './StoreContext'

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
    setStore,
    store: { age },
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
