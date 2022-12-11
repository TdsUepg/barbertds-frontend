import { Icons } from 'components/Icon'

export interface Barber {
  id: string
  name: string
  imageUrl: string
}

export interface Service {
  id: string
  name: string
  value: number
  serviceTime: string
  iconName: Icons
}

enum ServiceStatus {
  WAITING = 'WAITING',
  CONCLUDED = 'CONCLUDED',
}

export interface Appointment {
  id: string
  date: string
  startTime: string
  endTime: string
  service: Service
  serviceStatus: ServiceStatus
}

export interface DatePickerValue {
  $d: Date
}

export type Option = {
  name: string
  value: string | number
}
