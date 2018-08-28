// @flow
import React, { Fragment } from 'react'
import Loadable from 'react-loadable'
import { Loading } from './shared/Loading'
import { BrowserRouter, Route } from 'react-router-dom'

/* prettier-ignore */
const App = Loadable({ loader: () => import('./pages/App'/* webpackChunkName: "App" */), loading: Loading })
/* prettier-ignore */
const Todo = Loadable({
  loader: () => import('./pages/Todo'/* webpackChunkName: "Todo" */),
  loading: Loading
})
/* prettier-ignore */
const Rerender = Loadable({
  loader: () => import('./pages/Rerender'/* webpackChunkName: "Rerender" */),
  loading: Loading
})
/* prettier-ignore */
const Form = Loadable({
  loader: () => import('./pages/Form'/* webpackChunkName: "Form" */),
  loading: Loading
})
/* prettier-ignore */
const Anime = Loadable({
  loader: () => import('./pages/Anime'/* webpackChunkName: "Anime" */),
  loading: Loading
})

const Routes = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Route exact path="/" component={App} />
        <Route exact path="/todo" component={Todo} />
        <Route exact path="/rerender" component={Rerender} />
        <Route exact path="/form" component={Form} />
        <Route exact path="/anime" component={Anime} />
      </Fragment>
    </BrowserRouter>
  )
}

export default Routes
