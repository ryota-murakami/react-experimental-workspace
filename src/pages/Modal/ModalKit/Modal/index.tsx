/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { ModalState } from '../../index'
// @TODO show Modal itself that contain contents, close Button

interface LayoutProps {
  isOpen: boolean
}

const Layout = styled.div<LayoutProps>(
  {
    zIndex: 3,
    width: '600px',
    height: '360px',
    backgroundColor: 'white',
    margin: 'auto 0',
    fontSize: 20,
    position: 'absolute',
    left: '50%',
    marginLeft: '-300px',
    top: '50%',
    marginTop: '-180px',
    padding: '32px'
  },
  props => ({ display: props.isOpen ? 'block' : 'none' })
)

interface Props {
  isOpen: ModalState['isOpen']
}

const Modal: React.FC<Props> = ({ isOpen }) => {
  return <Layout isOpen={isOpen}>Modal</Layout>
}

export default Modal
