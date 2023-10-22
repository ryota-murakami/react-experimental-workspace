import React from 'react'

import Header from '../../components/Header'
import { PageContainer } from '../../components/PageContainer'

interface Props {}

const DaisyUi: React.FC<Props> = () => {
  return (
    <PageContainer>
      <Header>
        <Header.H1>DaisyUi</Header.H1>
      </Header>
      <div className="w-full grid place-content-center"></div>
    </PageContainer>
  )
}

export default DaisyUi
