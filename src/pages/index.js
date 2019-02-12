import React, { Component } from 'react'
import { pure } from 'recompose'
import {
  Container,
  Header,
  LinkContainer,
  HeaderContainer
} from './index.style'
import { Link } from '../components/Link'

class Index extends Component {
  render() {
    return (
      <Container>
        <HeaderContainer>
          <Header>React Workspace</Header>
        </HeaderContainer>
        <LinkContainer>
          {/*{@TODO hooks }*/}
          <Link to="/context">・Context</Link>
          <Link to="/todo">・Todo</Link>
          <Link to="/form">・Form</Link>
          <Link to="/anime">・CSS Animation</Link>
        </LinkContainer>
      </Container>
    )
  }
}

export default pure(Index)
