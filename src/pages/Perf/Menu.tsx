import React from 'react'
import styled from '@emotion/styled'
import indigo from '@material-ui/core/colors/indigo'
import { Button } from '@material-ui/core'

const Container = styled.div`
  width: 100%;
  height: 80px;
  min-height: 80px;
  background-color: ${indigo[400]};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: -10px;
  margin-right: -10px;
  margin-left: -10px;
`

interface Props {
  incrementNumber: () => void
}

const Menu: React.FC<Props> = ({ incrementNumber }) => {
  return (
    <Container>
      <Button
        style={{ height: '40px', paddingLeft: '20px' }}
        variant="contained"
        color="primary"
        onClick={incrementNumber}
      >
        Increment
      </Button>
    </Container>
  )
}

export default React.memo(Menu)
