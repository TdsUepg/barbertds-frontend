import { useState } from 'react'
import type { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import ArrowBack from '@mui/icons-material/ArrowBack'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import Input from 'components/Input'
import Form from 'components/Form'
import Icon from 'components/Icon'
import classNames from 'classnames'
import Select from 'components/Select'
import { Option } from '../types'
import api from 'api'
import CurrencyInput from 'components/CurrencyMask'

type NewServiceInput = {
  icon: string
  name: string
  value: number
  serviceTime: string
}

function parseValue(value: string): number {
  let parsedValue = value.split('$')[1]

  parsedValue = parsedValue.replaceAll(/\./g, '')

  const isDecimalValue = /\,/g.test(value)

  if (isDecimalValue) {
    const parsedValueSplitted = parsedValue.split(',')

    if (parsedValueSplitted[1].length === 1) {
      parsedValueSplitted[1] = parsedValueSplitted[1].concat('0')
    }

    parsedValue = parsedValueSplitted[0] + parsedValueSplitted[1]
  } else {
    parsedValue = parsedValue.concat('00')
  }

  return Number(parsedValue)
}

export default function NewService(): ReactElement {
  const snackbar = useSnackbar()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [serviceTime, setServiceTime] = useState<Option>()
  const [selectedIcon, setSelectedIcon] = useState('')
  const [inputValue, setInputValue] = useState('')

  function onSubmit(data: NewServiceInput): void {
    setIsLoading(true)
    let serviceValue = inputValue

    if (serviceValue === '' || typeof serviceValue === 'undefined') {
      serviceValue = '0'
    }

    const input = {
      ...data,
      value: parseValue(serviceValue),
      iconName: selectedIcon,
    }

    void api()
      .post('/service', input)
      .then((response) => {
        if (response.data) {
          snackbar.enqueueSnackbar('Serviço registrado com sucesso', {
            variant: 'success',
          })
        }
      })
      .catch((err) => {
        snackbar.enqueueSnackbar('Houve um erro ao salvar serviço', {
          variant: 'error',
        })
      })
      .finally(() => {
        setIsLoading(false)
        router.back()
      })
  }

  function onSelectIcon(iconName: string): void {
    setSelectedIcon(iconName)
  }

  function onSetValue(value: string): void {
    setInputValue(value)
  }

  return (
    <div className="w-full h-screen flex flex-col items-center p-4">
      <div className="max-w-[500px] w-full h-full flex flex-col items-center">
        <div className="w-full flex justify-start mb-3">
          <button
            type="button"
            onClick={() => router.push('/professional-dashboard')}
            disabled={isLoading}
          >
            <ArrowBack className="fill-[#f2c84b]" />
          </button>

          <h2 className="text-2xl ml-2">
            <strong>Cadastro de um novo serviço</strong>
          </h2>
        </div>

        <div className="bg-[#f2c84b] w-full h-[200px] flex flex-col rounded-md">
          <h3 className="text-2xl text-black font-medium pt-3 pl-3">Ícone</h3>

          <div className="h-full flex overflow-x-scroll items-center px-3 gap-6">
            <Icon
              className={classNames([
                'p-3',
                {
                  'border-[3px] border-black rounded-md':
                    selectedIcon === 'haircut',
                },
              ])}
              iconName="haircut"
              onClick={() => onSelectIcon('haircut')}
            />
            <Icon
              className={classNames([
                'p-3',
                {
                  'border-[3px] border-black rounded-md':
                    selectedIcon === 'beard',
                },
              ])}
              iconName="beard"
              onClick={() => onSelectIcon('beard')}
            />
            <Icon
              className={classNames([
                'p-3',
                {
                  'border-[3px] border-black rounded-md':
                    selectedIcon === 'haircut-beard',
                },
              ])}
              iconName="haircut-beard"
              onClick={() => onSelectIcon('haircut-beard')}
            />
            <Icon
              className={classNames([
                'p-3',
                {
                  'border-[3px] border-black rounded-md':
                    selectedIcon === 'hair-color',
                },
              ])}
              iconName="hair-color"
              onClick={() => onSelectIcon('hair-color')}
            />
          </div>
        </div>

        <Form<NewServiceInput> id="new-account-form" onSubmit={onSubmit}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
            className="!w-full m-0 mt-3"
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
              />
            </Grid>

            <Grid item xs={12} className="pb-4 !pl-0">
              <CurrencyInput inputmode="text" onSetValue={onSetValue} />
            </Grid>

            <Grid item xs={12} className="pb-4 !pl-0">
              <Select
                required
                label="Duração"
                name="serviceTime"
                value={serviceTime}
                onChange={(event) => {
                  setServiceTime(event.target)
                }}
                rules={{
                  required: {
                    value: true,
                    message: 'Este campo é obrigatório',
                  },
                  shouldUnregister: true,
                }}
                options={[
                  { name: '90 minutos', value: '90' },
                  { name: '60 minutos', value: '60' },
                  { name: '30 minutos', value: '30' },
                ]}
              />
            </Grid>

            <Grid item xs={4} className="pb-4 !pl-0 ml-auto mr-auto">
              <Button
                fullWidth
                type="submit"
                className="pr-12 pl-12"
                disabled={isLoading}
              >
                Salvar
              </Button>
            </Grid>
          </Grid>
        </Form>
      </div>
    </div>
  )
}
