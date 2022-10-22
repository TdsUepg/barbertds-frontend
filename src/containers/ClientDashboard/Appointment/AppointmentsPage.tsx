import React from 'react'
import Link from 'next/link'
// import { Container } from './styles';

const PatientSchedule: React.FC = () => {
  return (
    <div>
      <p>TESTE</p>
      <Link href="/dashboard/appointment/1">Ir para um único agendamento</Link>
    </div>
  )
}

export default PatientSchedule
