import React from 'react'
import styled from '@emotion/styled'
import indigo from '@material-ui/core/colors/indigo'
import { Button } from '@material-ui/core'

const Container = styled.div`
  width: 100%;
  background-color: ${indigo[400]};
  display: flex;
  justify-content: flex-end;
`

interface Props {
  incrementNumber: () => void
}

const Menu: React.FC<Props> = ({ incrementNumber }) => {
  return (
    <Container>
      <Button variant="contained" color="primary" onClick={incrementNumber}>
        Increment
      </Button>
    </Container>
  )
}

export default Menu
