import React from 'react'

import Header from '../../components/Header'
import { Page } from '../../components/Page'

interface Props {}

const ReRender_1: React.FC<Props> = () => {
  return (
    <Page.Container>
      <Header>
        <Header.H1>ReRender_1</Header.H1>
      </Header>
      <div className="w-full grid place-content-center"></div>
    </Page.Container>
  )
}

export default ReRender_1
