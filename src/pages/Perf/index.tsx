import React, { useState } from 'react'
import { Container, Row } from './style'
import FunctionComponent from './FunctionCompoment'
import Menu from './Menu'

const MemoFunctionComponent = React.memo(FunctionComponent)

interface State {
  number: number
  text: string
}

const Perf: React.FC = () => {
  const [state, setState] = useState<State>({ number: 0, text: 'hello' })

  function incrementNumber(): void {
    setState({ number: state.number + 1, ...state })
  }

  return (
    <Container>
      <Menu incrementNumber={incrementNumber} />
      <Row>
        <FunctionComponent />
      </Row>
      <Row>
        <MemoFunctionComponent />
      </Row>
    </Container>
  )
}

export default Perf
