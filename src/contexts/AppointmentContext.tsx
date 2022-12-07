import React, { createContext, useState } from 'react'
import type { Service } from './types'

export type AppointmentContextType = {
  service: Service | null
  setService: (service: Service) => void
}

const AppointmentContext = createContext<AppointmentContextType | null>(null)

const AppointmentProvider = ({ children }: React.PropsWithChildren) => {
  const [service, setService] = useState<Service | null>(null)

  return (
    <AppointmentContext.Provider
      value={{
        service,
        setService,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  )
}

export { AppointmentProvider, AppointmentContext }
