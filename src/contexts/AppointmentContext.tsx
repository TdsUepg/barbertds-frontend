import React, { createContext, useState } from 'react'
import type { IService } from './types'

export type AppointmentContextType = {
  service: IService | null
  setService: (service: IService) => void
}

const AppointmentContext = createContext<AppointmentContextType | null>(null)

const AppointmentProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [service, setService] = useState<IService | null>(null)

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
