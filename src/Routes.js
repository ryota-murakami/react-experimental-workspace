import React, { Suspense, lazy } from 'react'
import { Loading } from './shared/Loading'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const Index = lazy(() => import('./pages/Index'))
const Todo = lazy(() => import('./pages/Todo'))
const Form = lazy(() => import('./pages/Form'))
const Anime = lazy(() => import('./pages/Anime'))

const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/todo" component={Todo} />
          <Route exact path="/form" component={Form} />
          <Route exact path="/anime" component={Anime} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default Routes
