import React, { Fragment } from 'react'
import { MyContext } from './index'
import { css } from 'emotion'

const layout = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

function View() {
  return (
    <div className={layout}>
      <MyContext.Consumer>
        {context => (
          <Fragment>
            <h1>count: {context.count}</h1>
            <button onClick={context.increment}>increment</button>
          </Fragment>
        )}
      </MyContext.Consumer>
    </div>
  )
}

export default View
