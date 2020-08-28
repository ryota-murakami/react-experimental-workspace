import React from 'react'
import { Layout } from './index.style'

interface Props {
  isDrop: boolean
  massage: string
}

const DropZone: React.FC<Props & React.AllHTMLAttributes<HTMLDivElement>> = ({
  isDrop,
  massage,
}) => {
  return (
    <Layout>
      <div>{massage}</div>
    </Layout>
  )
}

export default DropZone
