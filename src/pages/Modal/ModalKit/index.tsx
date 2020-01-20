import React from 'react'
import { ModalState } from '../index'
import Overlay from './Overlay'

interface Props {
  isOpen: ModalState['isOpen']
}

const ModalKit: React.FC<Props> = ({ isOpen }) => (
  <>
    <Overlay isOpen={isOpen} />
  </>
)

export default ModalKit
