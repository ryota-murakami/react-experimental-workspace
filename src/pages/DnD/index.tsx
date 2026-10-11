import React, { useReducer } from 'react'

import DropZone from './DropZone'
import Icon from './Icon'
import { ActionType, defaulState, reducer } from './reducer'
import { Container, Layout } from './style'

const DnDPage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, defaulState)

  const onDragStart = (): void => {
    dispatch({ payload: null, type: ActionType.ON_DRAG_START })
  }

  const onDragEnter = (): void => {
    dispatch({ payload: null, type: ActionType.ON_DRAG_ENTER })
  }

  const onDragOver = (e: React.DragEvent): void => {
    e.preventDefault()
    dispatch({ payload: null, type: ActionType.ON_DRAG_OVER })
  }

  const onDrop = (): void => {
    dispatch({ payload: null, type: ActionType.ON_DROP })
  }

  return (
    <Layout>
      <Container>
        <h1>drag and drop</h1>
        <main>
          <DropZone
            isDrop={state.isDrop}
            onDragStart={onDragStart}
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            onDrop={onDrop}
            massage="Drop Here!"
          />
          {state.isDrop ? null : <Icon onDragStart={onDragStart} />}
        </main>
      </Container>
    </Layout>
  )
}

export default DnDPage
