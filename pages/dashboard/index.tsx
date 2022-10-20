import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Card from '../../src/components/Card'
import ContentCut from '@mui/icons-material/ContentCut'
import Skeleton from '@mui/material/Skeleton'
import api from '../../src/api'
import { Service } from './types'

const Dashboard: React.FC = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    setIsLoading(true)

    const fetchServices = async () => {
      const response = await api.get('/service')

      if (response.data) {
        setServices(response.data.services)
      }
    }

    fetchServices()
      .then((data) => {
        setIsLoading(false)
      })
      .catch((err) => console.log(err))
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
          services.length > 0 &&
          services.map((service) => (
            <Card
              key={service.name}
              icon={<ContentCut />}
              title={service.name}
              value={service.value}
              onClick={() => {
                router.push('/dashboard/appointment/new')
              }}
            />
          ))}

        <div className="mt-8">
          <Link href="/dashboard/patient-appointment">
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
