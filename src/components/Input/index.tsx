import React from 'react'
import { useFormContext, Controller, Validate } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import type { OutlinedTextFieldProps } from '@mui/material/TextField'

interface InputProperties extends Omit<OutlinedTextFieldProps, 'variant'> {
  label: string
  name: string
  variant?: 'outlined'
  type?: string
  rules?: Record<string, unknown>
  validate?: Validate<string> | Record<string, Validate<string>>
}

const Input: React.FC<InputProperties> = ({
  variant = 'outlined',
  label,
  name,
  type,
  rules,
  validate,
  ...props
}) => {
  const { control, register } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, name, ref }, fieldState: { error } }) => (
        <TextField
          {...props}
          {...register(name, { validate })}
          fullWidth
          variant={variant}
          name={name}
          label={label}
          type={type}
          inputRef={ref}
          error={value?.error || !!error?.message}
          helperText={error?.message}
        />
      )}
    />
  )
}

export default Input
