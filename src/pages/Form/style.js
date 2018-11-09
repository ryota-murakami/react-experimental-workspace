import React from 'react'
import styled, { css } from 'styled-components'

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
  font-size: 32px;
  font-weight: bold;
  line-height: 1;
  margin-top: 30px;
  margin-bottom: 30px;
`

const FlashMessageWrapper = styled.div`
  position: fixed;
  top: 0;
  background-color: ${props => (props.hasError ? 'crimson' : 'green')};
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

export const FlashMessage = props => {
  const { state } = props
  return (
    <FlashMessageWrapper
      flashMessage={state.flashMessage}
      hasError={state.hasError}
    >
      {state.flashMessage}
    </FlashMessageWrapper>
  )
}

export const FormGroup = styled.div`
  width: 600px;
  height: 100px;
  border: #778899 1px solid;
  border-radius: 10px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  padding: 10px 50px;
`

export const Label = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`

export const TextInput = styled.input`
  padding: 0.5rem;
  font-size: 16px;
  width: 100%;
  display: block;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 8px;
  ${props =>
    props.hasError &&
    css`
      border-color: red;
    `} &:focus {
    border-color: #007eff;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 0 3px rgba(0, 126, 255, 0.1);
    outline: none;
  }
`

export const ErrorMessage = styled.div`
  color: red;
`
