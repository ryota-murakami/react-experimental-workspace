// @flow
import React, { Component } from 'react'
import { Input, Button, Text } from '../element'
import { Container, InputSlice } from './style'
import TodoList from './TodoList'
import type { TodoList as TodoListType } from '../type'

type State = {
  todos: TodoListType
}

class App extends Component<void, State> {
  inputRef: ?HTMLInputElement = React.createRef()
  state: State = { todos: [] }

  addTodo = () => {
    // inputRefのvalue取得
    console.log(this.inputRef.current.value)
    // TODO styled-componentsのelementからthis.inputRef.current.valueどうやって取得すんの
  }

  render() {
    return (
      <Container>
        <InputSlice style={{ height: '30%' }}>
          <input ref={this.inputRef} />
          <Button onClick={this.addTodo}>push</Button>
        </InputSlice>
        {this.state.todos.length < 1 ? (
          <Text>let's enter todo!</Text>
        ) : (
          <TodoList data={this.state.todos} style={{ height: '70%' }} />
        )}
      </Container>
    )
  }
}

export default App
