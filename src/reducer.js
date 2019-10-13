import { combineReducers } from 'redux'
import { TodoReduxReducer } from './pages/Todo/reducer'

export const reducer = combineReducers({ TodoStore: TodoReduxReducer })
