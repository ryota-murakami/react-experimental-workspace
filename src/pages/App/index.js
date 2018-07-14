// @flow
import React, { Component } from 'react'
import { pure } from 'recompose'
import { Link } from 'react-router-dom'
import { Container, LinkContainer } from './index.style'

type Props = {}

class App extends Component<Props> {
  render() {
    return (
      <Container>
        <LinkContainer>
          <Link to="/todo">Todo</Link>
        </LinkContainer>
        <LinkContainer>
          <Link to="/rerender">Rerender</Link>
        </LinkContainer>
        <LinkContainer>
          <Link to="/form">Form</Link>
        </LinkContainer>
      </Container>
    )
  }
}

export default pure(App)
