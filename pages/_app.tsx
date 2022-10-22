import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import { theme } from '../styles/theme'
import { AppointmentProvider } from 'contexts/AppointmentContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={2} dense>
        <AppointmentProvider>
          <Component {...pageProps} />
        </AppointmentProvider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default MyApp
