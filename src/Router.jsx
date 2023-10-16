import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import { Loading } from './components/Loading'
import Index from './pages'
import NotFound from './pages/NotFound'
import SelectBox from './pages/SelectBox'

const Form = lazy(async () => import('./pages/Form'))
const Anime = lazy(async () => import('./pages/Anime'))
const Context = lazy(async () => import('./pages/Context'))
const Hooks = lazy(async () => import('./pages/Hooks'))
const UseReducer = lazy(async () => import('./pages/Hooks/UseReducer'))
const UseMemo = lazy(async () => import('./pages/Hooks/UseMemo'))
const UseEffect = lazy(async () => import('./pages/Hooks/UseEffect'))
const Modal = lazy(async () => import('./pages/Modal'))
const Recoil = lazy(async () => import('./pages/Recoil'))
const DnD = lazy(async () => import('./pages/DnD'))
const Tooltip = lazy(async () => import('./pages/Tooltip'))
const ForwardRef = lazy(async () => import('./pages/ForwardRef'))
const Search = lazy(async () => import('./pages/Search'))

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route exact path="/dnd" element={<DnD />} />
          <Route exact path="/recoil" element={<Recoil />} />
          <Route exact path="/form" element={<Form />} />
          <Route exact path="/anime" element={<Anime />} />
          <Route exact path="/context" element={<Context />} />
          <Route exact path="/hooks" element={<Hooks />} />
          <Route exact path="/hooks/usereducer" element={<UseReducer />} />
          <Route exact path="/hooks/usememo" element={<UseMemo />} />
          <Route exact path="/hooks/useeffect" element={<UseEffect />} />
          <Route exact path="/modal" element={<Modal />} />
          <Route exact path="/selectbox" element={<SelectBox />} />
          <Route exact path="/tooltip" element={<Tooltip />} />
          <Route exact path="/forwardRef" element={<ForwardRef />} />
          <Route exact path="/search" element={<Search />} />
          <Route element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
