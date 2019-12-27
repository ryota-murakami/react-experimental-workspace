import React from 'react'
import { Layout, Row } from './style'
import { Button } from '@material-ui/core'

const Modal: React.FC = () => {
  return (
    <Layout>
      <Row>
        <h1>Modal</h1>
      </Row>
      <Row>
        <Button variant="contained" color="primary">
          Open
        </Button>
      </Row>
    </Layout>
  )
}

export default Modal
