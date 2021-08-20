import React, { Fragment, useState } from 'react'

import ModalOverlay from './ModalOverlay'
import { WebPage } from './WebPage'

export interface ModalState {
  isOpen: boolean
}

export type openModal = () => void
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
      <ModalOverlay isOpen={state.isOpen} closeModal={closeModal} />
      <WebPage openModal={openModal} />
    </Fragment>
  )
}

export default App
