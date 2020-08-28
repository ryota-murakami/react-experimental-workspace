import React from 'react'
import { Layout } from './style'
import Icon from '../Icon'

interface Props {
  isDrop: boolean
  massage: string
  onDragStart: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void
}

const DropZone: React.FC<Props & React.AllHTMLAttributes<HTMLDivElement>> = ({
  isDrop,
  massage,
  onDragStart,
  onDrop,
}) => {
  return (
    <Layout onDrop={(e: React.DragEvent<HTMLDivElement>) => onDrop(e)}>
      {isDrop ? <Icon onDragStart={onDragStart} /> : null}
      <div>{massage}</div>
    </Layout>
  )
}

export default DropZone
