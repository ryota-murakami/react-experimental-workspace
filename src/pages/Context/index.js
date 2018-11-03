import React, { Component, createContext } from 'react'
import View from './View'

export const MyContext = createContext()

class Context extends Component {
  state = {
    count: 0,
    increment: () => this.setState({ count: this.state.count + 1 })
  }

  render() {
    return (
      <MyContext.Provider value={this.state}>
        <View />
      </MyContext.Provider>
    )
  }
}

export default Context
