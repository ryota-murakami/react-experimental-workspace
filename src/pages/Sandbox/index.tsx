import React from 'react'
import { toast } from 'sonner'

import Header from '@/components/Header'
import { Page } from '@/components/Page'

interface Props {}

const Sandbox: React.FC<Props> = () => {
  return (
    <Page.Container>
      <Header>
        <Header.H1>Sandbox</Header.H1>
      </Header>
      <div className="grid w-full appearance-none place-content-center">
        <button
          className="transform rounded-lg border-none bg-cyan-700 p-2 text-amber-50 transition-all duration-150 hover:bg-cyan-950 active:scale-95 active:bg-cyan-800"
          onClick={() => {
            toast('Hello Sonner')
          }}
        >
          Sonner
        </button>
      </div>
    </Page.Container>
  )
}

export default Sandbox
