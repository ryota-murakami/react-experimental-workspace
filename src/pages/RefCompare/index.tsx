import React, { useRef, createRef, useState } from 'react'

import Header from '../../components/Header'
import { Page } from '../../components/Page'

interface Props {}

const RefCompare: React.FC<Props> = () => {
  const [renderIndex, setRenderIndex] = useState(1)
  const fromUseRef = useRef<number>(renderIndex)
  const byCreateRef = createRef<number>()
  if (!fromUseRef.current) {
    fromUseRef.current = renderIndex
  }
  if (!byCreateRef.current) {
    // @ts-ignore
    byCreateRef.current = renderIndex
  }
  return (
    <Page.Container>
      <Header>
        <Header.H1>RefCompare</Header.H1>
      </Header>
      <div className="w-full grid place-content-center">
        <div className="App">
          Current render index: {renderIndex}
          <br />
          First render index remembered within refFromUseRef.current:
          {fromUseRef.current}
          <br />
          First render index unsuccessfully remembered within
          refFromCreateRef.current:
          {byCreateRef.current}
          <br />
          <button onClick={() => setRenderIndex((prev) => prev + 1)}>
            Cause re-render
          </button>
        </div>
      </div>
    </Page.Container>
  )
}

export default RefCompare
