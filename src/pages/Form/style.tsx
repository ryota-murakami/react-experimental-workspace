import React from 'react'
import type { ReactElement } from 'react'
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

interface FlashMessageWrapperProps {
  hasError: boolean
  showFlash: boolean
}

const FlashMessageWrapper = styled.div<FlashMessageWrapperProps>`
  position: fixed;
  top: 0;
  background-color: ${({ hasError }) => (hasError ? 'crimson' : 'green')};
  opacity: ${({ showFlash }) => (showFlash ? 0.6 : 0)};
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

interface FlashMessageProps {
  flashMessage: string
  hasError: boolean
  showFlash: boolean
}

export const FlashMessage = ({
  flashMessage,
  hasError,
  showFlash,
}: FlashMessageProps): ReactElement => {
  return (
    <FlashMessageWrapper hasError={hasError} showFlash={showFlash}>
      {flashMessage}
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

interface TextInputProps {
  hasError: boolean
}

export const TextInput = styled.input<TextInputProps>`
  padding: 0.5rem;
  font-size: 16px;
  width: 100%;
  display: block;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 8px;
  ${(props) =>
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
