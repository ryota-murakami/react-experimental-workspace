import React, { Component } from 'react'
import View from './View'
import StoreProvider from './Store'

const store = {
  name: 'jack',
  age: 34,
  friends: ['mark', 'james', 'martin']
}

class Context extends Component {
  render() {
    return (
      <StoreProvider initialState={store}>
        <View />
      </StoreProvider>
    )
  }
}

export default Context
