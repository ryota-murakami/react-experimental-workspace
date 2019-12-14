/** @jsx jsx */
import { useReducer } from 'react'
import { css, jsx } from '@emotion/core' /* eslint-disable-line */
import Button from '@material-ui/core/Button'

const container = css`
  width: 100%;
  height: 100%;
`

const layout = css`
  margin: 0 auto;
  width: 80%;
  height: 100%;
  display: flex;
  font-size: 36px;
  font-weight: bold;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > * {
    width: 100%;
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

export default function UseReducer() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div css={container}>
      <div css={layout}>
        <h1
          css={css`
            text-align: center;
          `}
        >
          UseReducer
        </h1>
        <h1
          css={css`
            text-align: center;
          `}
        >
          Count: {state.count}
        </h1>
        <div
          css={css`
            display: flex;
            justify-content: center;
          `}
        >
          <Button
            css={css`
              text-align: center;
            `}
            variant="contained"
            size="large"
            color="default"
            onClick={() => dispatch({ type: 'increment' })}
          >
            +
          </Button>
          <div
            css={css`
              margin-left: 30px;
              text-align: center;
            `}
          >
            <Button
              css={css`
                text-align: center;
              `}
              variant="contained"
              size="large"
              color="secondary"
              onClick={() => dispatch({ type: 'decrement' })}
            >
              -
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
