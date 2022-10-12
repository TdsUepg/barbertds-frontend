import React from 'react'
import Card from '../../src/components/Card'
import { ContentCut } from '@mui/icons-material'
// import { Container } from './styles';

const Dashboard: React.FC = () => {
  const appointment = {
    client: {
      name: 'Miguel Angelo',
    },
    barber: {
      name: 'Miguel Angel',
    },
    serviceName: 'Corte de cabelo',
    date: '2022-05-14',
    startTime: '16:30',
    endTime: '17:00',
    value: 3500,
  }

  return (
    <div className="w-full flex flex-col items-center pt-12">
      <Card
        icon={<ContentCut />}
        title={appointment.serviceName}
        value={appointment.value}
        appointment={appointment}
        onClick={() => {
          console.log('CAVALO')
        }}
      />

      <Card
        icon={<ContentCut />}
        title="Barba"
        value={2450}
        appointment={appointment}
      />

      <Card
        icon={<ContentCut />}
        title="Cabelo + Barba"
        value={2450}
        appointment={appointment}
      />
    </div>
  )
}

export default Dashboard
