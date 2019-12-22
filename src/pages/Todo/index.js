import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, InputSlice } from './index.style'
import { UUID } from '../../functions'
import TodoList from './TodoList/index'
import { Text } from '../../components/Text'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

class App extends Component {
  state = { currentInput: '' }

  addTodo = () => {
    const { dispatch } = this.props
    const text = this.state.currentInput

    this.setState({ currentInput: '' })
    const newTodo = { id: UUID(), text: text }
    dispatch({
      type: 'ADD_TODO',
      newTodo: newTodo
    })
  }

  _onChange = e => {
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

const mapStateToProps = state => {
  return { todos: state.TodoStore.todos }
}

export default connect(mapStateToProps)(App)
