import { Button } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

import type { closeModal, ModalState } from '../../index'

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
    flexDirection: 'column',
  },
  (props) => ({ display: props.isOpen ? 'flex' : 'none' })
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
  isOpen: ModalState['isOpen']
  closeModal: closeModal
}

const Modal: React.FC<Props> = ({ isOpen, closeModal }) => {
  return (
    <Layout isOpen={isOpen} data-cy="modal">
      <Head>Modal</Head>
      <Content>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus
          vel augue laoreet rutrum faucibus dolor auctor.
        </p>
        <p>
          Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
          scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
          auctor fringilla.
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
