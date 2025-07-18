import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { Toaster } from 'sonner'
import './global.css'

import Popup from '@/pages/WindowOpen/Popup'

import { Loading } from './components/Loading'
import Index from './pages'
import NotFound from './pages/NotFound'

const Form = lazy(async () => import('./pages/Form'))
const Anime = lazy(async () => import('./pages/Anime'))
const Context = lazy(async () => import('./pages/Context'))
const Modal = lazy(async () => import('./pages/Modal'))
const DnD = lazy(async () => import('./pages/DnD'))
const Search = lazy(async () => import('./pages/Search'))
const WindowOpen = lazy(async () => import('./pages/WindowOpen'))
const RefCompare = lazy(async () => import('./pages/RefCompare'))
const ImageUpload = lazy(async () => import('./pages/ImageUpload'))
const DateForm = lazy(async () => import('./pages/DateForm'))
const ArrayForm = lazy(async () => import('./pages/ArrayForm'))
const ContextMenu = lazy(async () => import('./pages/ContextMenu'))
const MultiFileUpload = lazy(async () => import('./pages/MultiFileUpload'))

const Sandbox = lazy(async () => import('./pages/Sandbox'))

const TailwindLineClamp = lazy(async () => import('./pages/TailwindLineClamp'))

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dnd" element={<DnD />} />
          <Route path="/form" element={<Form />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/context" element={<Context />} />
          <Route path="/modal" element={<Modal />} />
          <Route path="/search" element={<Search />} />
          <Route path="/windowOpen" element={<WindowOpen />} />
          <Route path="/windowOpen/popup" element={<Popup />} />
          <Route path="/refcompare" element={<RefCompare />} />
          <Route path="/imageupload" element={<ImageUpload />} />
          <Route path="/dateform" element={<DateForm />} />
          <Route path="/arrayform" element={<ArrayForm />} />
          <Route path="/contextmenu" element={<ContextMenu />} />
          <Route path="/multi-file-upload" element={<MultiFileUpload />} />
          <Route path="/sandbox" element={<Sandbox />} />
          <Route path="/tailwindlineclamp" element={<TailwindLineClamp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
    </BrowserRouter>
  )
}

export default AppRoutes
