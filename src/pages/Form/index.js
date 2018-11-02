// @flow
import React, { Component } from 'react'
import { pure } from 'recompose'
import { FullScreen, Container, Title } from './style'

type Props = {}

class Form extends Component<Props> {
  render() {
    return (
      <FullScreen>
        <Container>
          <Title>Form</Title>
        </Container>
      </FullScreen>
    )
  }
}

export default pure<*>(Form)
