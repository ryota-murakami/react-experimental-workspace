import React from 'react'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import z from 'zod'
import 'react-toastify/dist/ReactToastify.css'

import Header from '@/components/Header'
import { Page } from '@/components/Page'

import { useFormId } from '../../hooks/useFormId'

const Schema = z.object({
  startDate: z.date(),
  endDate: z.date(),
})

type SchemaType = z.infer<typeof Schema>

const DateForm: React.FC = () => {
  const id = useFormId()
  const { register, handleSubmit } = useForm<SchemaType>()
  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    console.log(data)
    toast.success('Success')
  }

  return (
    <>
      <ToastContainer />
      <Page.Container>
        <Header>
          <Header.H1>DateForm</Header.H1>
        </Header>
        <div className="w-full grid place-content-center">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor={id('startDate')}>
              StartDate:
              <input
                type="date"
                id={id('startDate')}
                {...register('startDate')}
              />
            </label>{' '}
            <label htmlFor={id('endDate')}>
              StartDate:
              <input type="date" id={id('endDate')} {...register('endDate')} />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </Page.Container>
    </>
  )
}

export default DateForm
