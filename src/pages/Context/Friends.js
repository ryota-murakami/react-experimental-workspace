import { css } from '@emotion/core'
import Button from '@material-ui/core/Button'
import { memo, useContext } from 'react'

import StoreContext from './StoreContext'

const layout = css`
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 36px;
  font-weight: bold;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

function Friends() {
  const {
    store: { friends },
    setStore,
  } = useContext(StoreContext)

  return (
    <div className={layout}>
      <ul>{Array.isArray(friends) && friends.map((v, i) => <li key={i}>{v}</li>)}</ul>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => friends.push(rand()) && setStore({ friends: friends })}
      >
        Add Frineds
      </Button>
    </div>
  )
}

function rand() {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}

export default memo(Friends)
