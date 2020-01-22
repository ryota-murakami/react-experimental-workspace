/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { Button } from '@material-ui/core'
import { closeModal, ModalState } from '../../index'

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
    padding: '32px',
    flexDrection: 'colmun'
  },
  props => ({ display: props.isOpen ? 'flex' : 'none' })
)

const Head = styled.div``

const Content = styled.div``

const Bottom = styled.div``

interface Props {
  isOpen: ModalState['isOpen']
  closeModal: closeModal
}

const Modal: React.FC<Props> = ({ isOpen, closeModal }) => {
  return (
    <Layout isOpen={isOpen}>
      <Head>Modal</Head>
      <Content>I'm content.</Content>
      <Bottom>
        <Button
          variant="contained"
          color="primary"
          onClick={closeModal}
        ></Button>
        Close
      </Bottom>
    </Layout>
  )
}

export default Modal
