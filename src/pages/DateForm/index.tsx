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
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        const startDate = new Date(data.startDate)
        const endDate = new Date(data.endDate)
        if (endDate >= startDate) return true
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
    const processedData = {
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    }
    console.log(processedData)
    toast.success('Success')
  }

  return (
    <>
      <ToastContainer />
      <Page.Container>
        <Header>
          <Header.H1>DateForm</Header.H1>
        </Header>
        <div className="grid w-full place-content-center">
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
                <span className="block text-red-400">
                  {errors.startDate.message}
                </span>
              )}
            </label>
            <label htmlFor={id('endDate')}>
              EndDate:
              <input type="date" id={id('endDate')} {...register('endDate')} />
              {errors.endDate && (
                <span className="block text-red-400">
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
