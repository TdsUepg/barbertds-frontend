import { useState, useContext, useMemo } from 'react'
import type { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import api from 'api'
import ArrowBack from '@mui/icons-material/ArrowBack'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import Input from 'components/Input'
import Form from 'components/Form'
import Icon, { Icons } from 'components/Icon'
import classNames from 'classnames'
import Select from 'components/Select'
import { Option } from '../types'
import {
  AppointmentContext,
  AppointmentContextType,
} from 'contexts/AppointmentContext'
import CurrencyInput from 'components/CurrencyMask'

type EditServiceInput = {
  iconName: Icons
  name: string
  value: number
  serviceTime: string
}

function parseValueToNumber(value: string): number {
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

function parseValueToString(value: number | undefined): string {
  if (!value) return '0,00'

  let parsedValue = String(value / 100).replace('.', ',')
  const integerPart = parsedValue.split(',')[0]
  const decimalPart = parsedValue.split(',')[1]

  if (decimalPart && decimalPart.length === 1) {
    parsedValue = integerPart + ',' + decimalPart.concat('0')
  } else if (!decimalPart) {
    parsedValue = integerPart + ',00'
  } else {
    parsedValue = integerPart + ',' + decimalPart
  }

  return parsedValue
}

export default function Edit(): ReactElement {
  const snackbar = useSnackbar()
  const router = useRouter()
  const { service } = useContext(AppointmentContext) as AppointmentContextType

  const [isLoading, setIsLoading] = useState(false)
  const [serviceTime, setServiceTime] = useState<Option>()
  const [selectedIcon, setSelectedIcon] = useState(service?.iconName)

  const price = useMemo(() => service?.value, [service])
  const [inputValue, setInputValue] = useState(price)

  function onSubmit(data: EditServiceInput): void {
    setIsLoading(true)
    let serviceValue = String(inputValue)

    if (serviceValue === '' || typeof serviceValue === 'undefined') {
      serviceValue = '0'
    }

    const input = {
      ...data,
      value: parseValueToNumber(serviceValue),
      iconName: selectedIcon,
    }

    if (service) {
      void api()
        .put(`/service/${service.id}`, input)
        .then((response) => {
          if (response.data) {
            snackbar.enqueueSnackbar('Serviço atualizado com sucesso', {
              variant: 'success',
            })
          }
        })
        .catch((err) => {
          snackbar.enqueueSnackbar('Houve um erro ao atualizar serviço', {
            variant: 'error',
          })
        })
        .finally(() => {
          setIsLoading(false)
          router.back()
        })
    }
  }

  function onSelectIcon(iconName: Icons): void {
    setSelectedIcon(iconName)
  }

  function onSetValue(value: string): void {
    setInputValue(parseValueToNumber(value))
  }

  return (
    <div className="w-full h-screen flex flex-col items-center p-4">
      <div className="max-w-[500px] w-full h-full flex flex-col items-center">
        <div className="w-full flex justify-start mb-3">
          <button
            type="button"
            onClick={() => router.push('/professional-dashboard/service')}
            disabled={isLoading}
          >
            <ArrowBack className="fill-[#f2c84b]" />
          </button>

          <h2 className="text-2xl ml-2">
            <strong>{service?.name}</strong>
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

        <Form<EditServiceInput>
          id="new-account-form"
          onSubmit={onSubmit}
          defaultValues={{
            name: service?.name,
            value: service?.value,
          }}
        >
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
              <CurrencyInput
                placeholder={
                  service?.value
                    ? `R$ ${parseValueToString(service.value)}`
                    : undefined
                }
                inputmode="text"
                onSetValue={onSetValue}
              />
            </Grid>

            <Grid item xs={12} className="pb-4 !pl-0">
              <Select
                required
                label="Duração"
                name="serviceTime"
                defaultValue={service?.serviceTime}
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
