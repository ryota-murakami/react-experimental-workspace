import { signal } from '@preact/signals-react'
import { Theme } from '@radix-ui/themes'
import React from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

type Input = {
  q: string
}

const hit = signal([])

const Search: React.FC = () => {
  const {
    // formState: { errors },
    handleSubmit,
    register,
  } = useForm<Input>()
  const onSubmit: SubmitHandler<Input> = async (data) => {
    const response = await fetch(`http://localhost:3000/api/search?q=${data.q}`)
    const results = await response.json()
    console.log(results)
    hit.value = results
  }

  return (
    <Theme>
      <div className="container h-screen grid place-content-center">
        <section className="grid place-content-center">
          <form className="flex gap-4" onSubmit={handleSubmit(onSubmit)}>
            <button
              className="text-xl px-4 py-2 font-semibold bg-white text-slate-700 dark:bg-slate-700 dark:text-white rounded-md shadow-sm ring-1 ring-slate-900/5 border-indigo-500 dark:border-sky-500 border-2 border-solid"
              type="submit"
            >
              Search
            </button>
            <input type="search" {...register('q')} />
          </form>
        </section>
        <section className="grid place-content-center">
          <ul className="mt-4 space-y-2 list-disc list-inside">
            {hit.value.length
              ? hit.value.map((v) => (
                  <li key={v} className="text-gray-700">
                    {v}
                  </li>
                ))
              : null}
          </ul>
        </section>
      </div>
    </Theme>
  )
}

export default Search
