import React from 'react'

import type { closeModal, ModalState } from '../index'

import Modal from './Modal/index'
import Overlay from './Overlay'

interface Props {
  isOpen: ModalState['isOpen']
  closeModal: closeModal
}

const ModalOverlay: React.FC<Props> = ({ isOpen, closeModal }) => {
  return (
    <>
      <Modal isOpen={isOpen} closeModal={closeModal} />
      <Overlay isOpen={isOpen} closeModal={closeModal} />
    </>
  )
}

export default ModalOverlay
