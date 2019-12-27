import React from 'react'
import { Layout, Row } from './style'
import { Button } from '@material-ui/core'

const Modal: React.FC = () => {
  function openModal(): void {
    // @TODO show layer under the modal that would be cover whole screen
    // @TODO should be close Modal when you click overlayscreencover
    // @TODO show Modal itself that contain contents, close Button
  }

  return (
    <Layout>
      <Row>
        <h1>Modal</h1>
      </Row>
      <Row>
        <Button variant="contained" color="primary" onClick={openModal}>
          Open
        </Button>
      </Row>
    </Layout>
  )
}

export default Modal
