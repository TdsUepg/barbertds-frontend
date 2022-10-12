import React from 'react'
import { ArrowRight } from '@mui/icons-material'
import formatDate from '../../utils/formatDate'
import parseCurrency from '../../utils/parseCurrency'
import { Container } from './styles'

type Appointment = {
  client?: {
    name: string
  }
  barber?: {
    name: string
  }
  value: number
  date?: string
  startTime?: string
  endTime?: string
}

interface CardProps {
  icon: React.ReactNode
  title: string
  value: number
  appointment: Appointment
  onClick: () => void
}

const Card: React.FC<CardProps> = ({ icon, title, appointment, onClick }) => {
  return (
    <Container onClick={onClick}>
      <div className="icon-container">{icon}</div>

      <div className="card-body-container">
        <p>
          <strong>{title}</strong>
        </p>

        {appointment.barber && (
          <div className="card-body-barber">
            <p>
              <strong>Barbeiro:</strong> {appointment.barber.name}
            </p>
          </div>
        )}

        {appointment.client && (
          <div className="card-body-client">
            <p>
              <strong>Cliente:</strong> {appointment.client.name}
            </p>
          </div>
        )}

        <div className="card-body-value">
          {appointment?.date && (
            <div className="card-body-appointment">
              <p>{formatDate(appointment.date)}</p>
              <p>
                {appointment.startTime} - {appointment.endTime}
              </p>
            </div>
          )}

          <span>
            <strong>{parseCurrency(appointment.value)}</strong>
          </span>

          {!appointment?.date && (
            <div className="card-body-schedule">
              <p>Agendar</p>
              <ArrowRight />
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}

export default Card
