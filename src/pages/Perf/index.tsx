import React from 'react'
import { Container, Row } from './style'
import FunctionalComponent from './FunctionCompoment'

const Perf: React.FC = () => {
  return (
    <Container>
      <Row>
        <FunctionalComponent />
      </Row>
      <Row style={{ marginTop: '10px' }}>
        <FunctionalComponent />
      </Row>
    </Container>
  )
}

export default Perf
