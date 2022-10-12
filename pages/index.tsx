import React, { useState } from 'react'
import Image from 'next/image'
import { Button, Grid, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Form from '../src/components/Form'
import Input from '../src/components/Input'

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = (data) => {
    console.log(data)
  }

  const handleClickShowPassword = () => {
    setShowPassword((oldValue) => !oldValue)
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

  return (
    <div className="w-full max-w-none max-h-screen h-screen flex flex-col container items-center justify-center m-0 p-10">
      <div className="w-full max-w-none flex items-center justify-center pb-12">
        <Image
          src="/images/Logo.jpg"
          layout="intrinsic"
          width={240}
          height={240}
        />
      </div>

      <Form onSubmit={onSubmit}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} className="pb-4">
            <Input
              label="Email"
              name="email"
              rules={{
                required: {
                  value: true,
                  message: 'Este campo é obrigatório',
                },
                shouldUnregister: true,
              }}
              validate={{
                isEmail: (value: string) => {
                  if (!value.match('@')) return null
                },
              }}
            />
          </Grid>

          <Grid item xs={12} className="pb-4">
            <Input
              label="Senha"
              type="password"
              name="password"
              rules={{
                required: {
                  value: true,
                  message: 'Este campo é obrigatório',
                },
                shouldUnregister: true,
              }}
              InputProps={{
                endAdornment: <></>,
              }}
            />
          </Grid>

          <Grid item xs={8} className="w-full flex !p-0 mt-4">
            <a href="#" className="text-sm md:text-base ml-5">
              Esqueci minha senha
            </a>
          </Grid>

          <Grid item xs={4} className="w-full flex !p-0 mt-4">
            <Button fullWidth type="submit">
              Login
            </Button>
          </Grid>
        </Grid>
      </Form>

      <div className="flex container w-full items-center justify-center mt-20 mb-20">
        <a href="/new-account">Ainda não possui uma conta?</a>
      </div>
    </div>
  )
}

export default Login
