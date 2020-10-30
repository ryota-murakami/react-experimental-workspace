import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Loading } from './components/Loading'
import Index from './pages'
import NotFound from './pages/NotFound'
import SelectBox from './pages/SelectBox'

const Form = lazy(() => import('./pages/Form'))
const Anime = lazy(() => import('./pages/Anime'))
const Context = lazy(() => import('./pages/Context'))
const Hooks = lazy(() => import('./pages/Hooks'))
const UseReducer = lazy(() => import('./pages/Hooks/UseReducer'))
const UseMemo = lazy(() => import('./pages/Hooks/UseMemo'))
const Modal = lazy(() => import('./pages/Modal'))
const Recoil = lazy(() => import('./pages/Recoil'))
const DnD = lazy(() => import('./pages/DnD'))
const Tooltip = lazy(() => import('./pages/Tooltip'))
const Backend = lazy(() => import('./pages/Backend'))

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/dnd" component={DnD} />
          <Route exact path="/recoil" component={Recoil} />
          <Route exact path="/form" component={Form} />
          <Route exact path="/anime" component={Anime} />
          <Route exact path="/context" component={Context} />
          <Route exact path="/hooks" component={Hooks} />
          <Route exact path="/hooks/usereducer" component={UseReducer} />
          <Route exact path="/hooks/usememo" component={UseMemo} />
          <Route exact path="/modal" component={Modal} />
          <Route exact path="/selectbox" component={SelectBox} />
          <Route exact path="/tooltip" component={Tooltip} />
          <Route exact path="/backend" component={Backend} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
