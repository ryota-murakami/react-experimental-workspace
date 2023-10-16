import React from 'react'

import Icon from '../Icon'

import { Layout } from './style'

interface Props {
  isDrop: boolean
  massage: string

  onDragEnter: (e: React.DragEvent) => void

  onDragOver: (e: React.DragEvent) => void

  onDragStart: (e: React.DragEvent) => void

  onDrop: (e: React.DragEvent<HTMLDivElement>) => void
}

const DropZone: React.FC<Props & React.AllHTMLAttributes<HTMLDivElement>> = ({
  isDrop,
  massage,
  onDragEnter,
  onDragOver,
  onDragStart,
  onDrop,
}) => {
  return (
    <Layout onDrop={onDrop} onDragEnter={onDragEnter} onDragOver={onDragOver}>
      {isDrop ? <Icon onDragStart={onDragStart} /> : null}
      <div>{massage}</div>
    </Layout>
  )
}

export default DropZone
