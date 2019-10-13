import React, { Fragment } from 'react'
import { Text } from '../../../elements'

export const Item = props => (
  <Fragment>
    <Text>{props.todo.text}</Text>
  </Fragment>
)
