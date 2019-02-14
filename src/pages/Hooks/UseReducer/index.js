/** @jsx jsx */
import { useReducer } from 'react'
import { css, jsx } from '@emotion/core' /* eslint-disable-line */

const container = css`
  width: 100%;
  height: 100%;
`

const layout = css`
  margin: 0 auto;
  display: flex;
  font-size: 36px;
  font-weight: bold;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const initialState = { count: 0 }

const reducer = (state, action) => {
  console.log(action)
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
    <div css={container}>
      <div css={layout}>
        <h1>UseReducer</h1>
        <div>
          <h1>Count: {state.count}</h1>
          <button onClick={() => dispatch({ type: 'increment' })}>+</button>
          <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        </div>
      </div>
    </div>
  )
}
