// @flow
import React, { Component } from 'react'
import type { Dispatch } from 'redux'
import { pure, compose } from 'recompose'
import { connect } from 'react-redux'
import { Input, Button, Text } from '../element'
import { Container, InputSlice } from './style'
import { ID } from '../function'
import TodoList from './TodoList'
import type { Todo, TodoList as TodoListType } from '../type'
import type { AddTodoAction, ReduxState } from '../index'

type StateToProps = {
  todos: TodoListType
}

type Props = StateToProps & {
  dispatch: Dispatch<AddTodoAction>
}

type State = {
  currentInput: string
}

class App extends Component<Props, State> {
  state: State = { currentInput: '' }

  addTodo = () => {
    const { dispatch } = this.props
    const text = this.state.currentInput

    this.setState({ currentInput: '' })
    const newTodo: Todo = { id: ID(), text: text }
    dispatch({
      type: 'ADD_TODO',
      newTodo: newTodo
    })
  }

  _onChange = (e: SyntheticEvent<>) => {
    // $FlowFixMe
    this.setState({ currentInput: e.target.value })
  }

  render() {
    const { todos } = this.props

    return (
      <Container>
        <InputSlice style={{ height: '30%' }}>
          <Input value={this.state.currentInput} onChange={this._onChange} />
          <Button onClick={this.addTodo}>push</Button>
        </InputSlice>
        {todos.length < 1 ? (
          <Text>let's enter todo!</Text>
        ) : (
          <TodoList data={todos} style={{ height: '70%' }} />
        )}
      </Container>
    )
  }
}

const MapStateToProps = (state: ReduxState): MapStateToProps => {
  return { todos: state.todos }
}

export default compose(
  connect(MapStateToProps),
  pure
)(App)
