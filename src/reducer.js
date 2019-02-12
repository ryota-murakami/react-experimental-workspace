// @flow
import type { Todo, TodoList } from './pages/Todo/types'

export type ReduxState = {
  todos: TodoList
}
const initialState: ReduxState = {
  todos: []
}
export type AddTodoAction = {
  type: 'ADD_TODO',
  newTodo: Todo
}
export type Action = AddTodoAction
export const reducer = (
  state: ReduxState = initialState,
  action: Action
): ReduxState => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.newTodo] }
    default:
      return state
  }
}
