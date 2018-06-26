// @flow
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import './index.css'
import Todo from './pages/Todo'
import Rerender from './pages/Rerender'
import registerServiceWorker from './registerServiceWorker'
import { reducer } from './reducer'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <Route exact path="/todo" component={Todo} />
        <Route exact path="/rerender" component={Rerender} />
      </Fragment>
    </BrowserRouter>
  </Provider>,
  // $FlowIssue
  document.getElementById('root')
)
registerServiceWorker()
