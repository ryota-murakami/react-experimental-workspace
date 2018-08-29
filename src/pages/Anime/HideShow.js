// @flow
import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Button = styled.button`
  padding: 15px;
  max-height: 70px;
  width: 120px;
  color: #37da24;
  font-size: 24px;
  background-color: white;
  border-radius: 5px;
  border: #37da24 2px solid;
  transition: 0.2s ease-out;

  &:focus {
    outline: 0;
  }
  &:hover {
    background-color: rgba(55, 218, 36, 0.2);
  }
`

export class HideShow extends Component<{}> {
  render() {
    return (
      <Container>
        <Button>Toggle</Button>
      </Container>
    )
  }
}
