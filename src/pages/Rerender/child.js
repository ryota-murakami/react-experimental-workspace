// @flow
import React, { Component, Fragment } from 'react'
import { pure } from 'recompose'

type Props = {
  count: number
}

type State = {
  count: number
}

class Child extends Component<Props, State> {
  state = {
    count: 0
  }

  render() {
    console.log(this.props)
    return (
      <Fragment>
        <div>prop count: {this.props.count}</div>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          state increment
        </button>
        <div>state count: {this.state.count}</div>
      </Fragment>
    )
  }
}

export default pure(Child)
