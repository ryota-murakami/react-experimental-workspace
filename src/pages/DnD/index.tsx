import React from 'react'
import { Layout, Container } from './index.style'
import meatIcon from './meat.svg'
import DropZone from './DropZone'

const DnD = () => {
  return (
    <Layout>
      <Container>
        <h1>drag and drop</h1>
        <main>
          <DropZone>Drop Here!</DropZone>
          <img
            draggable
            src={meatIcon}
            width={150}
            height={150}
            alt="meatIcon"
          />
        </main>
      </Container>
    </Layout>
  )
}

export default DnD
