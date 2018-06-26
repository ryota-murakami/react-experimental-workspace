// @flow
import React, { Component } from 'react'
import type { Dispatch } from 'redux'
import { pure, compose } from 'recompose'
import { connect } from 'react-redux'
import { Input, Button, Text } from '../elements'
import { Container, InputSlice } from './style'
import { ID } from '../functions'
import TodoList from './TodoList'
import type { Todo, TodoList as TodoListType } from '../types'
import type { AddTodoAction, ReduxState } from '../index'

type StateProps = {
  todos: TodoListType
}

type Props = StateProps & {
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

const mapStateToProps = (state: ReduxState): StateProps => {
  return { todos: state.todos }
}

export default compose(
  connect(mapStateToProps),
  pure
)(App)
