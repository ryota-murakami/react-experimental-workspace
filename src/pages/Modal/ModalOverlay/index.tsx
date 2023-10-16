import React from 'react'

import type { closeModal, ModalState } from '../index'

import Modal from './Modal/index'
import Overlay from './Overlay'

interface Props {
  closeModal: closeModal
  isOpen: ModalState['isOpen']
}

const ModalOverlay: React.FC<Props> = ({ closeModal, isOpen }) => {
  return (
    <>
      <Modal isOpen={isOpen} closeModal={closeModal} />
      <Overlay isOpen={isOpen} closeModal={closeModal} />
    </>
  )
}

export default ModalOverlay
