import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

const Input: React.FC = ({ name, rules, ...props }) => {
    const { control, register } = useFormContext();

    return (
        <Controller 
            name={name}
            control={control}
            rules={rules}
            render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
            }) => (
                <TextField
                    {...props}
                    {...register(name)}
                    fullWidth
                    name={name}
                    inputRef={ref}
                    error={value?.error || !!error?.message}
                    helperText={error?.message}
                    variant="outlined"
                />
            )}
        />
    )
};

export default Input;