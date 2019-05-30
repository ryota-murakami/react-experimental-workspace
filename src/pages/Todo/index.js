// @flow
import React, { Component } from 'react'
import type { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Input, Button, Text } from '../../elements'
import { Container, InputSlice } from './index.style'
import { UUID } from '../../functions'
import TodoList from './TodoList/index'
import type { Todo as TodoType, TodoList as TodoListType } from './types'
import type { AddTodoReduxAction } from './reducer'
import type { RootReduxState } from './../../reducer'

type StateProps = {
  todos: TodoListType
}

type Props = StateProps & {
  dispatch: Dispatch<AddTodoReduxAction>
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
    const newTodo: TodoType = { id: UUID(), text: text }
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

const mapStateToProps = (state: RootReduxState): StateProps => {
  return { todos: state.TodoStore.todos }
}

export default connect(mapStateToProps)(App)
