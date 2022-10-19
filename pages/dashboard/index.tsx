import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import Card from '../../src/components/Card'
import ContentCut from '@mui/icons-material/ContentCut'
import api from '../../src/api'
import { Service } from './types'

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [services, setServices] = useState<Service[]>([])

  const fetchServices = useCallback(async () => {}, [])

  useEffect(() => {
    setIsLoading(true)

    const fetchServices = async () => {
      const response = await api.get('/service')

      if (response.data) {
        setServices(response.data)
      }
    }

    fetchServices().catch((err) => console.log(err))

    setIsLoading(false)
  }, [])

  return (
    <div className="w-full flex flex-col items-center p-6">
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

      {services.map((service) => (
        <Card
          icon={<ContentCut />}
          title={service.name}
          value={service.value}
          onClick={() => {
            console.log('CAVALO')
          }}
        />
      ))}

      <div className="mt-8">
        <Link href="/dashboard/patient-schedule">
          <span className="font-bold text-[#f2c84b]">
            Ver meus agendamentos
          </span>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard
