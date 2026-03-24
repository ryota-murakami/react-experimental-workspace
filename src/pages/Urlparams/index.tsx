import React, { useEffect, useState } from 'react'

import Header from '@/components/Header'
import { Page } from '@/components/Page'

interface Props {}

const Urlparams: React.FC<Props> = () => {
  const [hasUpdated, setHasUpdated] = useState(false)
  useEffect(() => {
    if (!hasUpdated && !window.location.search.includes('foo')) {
      window.location.search = '?foo=1&bar=2'
      setHasUpdated(true)
    }
  }, [hasUpdated])

  return (
    <Page.Container>
      <Header>
        <Header.H1>Urlparams</Header.H1>
      </Header>
      <div className="grid w-full place-content-center">URLSearchParams</div>
    </Page.Container>
  )
}

export default Urlparams
