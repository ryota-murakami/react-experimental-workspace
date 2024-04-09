import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import z from 'zod'
import 'react-toastify/dist/ReactToastify.css'

import Header from '@/components/Header'
import { Page } from '@/components/Page'
import { Button } from '@/components/ui/button'

import { useFormId } from '../../hooks/useFormId'

const Schema = z
  .object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        if (data.endDate >= data.startDate) return true
        return false
      }

      return true
    },
    {
      message: 'startDate must be lesser than endDate',
      path: ['startDate'],
    },
  )

type SchemaType = z.infer<typeof Schema>

const DateForm: React.FC = () => {
  const id = useFormId()
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    mode: 'onBlur',
  })
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
              {errors.startDate && (
                <span className="text-red-400 block">
                  {errors.startDate.message}
                </span>
              )}
            </label>
            <label htmlFor={id('endDate')}>
              StartDate:
              <input type="date" id={id('endDate')} {...register('endDate')} />
              {errors.endDate && (
                <span className="text-red-400 block">
                  {errors.endDate.message}
                </span>
              )}
            </label>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </Page.Container>
    </>
  )
}

export default DateForm
