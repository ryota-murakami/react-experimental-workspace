import React, { useEffect, useState } from 'react'

import Header from '@/components/Header'
import { Page } from '@/components/Page'
import { Button } from '@/components/ui/button'

interface Props {}

const WindowOpen: React.FC<Props> = () => {
  const [text, setText] = useState('')
  console.log(text)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      setText(event.data)
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <Page.Container>
      <Header>
        <Header.H1>WindowOpen</Header.H1>
      </Header>
      <div className="grid w-full place-content-center">
        <Button
          onClick={() => {
            window.open('/windowOpen/popup', '_blank', 'width=600,height=600')
          }}
        >
          window open
        </Button>
      </div>
    </Page.Container>
  )
}

export default WindowOpen
