import { signal } from '@preact/signals-react'
import { Theme } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { usStates } from '../../../mockAPI/fixtures/usStates'

type Input = {
  q: string
}

const hit = signal([])

const Search: React.FC = () => {
  const { handleSubmit, register, watch } = useForm<Input>()
  const onSubmit: SubmitHandler<Input> = async (data) => {
    const response = await fetch(`http://localhost:3000/api/search?q=${data.q}`)
    const results = await response.json()
    hit.value = results
  }

  const [suggestions, setSuggestions] = useState<string[]>([])
  const searchInput = watch('q')

  useEffect(() => {
    if (searchInput) {
      const results = usStates.filter((state) =>
        state.toLowerCase().includes(searchInput.toLowerCase()),
      )
      setSuggestions(results)
    } else {
      setSuggestions([])
    }
  }, [searchInput])

  return (
    <Theme>
      <div className="flex min-h-screen flex-col">
        <section className="grid place-content-center">
          <h1 className="py-10 text-8xl font-semibold antialiased">Search</h1>
        </section>
        <section className="grid place-content-center">
          <form className="flex gap-4" onSubmit={handleSubmit(onSubmit)}>
            <button
              className="rounded-md border-2 border-solid border-indigo-500 bg-white px-4 py-2 text-xl font-semibold text-slate-700 shadow-xs ring-1 ring-slate-900/5 dark:border-sky-500 dark:bg-slate-700 dark:text-white"
              type="submit"
            >
              Search
            </button>
            <input autoComplete="off" type="search" {...register('q')} />
          </form>
        </section>
        <section className="grid place-content-center">
          {suggestions.map((suggestion, index) => (
            <div key={index}>{suggestion}</div>
          ))}
        </section>
        <section className="grid place-content-center">
          <ul className="mt-4 list-inside list-disc space-y-2">
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
