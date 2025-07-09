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
          className="focus:boder-3 focus:border-wite forcus:border-solid rounded-lg border-none bg-cyan-700 p-2 text-amber-50 hover:bg-cyan-950"
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
