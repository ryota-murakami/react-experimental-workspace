import React, { useContext, memo } from 'react'
import { css } from 'emotion'
import StoreContext from './StoreContext'
import ViewChild from './ViewChild'
import MyButton from './MyButton'

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

function View(props) {
  const { store, setStore } = useContext(StoreContext)

  return (
    <div className={layout}>
      <h1>Age: {store.age}</h1>
      <MyButton onClick={() => setStore({ age: store.age + 1 })}>
        Increase Age
      </MyButton>
      <MyButton onClick={() => setStore({ name: null })}>Name Null</MyButton>
      <ViewChild />
    </div>
  )
}

export default memo(View)
