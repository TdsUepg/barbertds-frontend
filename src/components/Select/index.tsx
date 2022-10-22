import React from 'react'
import { useFormContext, Controller, Validate } from 'react-hook-form'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MUISelect from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import type { SelectProps } from '@mui/material/Select'

type Option = {
  name: string
  value: string | number
}

interface SelectProperties extends SelectProps {
  name: string
  options: Option[]
  label?: string
  rules?: Record<string, unknown>
  validate?: Validate<string> | Record<string, Validate<string>>
}

const Select: React.FC<SelectProperties> = ({
  name,
  options,
  label,
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
        <FormControl error={value?.error || !!error?.message} fullWidth>
          {label && <InputLabel>{label}</InputLabel>}
          <MUISelect
            {...props}
            {...register(name, { validate })}
            fullWidth
            name={name}
            value={value}
            label={label}
            inputRef={ref}
            variant="outlined"
            displayEmpty
          >
            {options.map((option) => (
              <MenuItem value={option.value}>{option.name}</MenuItem>
            ))}
          </MUISelect>
          <FormHelperText>{value?.error || !!error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  )
}

export default Select
