import React from 'react'
import { ToastContainer } from 'react-toastify'

import Header from '@/components/Header'
import { Page } from '@/components/Page'

import 'react-toastify/dist/ReactToastify.css'
import Main from './Main'
import SelfStateChange from './SelfStateChange'
interface Props {}

const ReRender_1: React.FC<Props> = () => {
  return (
    <Page.Container>
      <Header>
        <Header.H1>ReRender_1</Header.H1>
      </Header>
      <Main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <SelfStateChange />
        <SelfStateChange />
        <SelfStateChange />
        <SelfStateChange />
        <SelfStateChange />
        <SelfStateChange />
        <SelfStateChange />
      </Main>
      <ToastContainer />
    </Page.Container>
  )
}

export default ReRender_1
