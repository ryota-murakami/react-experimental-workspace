// @flow
import React, { Component } from 'react'
import {
  Container,
  Header,
  Background,
  WhiteBoard,
  ElementContainer,
  ElementItem
} from './index.style'
import { Grow } from './Grow'
import { HideShow } from './HideShow'

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
            <ElementItem title={'Grow'} component={<Grow />} />
            <ElementItem title={'Hide/Show'} component={<HideShow />} />
            <ElementContainer />
            <ElementContainer />
            <ElementContainer />
          </WhiteBoard>
        </Background>
      </Container>
    )
  }
}

export default Anime
