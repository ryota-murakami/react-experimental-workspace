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

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 30px;
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

const Circle = styled.div`
  width: 200px;
  height: 200px;
  background-color: #434343;
  border-radius: 50%;
  opacity: ${props => (props.toggle ? 1 : 0)};
  transition: opacity 0.3s linear;
`

type State = {
  toggle: boolean
}

export class HideShow extends Component<{}, State> {
  state = {
    toggle: false
  }

  handleClick = () => {
    this.setState({ toggle: !this.state.toggle })
  }

  render() {
    return (
      <Container>
        <ButtonContainer>
          <Button onClick={this.handleClick}>Toggle</Button>
        </ButtonContainer>
        <Circle toggle={this.state.toggle} />
      </Container>
    )
  }
}
