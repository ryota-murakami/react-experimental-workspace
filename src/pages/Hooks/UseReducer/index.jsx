import Button from '@mui/material/Button'
import { useReducer, memo, useCallback, useMemo } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100%;
  dispaly: flex;
  justify-content: center;
`

const Layout = styled.div`
  height: 100%;
  display: flex;
  font-size: 36px;
  font-weight: bold;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .btn-layout {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
`

const initialState = { count: 0 }

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      throw new Error()
  }
}

const PlusButton = memo((props) => {
  return (
    <Button
      variant="contained"
      size="large"
      color="default"
      onClick={props.onClick}
    >
      +
    </Button>
  )
})

export default function UseReducer() {
  const [state, dispatchOrg] = useReducer(reducer, initialState)
  const dispatch = useMemo(() => dispatchOrg, [])
  const increase = useCallback(() => {
    return () => dispatch({ type: 'increment' })
  }, [dispatch])

  return (
    <Container>
      <Layout>
        <h1>UseReducer</h1>
        <h1>Count: {state.count}</h1>
        <div className="btn-layout">
          <PlusButton onClick={increase} />

          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={() => dispatch({ type: 'decrement' })}
          >
            -
          </Button>
        </div>
      </Layout>
    </Container>
  )
}
