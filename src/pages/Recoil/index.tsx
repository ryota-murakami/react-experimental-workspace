import React from 'react'
import { RecoilRoot } from 'recoil'

import Counter from './Counter'
import { Layout, Container } from './index.style'

const RecoilPage: React.FC = () => {
  return (
    <RecoilRoot>
      <Layout>
        <Container>
          <Counter />
        </Container>
      </Layout>
    </RecoilRoot>
  )
}

export default RecoilPage
