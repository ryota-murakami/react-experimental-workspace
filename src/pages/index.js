import React, { Component } from 'react'
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
          <Link to="/hooks">・Hooks</Link>
          <Link to="/context">・Context</Link>
          <Link to="/todo">・Todo</Link>
          <Link to="/form">・Form</Link>
          <Link to="/anime">・CSS Animation</Link>
          <Link to="/modal">・Modal</Link>
          <Link to="/selectbox">・SelectBox</Link>
        </LinkContainer>
      </Container>
    )
  }
}

export default Index
