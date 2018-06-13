// @flow
import React, { Fragment } from 'react'
import { Text } from '../../element'
import type { Todo } from '../../type'

type Props = {
  todo: Todo
}

export const Item = (props: Props) => (
  <Fragment>
    <Text>{props.todo.text}</Text>
  </Fragment>
)
