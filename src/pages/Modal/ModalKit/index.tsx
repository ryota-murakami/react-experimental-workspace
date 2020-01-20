import React from 'react'
import { ModalState } from '../index'
import Overlay from './Overlay'

interface Props {
  isOpen: ModalState['isOpen']
  // @TODO give certainly type to any
  closeModal: any
}

const ModalKit: React.FC<Props> = ({ isOpen, closeModal }) => {
  return (
    <>
      <Overlay isOpen={isOpen} colseModal={closeModal} />
    </>
  )
}

export default ModalKit
