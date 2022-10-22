import React, { useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import ContentCut from '@mui/icons-material/ContentCut'
import Skeleton from '@mui/material/Skeleton'
import { AppointmentContext } from 'contexts/AppointmentContext'
import type { AppointmentContextType } from 'contexts/AppointmentContext'
import Card from 'components/Card'
import type { Service } from './types'

interface DashBoardProperties {
  data: {
    services: Service[]
  }
}

const Dashboard: React.FC<DashBoardProperties> = ({ data }) => {
  const snackbar = useSnackbar()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const { setService } = useContext(
    AppointmentContext,
  ) as AppointmentContextType

  useEffect(() => {
    if (!data) {
      snackbar.enqueueSnackbar('Houve um erro interno', { variant: 'error' })
    }

    if (data && data.services) {
      setIsLoading(false)
    }
  }, [])

  return (
    <div className="w-full flex flex-col items-center p-4">
      <div className="max-w-[500px] w-full flex flex-col items-center">
        <div className="w-full flex justify-end">
          <Link href="/">
            <span className="text-xl text-[#f2c84b]">Sair</span>
          </Link>
        </div>

        <div className="w-full flex flex-col items-start pb-8">
          <h2 className="text-3xl">
            <strong>Olá, João!</strong>
          </h2>
          <p className="pt-2">Qual serviço você deseja agendar?</p>
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
          </>
        )}

        {!isLoading &&
          data.services &&
          data.services.length > 0 &&
          data.services.map((service) => (
            <Card
              key={service.name}
              icon={<ContentCut />}
              title={service.name}
              value={service.value}
              onClick={() => {
                setService(service)
                router.push('/dashboard/new-appointment')
              }}
            />
          ))}

        <div className="mt-8">
          <Link href="/dashboard/appointment">
            <span className="font-bold text-[#f2c84b]">
              Ver meus agendamentos
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
