/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import { ModalState } from '../../index'
// @TODO show Modal itself that contain contents, close Button

interface Props {
  isOpen: ModalState['isOpen']
}

const Modal: React.FC<Props> = ({ isOpen }) => {
  const visibility = isOpen ? 'block' : 'none'

  return (
    <div
      css={{
        zIndex: 3,
        width: '200px',
        height: '200px',
        backgroundColor: 'white',
        margin: 'auto 0',
        fontSize: 20,
        display: visibility,
        position: 'absolute',
        left: '50%',
        marginLeft: '-100px',
        top: '50%',
        marginTop: '-100px'
      }}
    >
      Modal
    </div>
  )
}

export default Modal
