import React, { Fragment, useState } from 'react'
import { Layout, Row } from './style'
import { Button } from '@material-ui/core'
import ModalKit from './ModalKit'

export interface ModalState {
  isOpen: boolean
}

const View: React.FC<{ openModal: openModal }> = ({ openModal }) => {
  return (
    <Layout>
      <Row>
        <h1>Modal</h1>
      </Row>
      <Row>
        <Button
          variant="contained"
          color="primary"
          onClick={openModal}
          data-cy="open-modal-button"
        >
          Open
        </Button>
      </Row>
    </Layout>
  )
}

type openModal = () => void
export type closeModal = () => void

const App: React.FC = () => {
  const [state, setState] = useState<ModalState>({ isOpen: false })

  const openModal: openModal = () => {
    setState(() => {
      return { isOpen: true }
    })
  }

  const closeModal: closeModal = () => {
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
