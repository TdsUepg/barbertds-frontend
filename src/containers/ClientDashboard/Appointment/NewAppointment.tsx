import React, { useContext, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'
import Image from 'next/image'
// import { useFormContext, useWatch } from 'react-hook-form'
import ArrowBack from '@mui/icons-material/ArrowBack'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import ContentCut from '@mui/icons-material/ContentCut'
import api from 'api'
import Card from 'components/Card'
import Form from 'components/Form'
import Select from 'components/Select'
import { AppointmentContext } from 'contexts/AppointmentContext'
import type { AppointmentContextType } from 'contexts/AppointmentContext'
import type { Barber, Service } from '../types'
import { AuthContext } from 'contexts/AuthContext'

const placeholderImage =
  'https://firebasestorage.googleapis.com/v0/b/teste-cf0ac.appspot.com/o/placeholder.jpg?alt=media&token=a2bdeebe-2e17-4b28-9edb-1220ab549aa5'

interface NewAppointmentForm {
  date: string
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

  useEffect(() => {
    if (!service) {
      router.push('/dashboard')
    }
  }, [])

  useEffect(() => {
    if (service) {
      setIsLoading(true)

      const fetchBarbersByService = async () => {
        const response = await api.get(`/barber/service/${service.id}`)

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

  const handleSubmit = (data: NewAppointmentForm) => {
    const formData = {
      barber: selectedBarber as Barber,
      service: service as Service,
      client: user,
      ...data,
    }

    console.log('form data', formData)

    router.push('/dashboard')
  }

  return (
    <div className="w-full max-w-none container flex items-center justify-center p-10">
      <div className="w-full max-w-[600px] flex flex-col items-center">
        <div className="w-full max-w-none flex items-center justify-start">
          <button type="button" onClick={() => router.push('/dashboard')}>
            <ArrowBack />
          </button>
          <p className="font-bold text-3xl pl-6">{service?.name}</p>
        </div>

        <div className="w-full flex flex-col items-center">
          {!barbers.length && isLoading && (
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
          )}

          <div className="w-full mb-[20px]">
            <div className="font-bold mt-4">1 - Selecione um barbeiro</div>
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

        <div className="font-bold my-4 mb-6 self-start">
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
              <Select
                label="Data"
                id="appointment-date-select"
                name="date"
                options={[
                  { name: 'Selecione uma opção', value: '' },
                  { name: '14/05/2022', value: '14/05/2022' },
                ]}
              />
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
