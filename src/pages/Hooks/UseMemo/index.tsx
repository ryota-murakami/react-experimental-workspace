import React, { useReducer } from 'react'
import styled from '@emotion/styled'
import Button from '@material-ui/core/Button'

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const Layout = styled.div`
  margin: 0 auto;
  width: 80%;
  height: 100%;
  display: flex;
  font-size: 36px;
  font-weight: bold;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    text-align: center;
  }

  & > * {
    width: 100%;
  }
`

const initialState = { count: 0 }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (state: { count: number }, action: { type: any }) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      throw new Error()
  }
}

export default function UseReducer() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Container>
      <Layout>
        <h1>UseMemo</h1>
        <h1>Count: {state.count}</h1>
        <Button
          style={{ textAlign: 'center' }}
          variant="contained"
          size="large"
          color="default"
          onClick={() => dispatch({ type: 'increment' })}
        >
          +
        </Button>
        <Button
          style={{ textAlign: 'center' }}
          variant="contained"
          size="large"
          color="secondary"
          onClick={() => dispatch({ type: 'decrement' })}
        >
          -
        </Button>
      </Layout>
    </Container>
  )
}
