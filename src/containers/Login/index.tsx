import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Form from 'components/Form'
import Input from 'components/Input'

interface ILoginForm {
  email: string
  password: string
}

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = (data: ILoginForm) => {
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

      <Form<ILoginForm> id="login-form" onSubmit={onSubmit}>
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
                  if (!value.match('@')) return undefined
                },
              }}
            />
          </Grid>

          <Grid item xs={12} className="pb-4">
            <Input
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              name="password"
              rules={{
                required: {
                  value: true,
                  message: 'Este campo é obrigatório',
                },
                shouldUnregister: true,
              }}
              inputProps={{
                InputProps: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        className="!bg-transparent"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>

          <Grid item xs={8} className="w-full flex !p-0 mt-4">
            <Link href="/forgot-password" className="text-sm md:text-base ml-5">
              Esqueci minha senha
            </Link>
          </Grid>

          <Grid item xs={4} className="w-full flex !p-0 mt-4">
            <Button fullWidth type="submit">
              Login
            </Button>
          </Grid>
        </Grid>
      </Form>

      <div className="flex container w-full items-center justify-center mt-20 mb-20">
        <Link href="/new-account">Ainda não possui uma conta?</Link>
      </div>
    </div>
  )
}

export default Login