import React from 'react'

import Header from '@/components/Header'
import { Page } from '@/components/Page'

interface Props {}

const UseOptimistic: React.FC<Props> = () => {
  return (
  <Page.Container>
    <Header>
      <Header.H1>UseOptimistic</Header.H1>
    </Header>
    <div className="w-full grid place-content-center"></div>
  </Page.Container>
  )
}

export default UseOptimistic
