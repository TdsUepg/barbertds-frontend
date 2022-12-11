import React, { useContext, useState, useEffect } from 'react'
import ArrowBack from '@mui/icons-material/ArrowBack'
import ContentCut from '@mui/icons-material/ContentCut'
import Skeleton from '@mui/material/Skeleton'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'
import Card from 'components/Card'
import { AuthContext } from 'contexts/AuthContext'
import type { AuthContextType } from 'contexts/AuthContext'
import type { Appointment } from '../types'
import Icon from 'components/Icon'

interface AppointmentProperties {
  data: {
    appointments: Appointment[]
  }
}

const AppointmentPage: React.FC<AppointmentProperties> = ({ data }) => {
  const snackbar = useSnackbar()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useContext(AuthContext) as AuthContextType

  useEffect(() => {
    if (!data) {
      snackbar.enqueueSnackbar('Houve um erro interno', { variant: 'error' })
    }

    if (data && data.appointments?.length > 0) {
      setIsLoading(false)
    }
  }, [])

  console.log('data', data)

  return (
    <div className="w-full flex flex-col items-center p-4">
      <div className="max-w-[500px] w-full flex flex-col items-center">
        <div className="w-full flex justify-start mb-3">
          <button type="button" onClick={() => router.push('/dashboard')}>
            <ArrowBack className="fill-[#f2c84b]" />
          </button>
        </div>

        <div className="w-full flex flex-col items-center pb-6">
          <h2 className="text-3xl">
            <strong>Meus agendamentos</strong>
          </h2>
        </div>

        {isLoading && (
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
            <Skeleton
              variant="rounded"
              animation="wave"
              className="!bg-gray-500 opacity-40 mt-4 mb-4 !rounded-[20px]"
              width={320}
              height={100}
            />
          </>
        )}

        <div className="w-full flex-grow overflow-y-scroll">
          {!isLoading &&
            data.appointments &&
            data.appointments.length > 0 &&
            data.appointments.map((appointment) => (
              <Card
                key={appointment.id}
                icon={
                  <Icon
                    iconName={appointment.service.iconName}
                    variant="primary"
                  />
                }
                title={appointment.service.name}
                value={Number(appointment.service.value)}
                appointment={{
                  date: appointment.date,
                  endTime: appointment.endTime,
                  startTime: appointment.startTime,
                }}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default AppointmentPage
