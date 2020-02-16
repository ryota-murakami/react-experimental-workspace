import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  height: 100%;
  width: 200px;
  display: flex;
  justify-content: center;
  overflow-wrap: break-word;
  border: 1px solid;
  border-radius: 10px;
`

const FunctionalComponent: React.FC = () => {
  console.log('rendered: FunctionalComponent')
  return (
    <Container>
      <p>Functional Component</p>
    </Container>
  )
}

export default FunctionalComponent
