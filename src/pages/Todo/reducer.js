const initialState = {
  todos: []
}

export const TodoReduxReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.newTodo] }

    default:
      return state
  }
}
