import Button from '@material-ui/core/Button'
import { useReducer, memo, useCallback, useMemo } from 'react'
import styled from 'styled-components'

const Container = ({ numArray, children }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      dispaly: 'flex',
      justifyContent: 'center',
      backgroundColor: numArray[5] === 6 ? 'white' : 'black',
    }}
  >
    {children}
  </div>
)

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
Layout.displayName = 'Layout'

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
    <Button variant="contained" size="large" color="default" onClick={props.onClick}>
      +
    </Button>
  )
})
PlusButton.displayName = 'PlusButton'

export default function UseReducer() {
  const [state, dispatchOrg] = useReducer(reducer, initialState)
  const dispatch = useMemo(() => dispatchOrg, [])
  const increase = useCallback(() => dispatch({ type: 'increment' }), [dispatch])

  let [a, b, c, d, e, f] = [1, 2, 3, 4, 5, 6]
  if (state.count % 2 === 0) f = 7
  const numArray = useMemo(() => [a, b, c, d, e, f], [a, b, c, d, e, f])

  return (
    <Container numArray={numArray}>
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
