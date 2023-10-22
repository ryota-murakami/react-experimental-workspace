import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import { Loading } from './components/Loading'
import Index from './pages'
import NotFound from './pages/NotFound'

const SelectBox = lazy(async () => import('./pages/SelectBox'))
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
const Use = lazy(async () => import('./pages/Use'))

const DaisyUi = lazy(async () => import('./pages/DaisyUi'))

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dnd" element={<DnD />} />
          <Route path="/recoil" element={<Recoil />} />
          <Route path="/form" element={<Form />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/context" element={<Context />} />
          <Route path="/hooks" element={<Hooks />} />
          <Route path="/hooks/usereducer" element={<UseReducer />} />
          <Route path="/hooks/usememo" element={<UseMemo />} />
          <Route path="/hooks/useeffect" element={<UseEffect />} />
          <Route path="/modal" element={<Modal />} />
          <Route path="/selectbox" element={<SelectBox />} />
          <Route path="/tooltip" element={<Tooltip />} />
          <Route path="/forwardRef" element={<ForwardRef />} />
          <Route path="/search" element={<Search />} />
          <Route path="/use" element={<Use />} />
          <Route path="/daisyui" element={<DaisyUi />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
