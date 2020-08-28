import React from 'react'
import { Layout } from './style'
import Icon from '../Icon'

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
      {isDrop ? <Icon /> : null}
      <div>{massage}</div>
    </Layout>
  )
}

export default DropZone
