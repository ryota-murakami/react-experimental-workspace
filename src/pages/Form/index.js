// @flow
import React, { Component } from 'react'
import { pure } from 'recompose'
import { Container, Element } from './style'

type Props = {}

class Form extends Component<Props> {
  render() {
    return (
      <Container>
        <Element>aaa</Element>
      </Container>
    )
  }
}

export default pure(Form)
