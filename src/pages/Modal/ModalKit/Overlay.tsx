import React from 'react'
import styled from '@emotion/styled'
import { closeModal, ModalState } from '../index'

const OverlayStyledComponent = styled.div<{ isOpen: ModalState['isOpen'] }>`
  position: absolute;
  display: ${props => (props.isOpen ? 'block' : 'none')};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`

interface Props {
  isOpen: ModalState['isOpen']
  closeModal: closeModal
}

const Overlay: React.FC<Props> = ({ isOpen, closeModal }) => (
  <OverlayStyledComponent isOpen={isOpen} onClick={closeModal} />
)

export default Overlay
