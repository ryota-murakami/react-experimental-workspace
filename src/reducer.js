// @flow
import { combineReducers } from 'redux'
import { TodoReduxReducer } from './pages/Todo/reducer'
import type { TodoReduxState, AddTodoReduxAction } from './pages/Todo/reducer'

export type RootReduxState = { TodoStore: TodoReduxState }
export type ReduxAction = AddTodoReduxAction | string

export const reducer = combineReducers({ TodoStore: TodoReduxReducer })