import { Component } from 'react'

import Friends from './Friends'
import StoreProvider from './Store'
import View from './View'

const store = {
  name: 'jack',
  age: 34,
  friends: ['mark', 'james', 'martin'],
}

class Context extends Component {
  render() {
    return (
      <StoreProvider initialState={store}>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
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
