import { Button } from '@mui/material'
import React from 'react'

import { Layout, Row } from './style'

import type { openModal } from './index'

interface Props {
  openModal: openModal
}

export const WebPage: React.FC<Props> = ({ openModal }) => {
  return (
    <Layout>
      <Row>
        <h1>Modal</h1>
      </Row>
      <Row>
        <Button
          variant="contained"
          color="primary"
          onClick={openModal}
          data-cy="open-modal-button"
        >
          Open
        </Button>
      </Row>
    </Layout>
  )
}
