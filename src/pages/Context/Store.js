import React, { useState, Children } from 'react'
import StoreContext from './StoreContext'

export default function Provider({ initialState, children }) {
  // TODO initialState isPlainObject validation

  const [store, setState] = useState(initialState)
  const setStore = v => {
    // TODO is exist v['key'] in the store property. in order to prevent typo of key string when call setStore()
    setState({ ...store, ...v })
  }
  return (
    <StoreContext.Provider
      value={{
        store,
        setStore
      }}
    >
      {Children.only(children)}
    </StoreContext.Provider>
  )
}
