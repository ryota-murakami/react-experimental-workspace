import React, { useReducer } from 'react'
import { Container, Layout } from './style'
import Icon from './Icon'
import DropZone from './DropZone'
import { ActionType, defaulState, reducer } from './reducer'

const DnDPage = () => {
  const [state, dispatch] = useReducer(reducer, defaulState)

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    dispatch({ type: ActionType.ON_DROP, payload: null })
  }

  return (
    <Layout>
      <Container>
        <h1>drag and drop</h1>
        <main>
          <DropZone
            isDrop={state.isDrop}
            onDrop={(e) => onDrop(e)}
            massage="Drop Here!"
          />
          {state.isDrop ? null : <Icon />}
        </main>
      </Container>
    </Layout>
  )
}

export default DnDPage
