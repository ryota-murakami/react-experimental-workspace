// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { compose, pure } from 'recompose'
import {
  Container,
  Header,
  Background,
  WhiteBoard,
  ElementItem,
  Title,
  Canvas
} from './index.style'

const Box = styled.div`
  width: 100px;
  height: 10px;
  border-radius: 5px;
  border: chocolate 2px solid;

  &:hover {
    height: 200px;
  }

  transition: height 1s;
`

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
            <ElementItem>
              <Title>
                <div>Grow</div>
              </Title>
              <Canvas>
                <Box />
              </Canvas>
            </ElementItem>
            <ElementItem />
            <ElementItem />
            <ElementItem />
            <ElementItem />
          </WhiteBoard>
        </Background>
      </Container>
    )
  }
}

export default compose(pure)(Anime)
