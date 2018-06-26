// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import type { TodoList } from './type'
import './index.css'
import App from './App/App'
import registerServiceWorker from './registerServiceWorker'
import type { Todo } from './type'

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

const reducer = (
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

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  // $FlowIssue
  document.getElementById('root')
)
registerServiceWorker()
