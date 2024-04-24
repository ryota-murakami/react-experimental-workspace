import { DevTool } from '@hookform/devtools'
import React from 'react'
import { useForm } from 'react-hook-form'

import Header from '@/components/Header'
import { Page } from '@/components/Page'

interface Props {}

const ArrayForm: React.FC<Props> = () => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      test: ['', '', ''],
    },
  })

  return (
    <Page.Container>
      <Header>
        <Header.H1>ArrayForm</Header.H1>
      </Header>
      <div className="w-full grid place-content-center">
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit((data) => console.log(data))}
        >
          <select {...register('test.0')}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <select {...register('test.1')}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <select {...register('test.2')}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <button type="submit">Add</button>
        </form>
        <DevTool control={control} />
      </div>
    </Page.Container>
  )
}

export default ArrayForm
