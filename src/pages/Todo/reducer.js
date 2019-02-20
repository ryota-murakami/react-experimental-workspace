// @flow
import type { Todo, TodoList } from './types'
import type { Reducer } from 'redux'

export type TodoReduxState = {
  todos: TodoList
}

export type AddTodoReduxAction = {
  type: 'ADD_TODO',
  newTodo: Todo
}

const initialState: TodoReduxState = {
  todos: []
}

export const TodoReduxReducer: Reducer<TodoReduxState, AddTodoReduxAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.newTodo] }

    default:
      return state
  }
}
