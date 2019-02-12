// @flow
import React, { Fragment } from 'react'
import { Text } from '../../../elements'
import type { Todo } from '../types'

type Props = {
  todo: Todo
}

export const Item = (props: Props) => (
  <Fragment>
    <Text>{props.todo.text}</Text>
  </Fragment>
)
