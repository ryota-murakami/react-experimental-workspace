import React, { useState } from 'react'

interface Props {}

const SelfStateChange: React.FC<Props> = () => {
  const [state, setState] = useState(0)

  return (
    <section>
      <h2 className="font-bold text-2xl">Self State Change</h2>
      <button
        onClick={() => setState((prev) => prev + 1)}
        className="p-4 text-xl text-white bg-blue-500 rounded-md hover:bg-blue-300 active:bg-blue-950"
      >
        Increment
      </button>
      <h2 className="font-bold text-2xl">State: {state}</h2>
    </section>
  )
}

export default SelfStateChange
