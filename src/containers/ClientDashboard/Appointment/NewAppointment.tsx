import React, { useContext, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'
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

interface NewAppointmentForm {
  date: string
  startTime: string
}

const NewAppointment: React.FC = () => {
  const router = useRouter()
  const snackbar = useSnackbar()
  const { service } = useContext(AppointmentContext) as AppointmentContextType
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
      ...data,
    }

    console.log('form data', formData)

    router.push('/dashboard')
  }

  return (
    <div className="w-full flex flex-col items-center p-6">
      <button onClick={() => router.push('/dashboard')}>
        <ArrowBack />
      </button>
      {service?.name}

      <div className="w-full flex flex-col items-center">
        {!barbers.length && (
          <>
            <Skeleton
              variant="rounded"
              animation="wave"
              className="!bg-gray-500 opacity-40 mt-4 mb-4 !rounded-[20px]"
              width={320}
              height={100}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              className="!bg-gray-500 opacity-40 mt-4 mb-4 !rounded-[20px]"
              width={320}
              height={100}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              className="!bg-gray-500 opacity-40 mt-4 mb-4 !rounded-[20px]"
              width={320}
              height={100}
            />
          </>
        )}

        {barbers &&
          barbers.map((barber) => (
            <button
              className="pt-4 pb-4"
              key={barber.id}
              type="button"
              onClick={() => {
                setSelectedBarber(barber)
              }}
            >
              {barber.name}
            </button>
          ))}
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
              id="appointment-date-select"
              name="date"
              options={[
                { name: 'Selecione uma opção', value: '' },
                { name: '14:12', value: '14:12' },
              ]}
            />
          </Grid>

          <Grid item xs={6}>
            <Select
              id="appointment-startTime-select"
              name="startTime"
              options={[
                { name: 'Selecione uma opção', value: '' },
                { name: '14:12', value: '14:12' },
              ]}
            />
          </Grid>
        </Grid>

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
          disabled={!selectedBarber}
        >
          Confirmar agendamento
        </Button>
      </Form>
    </div>
  )
}

export default NewAppointment
