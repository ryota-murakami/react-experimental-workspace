// @flow
import React, { Component } from 'react'
import { pure } from 'recompose'
import {
  Container,
  Header,
  LinkContainer,
  HeaderContainer,
  Link
} from './index.style'

type Props = {}

class Index extends Component<Props> {
  render() {
    return (
      <Container>
        <HeaderContainer>
          <Header>React Workspace</Header>
        </HeaderContainer>
        <LinkContainer>
          <Link to="/todo">・Todo</Link>
          <Link to="/form">・Form</Link>
          <Link to="/anime">・CSS Animation</Link>
        </LinkContainer>
      </Container>
    )
  }
}

export default pure<*>(Index)
