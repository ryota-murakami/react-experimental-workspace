import React, { Suspense, lazy } from 'react'
import { Loading } from './components/Loading'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const Index = lazy(() => import('./pages'))
const Todo = lazy(() => import('./pages/Todo'))
const Form = lazy(() => import('./pages/Form'))
const Anime = lazy(() => import('./pages/Anime'))
const Context = lazy(() => import('./pages/Context'))

const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/todo" component={Todo} />
          <Route exact path="/form" component={Form} />
          <Route exact path="/anime" component={Anime} />
          <Route exact path="/context" component={Context} />
          <Route
            component={() => (
              <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} /* eslint-disable-line prettier/prettier */>
                <h1>404 Not Found</h1>
              </div>
            )}
          />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default Routes
