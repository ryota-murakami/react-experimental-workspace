import React from 'react'
import styled from '@emotion/styled'
import { closeModal, ModalState } from '../index'

interface StyledProps {
  isOpen: ModalState['isOpen']
}

const Styled = styled.div<StyledProps>`
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
  <Styled isOpen={isOpen} onClick={closeModal} data-cy="overlay" />
)

export default Overlay
