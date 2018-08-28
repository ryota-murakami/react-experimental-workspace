// @flow
import React from 'react'
import styled from 'styled-components'

const GrowBox = styled.div`
  width: 100px;
  height: 10px;
  border-radius: 5px;
  border: chocolate 2px solid;

  &:hover {
    height: 200px;
  }

  transition: height 1s;
`

export const Grow = () => {
  return <GrowBox />
}
