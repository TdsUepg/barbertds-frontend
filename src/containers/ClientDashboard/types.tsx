export interface Barber {
  id: string
  name: string
  imageUrl: string
}

export interface Service {
  id: string
  name: string
  value: number
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
  serviceStatus: ServiceStatus
}

export interface DatePickerValue {
  $d: Date
}
