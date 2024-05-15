import React from 'react'
import { ContextMenuItem, useContextMenu } from 'use-context-menu'

import Header from '@/components/Header'
import { Page } from '@/components/Page'

interface Props {}

import 'use-context-menu/styles.css'

const selectOne = () => {
  console.log('selectOne')
}

const selectTwo = () => {
  console.log('selectTwo')
}

const selectThree = () => {
  console.log('selectThree')
}

const ContextMenu: React.FC<Props> = () => {
  const { contextMenu, onContextMenu, onKeyDown } = useContextMenu(
    <>
      <ContextMenuItem onSelect={selectOne}>One</ContextMenuItem>
      <ContextMenuItem onSelect={selectTwo}>Two</ContextMenuItem>
      <ContextMenuItem onSelect={selectThree}>Three</ContextMenuItem>
    </>,
  )

  return (
    <Page.Container>
      <Header>
        <Header.H1>ContextMenu</Header.H1>
      </Header>
      <div className="w-full grid place-content-center">
        <>
          <button
            onClick={onContextMenu}
            onContextMenu={onContextMenu}
            onKeyDown={onKeyDown}
            tabIndex={0}
          >
            right-click me
          </button>
          {contextMenu}
        </>
      </div>
    </Page.Container>
  )
}

export default ContextMenu
