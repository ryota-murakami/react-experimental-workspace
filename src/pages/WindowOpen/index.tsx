import React from 'react'

import Header from '../../components/Header'
import { Page } from '../../components/Page'

interface Props {}

const WindowOpen: React.FC<Props> = () => {
  return (
  <Page.Container>
    <Header>
      <Header.H1>WindowOpen</Header.H1>
    </Header>
    <div className="w-full grid place-content-center"></div>
  </Page.Container>
  )
}

export default WindowOpen
