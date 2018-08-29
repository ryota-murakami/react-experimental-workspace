// @flow
import React, { Component } from 'react'
import { pure } from 'recompose'
import { Link } from 'react-router-dom'
import {
  Container,
  LinkWrapper,
  Header,
  HeaderContainer,
  LinkContainer
} from './index.style'

type Props = {}

class App extends Component<Props> {
  render() {
    return (
      <Container>
        <HeaderContainer>
          <Header>React Workspace</Header>
        </HeaderContainer>
        <LinkContainer>
          <LinkWrapper>
            <Link to="/todo">・Todo</Link>
          </LinkWrapper>
          <LinkWrapper>
            <Link to="/form">・Form</Link>
          </LinkWrapper>
          <LinkWrapper>
            <Link to="/anime">・CSS Animation</Link>
          </LinkWrapper>
        </LinkContainer>
      </Container>
    )
  }
}

export default pure(App)
