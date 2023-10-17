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
    watch,
  } = useForm<Input>()
  const onSubmit: SubmitHandler<Input> = (data) => console.log(data)

  return (
    <div className="container h-screen grid place-content-center">
      <section className="grid place-content-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="site-search">Search the site:</label>
          <input type="search" id="site-search" name="q" />

          <button>Search</button>
        </form>
      </section>
    </div>
  )
}

export default Search
