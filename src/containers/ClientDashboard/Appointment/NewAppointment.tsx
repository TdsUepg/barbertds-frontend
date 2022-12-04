import React, { useContext, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'
import Image from 'next/image'
import ArrowBack from '@mui/icons-material/ArrowBack'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Skeleton from '@mui/material/Skeleton'
import ContentCut from '@mui/icons-material/ContentCut'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import api from 'api'
import Card from 'components/Card'
import Form from 'components/Form'
import Select from 'components/Select'
import { AppointmentContext } from 'contexts/AppointmentContext'
import type { AppointmentContextType } from 'contexts/AppointmentContext'
import type { Barber, DatePickerValue, Service } from '../types'
import { AuthContext } from 'contexts/AuthContext'
import { ptBR } from '@mui/x-date-pickers'

const placeholderImage =
  'https://firebasestorage.googleapis.com/v0/b/teste-cf0ac.appspot.com/o/placeholder.jpg?alt=media&token=a2bdeebe-2e17-4b28-9edb-1220ab549aa5'

interface NewAppointmentForm {
  date: Date
  startTime: string
}

const NewAppointment: React.FC = () => {
  const router = useRouter()
  const snackbar = useSnackbar()
  const { service } = useContext(AppointmentContext) as AppointmentContextType
  const { user } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [barbers, setBarbers] = useState<Barber[]>([])
  const [selectedBarber, setSelectedBarber] = useState<Barber>()
  const [date, setDate] = useState<Date>()

  useEffect(() => {
    if (!service) {
      router.push('/dashboard')
    }
  }, [])

  useEffect(() => {
    if (service) {
      setIsLoading(true)

      const fetchBarbersByService = async () => {
        const response = await api().get(`/barber/service/${service.id}`)

        if (response.data) {
          setBarbers(response.data.barbers)
        }
      }

      fetchBarbersByService()
        .then((data) => {
          setIsLoading(false)
        })
        .catch((err) => {
          console.error(err)
          snackbar.enqueueSnackbar('Houve um erro interno.', {
            variant: 'error',
          })
        })
    }
  }, [])

  const handleSubmit = async (data: NewAppointmentForm) => {
    const formData = {
      ...data,
      barber: selectedBarber as Barber,
      service: service as Service,
      client: user,
      date: date.toISOString().substring(0, 10),
      endTime: data.startTime,
    }

    const response = await api().post('/appointment', formData)

    if (response.data) {
      snackbar.enqueueSnackbar('Serviço agendado!', { variant: 'success' })
    } else {
      snackbar.enqueueSnackbar('Houve um erro interno', { variant: 'error' })
    }

    router.push('/dashboard')
  }

  return (
    <div className="w-full h-screen flex justify-center overflow-hidden">
      <div className="w-full max-w-[600px] h-full flex flex-col items-center px-3 py-3">
        <div className="w-full max-w-none flex items-center justify-start">
          <button type="button" onClick={() => router.push('/dashboard')}>
            <ArrowBack />
          </button>
          <p className="font-bold text-3xl pl-6">{service?.name}</p>
        </div>

        <div className="w-full">
          {!barbers.length && isLoading && (
            <>
              <div className="font-bold mt-4 self-start">
                1 - Selecione um profissional
              </div>
              <div className="w-full mb-[20px]">
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  className="!bg-gray-500 opacity-40 my-[20px] !rounded-[20px]"
                  width="100%"
                  height={160}
                />
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  className="!bg-gray-500 opacity-40 my-[20px] !rounded-[20px]"
                  width="100%"
                  height={160}
                />
              </div>
            </>
          )}

          <div className="w-full mb-[20px] overflow-y-scroll">
            {!isLoading && (
              <div className="font-bold mt-4">
                1 - Selecione um profissional
              </div>
            )}

            {barbers &&
              barbers.map((barber) => (
                <button
                  className={`w-full min-h-[160px] h-1 flex my-[20px] !rounded-[20px] bg-[#333333] ${
                    selectedBarber?.id === barber.id
                      ? 'border-2 border-solid border-[#f2c84b]'
                      : ''
                  }`}
                  key={barber.id}
                  type="button"
                  onClick={() => {
                    setSelectedBarber(barber)
                  }}
                >
                  <div className="relative w-[45%] h-full flex-shrink-0">
                    <Image
                      src={barber.imageUrl || placeholderImage}
                      alt="Imagem do barbeiro"
                      layout="fill"
                      objectFit="cover"
                      style={{
                        borderRadius: '20px 0px 0px 20px',
                        width: '100%',
                        height: 'auto',
                      }}
                    />
                  </div>

                  <span className="grow self-start font-bold pt-3">
                    {barber.name}
                  </span>
                </button>
              ))}
          </div>
        </div>

        <div className="font-bold flex-shrink-0 my-4 mb-6 self-start">
          2 - Selecione um horário
        </div>

        <Form<NewAppointmentForm>
          id="new-appointment-form"
          className="w-full flex flex-col items-center"
          onSubmit={handleSubmit}
          defaultValues={{
            date: undefined,
            startTime: undefined,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                // adapterLocale="pt-BR"
              >
                <DatePicker
                  label="Data"
                  value={date}
                  onChange={(newValue: DatePickerValue | null) => {
                    if (newValue) {
                      setDate(newValue['$d'])
                    }
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  inputFormat="DD/MM/YYYY"
                  disablePast
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6}>
              <Select
                label="Horário"
                id="appointment-startTime-select"
                name="startTime"
                options={[
                  { name: 'Selecione uma opção', value: '' },
                  { name: '14:12', value: '14:12' },
                ]}
              />
            </Grid>
          </Grid>

          <div className="font-bold my-4 self-start">3 - Resumo</div>

          <Card
            icon={<ContentCut />}
            appointment={{
              // date: watchDate,
              // startTime: watchStartTime,
              barber: selectedBarber,
            }}
            title={service?.name as string}
            value={service?.value as number}
          />

          <Button
            className="max-w-[320px] w-full mt-[24px] p-4 font-bold"
            type="submit"
            disabled={!selectedBarber || isLoading}
          >
            Confirmar agendamento
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default NewAppointment
