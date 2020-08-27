import React from 'react'
import { Layout } from './index.style'

const DropZone: React.FC = ({ children, ...rest }) => {
  return <Layout {...rest}>{children}</Layout>
}

export default DropZone
