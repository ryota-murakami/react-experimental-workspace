import React from 'react'

import meatIcon from './meat.svg'

interface Props {
  // eslint-disable-next-line no-unused-vars
  onDragStart: (e: React.DragEvent) => void
}

const Icon: React.FC<Props> = ({ onDragStart }) => (
  <img
    draggable
    onDragStart={(e: React.DragEvent) => onDragStart(e)}
    src={meatIcon}
    width={150}
    height={150}
    alt="meatIcon"
  />
)

export default Icon
