import { useEffect, useState, useContext } from 'react'
import type { ReactElement } from 'react'
import Link from 'next/link'
import ArrowBack from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import Skeleton from '@mui/material/Skeleton'
import Card from 'components/BarberCard'
import type { Service } from '../types'
import Icon from 'components/Icon'
import {
  AppointmentContext,
  AppointmentContextType,
} from 'contexts/AppointmentContext'

interface ServicesProperties {
  data: {
    services: Service[]
  }
}

export default function Services({ data }: ServicesProperties): ReactElement {
  const snackbar = useSnackbar()
  const router = useRouter()
  const { setService } = useContext(
    AppointmentContext,
  ) as AppointmentContextType
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!data) {
      snackbar.enqueueSnackbar('Houve um erro interno', { variant: 'error' })
    }

    if (data && data.services) {
      setIsLoading(false)
    }
  }, [])

  return (
    <div className="w-full h-screen flex flex-col items-center p-4">
      <div className="max-w-[500px] w-full h-full flex flex-col items-center">
        <div className="w-full flex justify-start mb-3">
          <button
            type="button"
            onClick={() => router.push('/professional-dashboard')}
          >
            <ArrowBack className="fill-[#f2c84b]" />
          </button>
        </div>

        <div className="w-full flex flex-col items-center pb-6">
          <h2 className="text-3xl">
            <strong>Meus serviços</strong>
          </h2>
        </div>

        {isLoading && (
          <>
            <Skeleton
              variant="rounded"
              animation="wave"
              className="!bg-gray-500 opacity-40 mt-4 mb-4 !rounded-[20px]"
              width="100%"
              height={100}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              className="!bg-gray-500 opacity-40 mt-4 mb-4 !rounded-[20px]"
              width="100%"
              height={100}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              className="!bg-gray-500 opacity-40 mt-4 mb-4 !rounded-[20px]"
              width="100%"
              height={100}
            />
          </>
        )}

        <div className="w-full flex-grow overflow-y-scroll">
          {!isLoading &&
            data.services &&
            data.services.length > 0 &&
            data.services.map((service) => (
              <Card
                icon={<Icon iconName={service.iconName} variant="primary" />}
                title={service.name}
                value={service.value}
                onClick={() => {
                  setService(service)
                  router.push(
                    `/professional-dashboard/service/edit/${service.id}`,
                  )
                }}
              />
            ))}
        </div>

        <div className="flex-shrink-0 pt-2">
          <Link href="/professional-dashboard/service/new">
            <span className="font-bold text-[#f2c84b]">
              Adicionar novo serviço
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
