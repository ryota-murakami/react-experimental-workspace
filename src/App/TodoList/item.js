// @flow
import React, { Fragment } from 'react'
import type { Todo } from '../type'

type Props = {
  todo: Todo
}

export const Item = (props: Props) => (
  <Fragment>
    <div>{props.todo.text}</div>
  </Fragment>
)
