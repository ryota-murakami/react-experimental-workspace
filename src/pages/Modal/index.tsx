import React, { Fragment, useState } from 'react'
import { Layout, Row } from './style'
import { Button } from '@material-ui/core'
import ModalKit from './ModalKit'

export interface ModalState {
  isOpen: boolean
}

// @TODO give certainly type to any
const View: React.FC<{ openModal: any }> = ({ openModal }) => {
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

const App: React.FC = () => {
  const [state, setState] = useState<ModalState>({ isOpen: false })

  function openModal(): void {
    setState(() => {
      return { isOpen: true }
    })
  }

  function closeModal(): void {
    setState(() => {
      return { isOpen: false }
    })
  }

  return (
    <Fragment>
      <ModalKit isOpen={state.isOpen} closeModal={closeModal} />
      <View openModal={openModal} />
    </Fragment>
  )
}

export default App
