// @flow
import { combineReducers } from 'redux'
import { TodoReduxReducer } from './pages/Todo/reducer'
import type { TodoReduxState } from './pages/Todo/reducer'

export type RootReduxState = TodoReduxState | Object
export type ReduxAction = AddTodoReduxAction | string

export const reducer = combineReducers({ TodoStore: TodoReduxReducer })
