// @flow
import React, { Component } from 'react'
import { pure } from 'recompose'
import { Container, Element, Title } from './style'

type Props = {}

class Form extends Component<Props> {
  render() {
    return (
      <Container>
        <Element>
          <Title>Form</Title>
        </Element>
      </Container>
    )
  }
}

export default pure<*>(Form)
