import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes as RouteList, Route } from 'react-router-dom'
import './global.css'

import Popup from '@/pages/WindowOpen/Popup'

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
const Figma = lazy(async () => import('./pages/Figma'))
const SuggestInput = lazy(async () => import('./pages/SuggestInput'))
const HtmlDaialog = lazy(async () => import('./pages/HtmlDaialog'))
const WindowOpen = lazy(async () => import('./pages/WindowOpen'))
const RefCompare = lazy(async () => import('./pages/RefCompare'))

const ReRender_1 = lazy(async () => import('./pages/ReRender_1'))

const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <RouteList>
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
          <Route path="/figma" element={<Figma />} />
          <Route path="/suggestinput" element={<SuggestInput />} />
          <Route path="/htmldaialog" element={<HtmlDaialog />} />
          <Route path="/windowOpen" element={<WindowOpen />} />
          <Route path="/windowOpen/popup" element={<Popup />} />
          <Route path="/refcompare" element={<RefCompare />} />
          <Route path="/re-render-1" element={<ReRender_1 />} />
          <Route path="*" element={<NotFound />} />
        </RouteList>
      </Suspense>
    </BrowserRouter>
  )
}

export default Routes
