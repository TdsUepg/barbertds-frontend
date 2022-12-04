import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useSnackbar } from 'notistack'
import Form from 'components/Form'
import Input from 'components/Input'
import api from 'api'
import { useRouter } from 'next/router'

type NewAccountInput = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const NewAccount: React.FC = () => {
  const snackbar = useSnackbar()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = (data: NewAccountInput) => {
    if (data.password === data.confirmPassword) {
      void api()
        .post('/client', data)
        .then((response) => {
          if (response.data) {
            snackbar.enqueueSnackbar('Cadastro realizado com sucesso!', {
              variant: 'success',
            })

            router.push('/')
          }
        })
        .catch((err) => {
          console.error(err)
          snackbar.enqueueSnackbar(
            'Houve um erro no cadastro, verifique os campos novamente',
            {
              variant: 'error',
            },
          )
        })
    }
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
    <div className="w-full max-w-none flex flex-col container items-center justify-center m-0 p-10">
      <div className="w-full max-w-none flex items-center justify-center pb-12">
        <Image
          src="/images/Logo.jpg"
          layout="intrinsic"
          width={180}
          height={180}
        />
      </div>

      <div>
        <h1 className="text-xl font-bold">Criar sua conta</h1>
      </div>

      <Form<NewAccountInput> id="new-account-form" onSubmit={onSubmit}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          className="!w-full m-0"
        >
          <Grid item xs={12} className="pb-4 !pl-0">
            <Input
              required
              label="Nome"
              name="name"
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

          <Grid item xs={12} className="pb-4 !pl-0">
            <Input
              required
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

          <Grid item xs={12} className="pb-4 !pl-0">
            <Input
              required
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} className="pb-4 !pl-0">
            <Input
              required
              label="Confirmar Senha"
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
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
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>

          <Grid item xs={4} className="pb-4 !pl-0 ml-auto">
            <Button fullWidth type="submit" className="pr-12 pl-12">
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      </Form>

      <div className="flex container w-full items-center justify-center mt-6 mb-20">
        <Link href="/">Já tenho uma conta</Link>
      </div>
    </div>
  )
}

export default NewAccount
