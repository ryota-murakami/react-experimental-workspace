import React, { Component } from 'react'
import View from './View'
import StoreProvider from './Store'
import Friends from './Friends'

const store = {
  name: 'jack',
  age: 34,
  friends: ['mark', 'james', 'martin']
}

class Context extends Component {
  render() {
    return (
      <StoreProvider initialState={store}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Friends />
          <View />
        </div>
      </StoreProvider>
    )
  }
}

export default Context
