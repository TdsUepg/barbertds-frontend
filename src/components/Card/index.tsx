import React from 'react'
import ArrowRight from '@mui/icons-material/ArrowRight'
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
  date?: string
  startTime?: string
  endTime?: string
}

interface CardProps {
  icon: React.ReactNode
  title: string
  appointment?: Appointment
  value: number
  onClick?: () => void
}

const Card: React.FC<CardProps> = ({
  icon,
  title,
  appointment,
  value,
  onClick,
}) => {
  return (
    <Container onClick={onClick}>
      <div className="icon-container">{icon}</div>

      <div className="card-body-container">
        <p>
          <strong>{title}</strong>
        </p>

        {appointment?.barber && (
          <div className="card-body-barber">
            <p>
              <strong>Barbeiro:</strong> {appointment.barber.name}
            </p>
          </div>
        )}

        {appointment?.client && (
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
            <strong>{parseCurrency(value)}</strong>
          </span>

          {!appointment && (
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
