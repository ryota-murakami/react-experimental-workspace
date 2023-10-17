import { Theme } from '@radix-ui/themes'
import React from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

type Input = {
  q: string
}

const Search: React.FC = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<Input>()
  const onSubmit: SubmitHandler<Input> = (data) => console.log(data)

  return (
    <Theme>
      <div className="container h-screen grid place-content-center">
        <section className="grid place-content-center">
          <form className="flex gap-4" onSubmit={handleSubmit(onSubmit)}>
            <input type="search" {...register('q')} />
            <button
              className="text-xl px-4 py-2 font-semibold bg-white text-slate-700 dark:bg-slate-700 dark:text-white rounded-md shadow-sm ring-1 ring-slate-900/5 border-indigo-500 dark:border-sky-500 border-2 border-solid"
              type="submit"
            >
              Search
            </button>
          </form>
        </section>
      </div>
    </Theme>
  )
}

export default Search
