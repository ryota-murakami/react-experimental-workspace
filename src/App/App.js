// @flow
import React, { Component } from 'react'
import { Input } from 'element'
import { Container } from './style'
import TodoList from './TodoList'

class App extends Component<void> {
  render() {
    return (
      <Container>
        <Input />
        <TodoList data={[{ id: 'fjiewfjoa', text: 'fioweajfioa;' }]} />
      </Container>
    )
  }
}

export default App
