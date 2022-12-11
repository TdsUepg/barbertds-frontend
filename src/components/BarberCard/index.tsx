import React from 'react'
import ArrowRight from '@mui/icons-material/ArrowRight'
import parseCurrency from '../../utils/parseCurrency'
import { Container } from '../Card/styles'

interface CardProps {
  icon: React.ReactNode
  title: string
  value: number
  onClick?: () => void
}

const Card: React.FC<CardProps> = ({
  icon,
  title,
  value,
  onClick = undefined,
}) => {
  return (
    <Container
      type="button"
      onClick={onClick}
      style={{ cursor: !!onClick ? 'pointer' : 'default' }}
    >
      <div className="icon-container">{icon}</div>

      <div className="card-body-container">
        <p>
          <strong>{title}</strong>
        </p>

        <div className="card-body-value">
          <span>
            <strong>{parseCurrency(value)}</strong>
          </span>

          <div className="card-body-schedule">
            <p>Editar</p>
            <ArrowRight />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Card
