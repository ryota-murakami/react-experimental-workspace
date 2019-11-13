import React, { Component } from 'react'
import { Container } from './index.style'
import { Item } from './item'
import { AppLayerError } from '../../../AppLayerError'

class TodoListComponent extends Component {
  render() {
    const { data } = this.props
    if (!data.length)
      throw new AppLayerError('todolist must have at least one item.')

    const items = data.map((v, i) => <Item key={i} todo={v} />)

    return <Container>{items}</Container>
  }
}

export default TodoListComponent
