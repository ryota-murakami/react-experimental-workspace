import React from 'react'
import { closeModal, ModalState } from '../index'
import Overlay from './Overlay'
import Modal from './Modal/index'

interface Props {
  isOpen: ModalState['isOpen']
  closeModal: closeModal
}

const ModalKit: React.FC<Props> = ({ isOpen, closeModal }) => {
  return (
    <>
      <Modal isOpen={isOpen} closeModal={closeModal} />
      <Overlay isOpen={isOpen} closeModal={closeModal} />
    </>
  )
}

export default ModalKit
