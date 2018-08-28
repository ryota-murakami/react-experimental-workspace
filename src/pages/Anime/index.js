// @flow
import React, { Component } from 'react'
import { compose, pure } from 'recompose'
import {
  Container,
  Header,
  Background,
  WhiteBoard,
  ElementContainer
} from './index.style'
import { Grow } from './Grow'

type Props = {}

class Anime extends Component<Props> {
  render() {
    return (
      <Container>
        <Header>
          <Header.Text>CSS Animation</Header.Text>
        </Header>
        <Background>
          <WhiteBoard>
            <Grow />
            <ElementContainer />
            <ElementContainer />
            <ElementContainer />
            <ElementContainer />
          </WhiteBoard>
        </Background>
      </Container>
    )
  }
}

export default compose(pure)(Anime)
