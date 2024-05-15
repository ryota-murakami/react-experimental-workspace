import React from 'react'

import Header from '../../components/Header'
import { Page } from '../../components/Page'

interface Props {}

const ContextMenu: React.FC<Props> = () => {
  return (
    <Page.Container>
      <Header>
        <Header.H1>ContextMenu</Header.H1>
      </Header>
      <div className="w-full grid place-content-center"></div>
    </Page.Container>
  )
}

export default ContextMenu
