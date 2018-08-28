import React from 'react'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`

export const Header = styled.div`
  height: 300px;
  width: 100%;
  background-color: antiquewhite;
  display: flex;
  justify-content: center;
  align-items: center;
`
Header.Text = styled.div`
  font-size: 48px;
  font-weight: bold;
`

export const Background = styled.div`
  width: 100%;
  background-color: #dcdcdc;
  padding: 100px;
`

export const WhiteBoard = styled.div`
  background-color: white;
  height: 100%;
  width: calc(100% - 200px);
  display: flex;
  flex-wrap: wrap;
`

export const ElementContainer = styled.div`
  margin: 60px;
  box-sizing: border-box;
  height: 600px;
  width: calc(50% - 120px);
  border: #dcdcdc 1px solid;
  background-color: white;
  display: flex;
  flex-direction: column;
`

export const Title = styled.div`
  height: 90px;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Canvas = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ElementItem = ({ title, component }) => {
  return (
    <ElementContainer>
      <Title>
        <div>{title}</div>
      </Title>
      <Canvas>{component}</Canvas>
    </ElementContainer>
  )
}
