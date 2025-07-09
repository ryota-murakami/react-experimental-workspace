import React, { useState, memo } from 'react'
// import { toast } from 'sonner'

import Header from '@/components/Header'
import { Page } from '@/components/Page'

interface Props {}

let render = 0

const Sandbox: React.FC<Props> = () => {
  const [state, setState] = useState(true)

  render++

  console.log(render)

  return (
    <Page.Container>
      <Header>
        <Header.H1>Sandbox</Header.H1>
      </Header>
      <div className="grid w-full appearance-none place-content-center">
        <button
          onClick={() => setState((prev) => !prev)}
          className="transform rounded-lg border-none bg-cyan-700 p-2 text-amber-50 transition-all duration-150 hover:bg-cyan-950 active:scale-95 active:bg-cyan-800"
        >
          Sonner
        </button>
        <div>{state}</div>
      </div>
    </Page.Container>
  )
}

export default memo(Sandbox)
