import React from 'react'
import styled, { keyframes } from 'styled-components'

export const FullScreen = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Container = styled.div`
  width: 70%;
  height: 500px;
  border-style: solid;
  border-width: 1px;
  border-color: #7f7f7f;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

export const Title = styled.div`
  font-size: 24px;
  margin-top: 10px;
  margin-bottom: 10px;
`

const FlashMessageWrapper = styled.div`
  position: fixed;
  top: 0;
  background-color: ${props =>
    props.flashMessage === 'Error' ? 'crimson' : 'green'};
  opacity: ${props => (props.flashMessage.length ? 0.6 : 0)};
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  color: white;
  transition: opacity 0.3s ease-in-out;
`

export const FlashMessage = ({ state }) => {
  return (
    <FlashMessageWrapper flashMessage={state.flashMessage}>
      {state.flashMessage}
    </FlashMessageWrapper>
  )
}
