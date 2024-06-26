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
const Modal = lazy(async () => import('./pages/Modal'))
const DnD = lazy(async () => import('./pages/DnD'))
const Tooltip = lazy(async () => import('./pages/Tooltip'))
const Search = lazy(async () => import('./pages/Search'))
const Use = lazy(async () => import('./pages/Use'))
const SuggestInput = lazy(async () => import('./pages/SuggestInput'))
const HtmlDaialog = lazy(async () => import('./pages/HtmlDaialog'))
const WindowOpen = lazy(async () => import('./pages/WindowOpen'))
const RefCompare = lazy(async () => import('./pages/RefCompare'))
const ImageUpload = lazy(async () => import('./pages/ImageUpload'))
const DateForm = lazy(async () => import('./pages/DateForm'))
const ArrayForm = lazy(async () => import('./pages/ArrayForm'))

const ContextMenu = lazy(async () => import('./pages/ContextMenu'))

const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <RouteList>
          <Route path="/" element={<Index />} />
          <Route path="/dnd" element={<DnD />} />
          <Route path="/form" element={<Form />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/context" element={<Context />} />
          <Route path="/modal" element={<Modal />} />
          <Route path="/selectbox" element={<SelectBox />} />
          <Route path="/tooltip" element={<Tooltip />} />
          <Route path="/search" element={<Search />} />
          <Route path="/use" element={<Use />} />
          <Route path="/suggestinput" element={<SuggestInput />} />
          <Route path="/htmldaialog" element={<HtmlDaialog />} />
          <Route path="/windowOpen" element={<WindowOpen />} />
          <Route path="/windowOpen/popup" element={<Popup />} />
          <Route path="/refcompare" element={<RefCompare />} />
          <Route path="/imageupload" element={<ImageUpload />} />
          <Route path="/dateform" element={<DateForm />} />
          <Route path="/arrayform" element={<ArrayForm />} />
          <Route path="/contextmenu" element={<ContextMenu />} />
          <Route path="*" element={<NotFound />} />
        </RouteList>
      </Suspense>
    </BrowserRouter>
  )
}

export default Routes
