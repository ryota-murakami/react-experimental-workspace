import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import Router from './Router'
import './index.css'

import produce from 'immer'

const baseState = [
  {
    todo: 'Learn typescript',
    done: true,
  },
  {
    todo: 'Try immer',
    done: false,
  },
]

// eslint-disable-next-line no-unused-vars
const nextState = produce(baseState, (draftState) => {
  // @ts-ignore
  draftState[0].todo = '34 string'
  // @ts-ignore
  draftState.push({ todo: 'Tweet about it' })
  draftState[1].done = true
})

ReactDOM.render(
  <StrictMode>
    <Router />
  </StrictMode>,
  document.getElementById('root')
)
