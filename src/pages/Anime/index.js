import { Component } from 'react'

import { Grow } from './Grow'
import { HideShow } from './HideShow'
import {
  Container,
  Header,
  Background,
  WhiteBoard,
  ElementContainer,
  ElementItem,
} from './index.style'

class Anime extends Component {
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
