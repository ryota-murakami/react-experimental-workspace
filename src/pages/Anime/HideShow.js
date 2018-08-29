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
  color: #00ff00;
  font-size: 24px;
  background-color: white;
  border-radius: 5px;
  border: #00ff00 2px solid;
  &:focus {
    outline: 0;
  }
  &:hover {
    background-color: rgba(8, 226, 30, 0.15);
  }

  transition: background-color 1s;
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
