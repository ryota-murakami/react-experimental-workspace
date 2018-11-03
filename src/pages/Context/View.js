import React, { Fragment } from 'react'
import { MyContext } from './index'
import { css } from 'emotion'

const layout = css`
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 36px;
  font-weight: bold;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const buttonStyle = css`
  height: 70px;
  width: 150px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;

  &:focus {
    outline: 0;
  }

  &:active {
    box-shadow: inset -2px -2px 3px rgba(255, 255, 255, 0.6),
      inset 2px 2px 3px rgba(0, 0, 0, 0.6);
  }
`

function View() {
  return (
    <div className={layout}>
      <MyContext.Consumer>
        {context => (
          <Fragment>
            <h1>count: {context.count}</h1>
            <button className={buttonStyle} onClick={context.increment}>
              increment
            </button>
          </Fragment>
        )}
      </MyContext.Consumer>
    </div>
  )
}

export default View
