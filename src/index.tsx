import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import Router from './Router'
import './index.css'

ReactDOM.render(
  <StrictMode>
    <Router />
  </StrictMode>,
  document.getElementById('root')
)
