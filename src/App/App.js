// @flow
import React, { Component } from 'react'
import { Input, Button } from '../element'
import { Container, InputSlice } from './style'
import TodoList from './TodoList'
import type { TodoList as TodoListType } from '../type'

class App extends Component<void> {
  render() {
    const todos: TodoListType = [{ id: 'idddddddddd', text: 'text valueeee' }]
    return (
      <Container>
        <InputSlice style={{ height: '30%' }}>
          <Input />
          <Button>push</Button>
        </InputSlice>
        <TodoList data={todos} style={{ height: '70%' }} />
      </Container>
    )
  }
}

export default App
