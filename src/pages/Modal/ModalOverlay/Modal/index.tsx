import { Button } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

import type { closeModal, ModalState } from '../../index'

interface LayoutProps {
  isOpen: boolean
}

const Layout = styled.div<LayoutProps>(
  {
    backgroundColor: 'white',
    flexDirection: 'column',
    fontSize: 20,
    height: '360px',
    left: '50%',
    margin: 'auto 0',
    marginLeft: '-300px',
    marginTop: '-180px',
    position: 'absolute',
    top: '50%',
    width: '600px',
    zIndex: 3,
  },
  (props) => ({ display: props.isOpen ? 'flex' : 'none' }),
)

const Head = styled.div`
  width: 568px;
  height: 32px;
  padding: 16px;
  font-size: 24px;
  font-weight: 400;
`

const Content = styled.div`
  border-top: 1px solid darkgray;
  border-bottom: 1px solid darkgray;
  width: 568px;
  height: 292px;
  padding: 16px;
  overflow: scroll;
`

const Bottom = styled.div`
  width: 568px;
  height: 36px;
  padding: 8px;
  display: flex;
  justify-content: flex-end;
`

interface Props {
  closeModal: closeModal
  isOpen: ModalState['isOpen']
}

const Modal: React.FC<Props> = ({ closeModal, isOpen }) => {
  return (
    <Layout isOpen={isOpen} data-cy="modal">
      <Head>Modal</Head>
      <Content>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
        </p>
        <p>
          Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
          magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
          ullamcorper nulla non metus auctor fringilla.
        </p>
      </Content>
      <Bottom>
        <Button
          variant="contained"
          color="primary"
          onClick={closeModal}
          data-cy="modal-close-button"
        >
          Close
        </Button>
      </Bottom>
    </Layout>
  )
}

export default Modal
