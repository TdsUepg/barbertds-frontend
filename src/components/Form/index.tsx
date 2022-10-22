import React, { ReactNode, ReactElement } from 'react'
import {
  useForm,
  FormProvider,
  FieldValues,
  UseFormProps,
  SubmitHandler,
} from 'react-hook-form'

interface FormProperties<T extends FieldValues> extends UseFormProps<T> {
  id: string
  onSubmit: SubmitHandler<T>
  children: ReactNode
  className?: string
}

function Form<T extends FieldValues>({
  id,
  defaultValues,
  children,
  onSubmit,
  className,
}: FormProperties<T>): ReactElement {
  const methods = useForm({ defaultValues })
  const { handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <form id={id} onSubmit={handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  )
}

export default Form
