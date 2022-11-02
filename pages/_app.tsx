import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import { theme } from '../styles/theme'
import { AuthProvider } from 'contexts/AuthContext'
import { AppointmentProvider } from 'contexts/AppointmentContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={2} dense>
        <AuthProvider>
          <AppointmentProvider>
            <Component {...pageProps} />
          </AppointmentProvider>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default MyApp
