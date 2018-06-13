// @flow
import React, { Component } from 'react'
import { Input, Button } from '../element'
import { Container } from './style'
import TodoList from './TodoList'

class App extends Component<void> {
  render() {
    return (
      <Container>
        <Input />
        <Button>push</Button>
        <TodoList data={[{ id: 'fjiewfjoa', text: 'fioweajfioa;' }]} />
      </Container>
    )
  }
}

export default App
