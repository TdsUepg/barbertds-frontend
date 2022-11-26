import React, { useContext, useState, useEffect } from 'react'
import ArrowBack from '@mui/icons-material/ArrowBack'
import ContentCut from '@mui/icons-material/ContentCut'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'
import Card from 'components/Card'
import { AuthContext } from 'contexts/AuthContext'
import type { AuthContextType } from 'contexts/AuthContext'
import type { Appointment } from '../types'

interface AppointmentProperties {
  appointment: Appointment
}

const Appointment: React.FC<AppointmentProperties> = ({ appointment }) => {
  const snackbar = useSnackbar()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useContext(AuthContext) as AuthContextType

  return (
    <div className="w-full flex flex-col items-center p-4">
      <div className="max-w-[500px] w-full flex flex-col items-center">
        <div className="w-full flex justify-end">
          <button type="button" onClick={() => router.push('/dashboard')}>
            <ArrowBack />
          </button>
        </div>

        <div className="w-full flex flex-col items-start pb-8">
          <h2 className="text-3xl">
            <strong>Olá, {user?.name}!</strong>
          </h2>
          <p className="pt-2">Qual serviço você deseja agendar?</p>
        </div>

        <div className="w-full flex-grow overflow-y-scroll">
          <Card
            key={appointment.serviceStatus}
            icon={<ContentCut />}
            title={appointment.serviceStatus}
            value={Number(appointment.endTime)}
          />
        </div>
      </div>
    </div>
  )
}

export default Appointment
