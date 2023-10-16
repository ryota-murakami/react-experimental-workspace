import React from 'react'
import { atom, useRecoilState } from 'recoil'

const counterState = atom({
  default: 0,
  key: 'counterState',
})

const Counter: React.FC = () => {
  const [count, setCount] = useRecoilState(counterState)
  const onClick = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <p>{count}</p> <button onClick={onClick}></button>
    </div>
  )
}

export default Counter
