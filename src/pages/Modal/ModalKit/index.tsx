import React from 'react'
import { closeModal, ModalState } from '../index'
import Overlay from './Overlay'

interface Props {
  isOpen: ModalState['isOpen']
  closeModal: closeModal
}

const ModalKit: React.FC<Props> = ({ isOpen, closeModal }) => {
  return (
    <>
      <Overlay isOpen={isOpen} colseModal={closeModal} />
    </>
  )
}

export default ModalKit
