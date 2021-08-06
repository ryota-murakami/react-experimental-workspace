import React from 'react'
import { atom, useRecoilState } from 'recoil'

const counterState = atom({
  key: 'counterState',
  default: 0,
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
