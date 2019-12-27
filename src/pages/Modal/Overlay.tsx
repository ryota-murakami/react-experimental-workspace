import React from 'react'
import styled from '@emotion/styled'

const Screen = styled.div`
  position: absolute;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`

// @TODO should be close Modal when you click overlay
const Overlay: React.FC = () => {
  return <Screen />
}

export default Overlay
