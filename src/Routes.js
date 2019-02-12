import React, { Suspense, lazy } from 'react'
import { Loading } from './components/Loading'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={lazy(() => import('./pages'))} />
          <Route
            exact
            path="/todo"
            component={lazy(() => import('./pages/Todo'))}
          />
          <Route
            exact
            path="/form"
            component={lazy(() => import('./pages/Form'))}
          />
          <Route
            exact
            path="/anime"
            component={lazy(() => import('./pages/Anime'))}
          />
          <Route
            exact
            path="/context"
            component={lazy(() => import('./pages/Context'))}
          />
          <Route
            exact
            path="/hooks"
            component={lazy(() => import('./pages/Hooks'))}
          />
          <Route
            exact
            path="/hooks/usereducer"
            component={lazy(() => import('./pages/Hooks/UseReducer'))}
          />
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
