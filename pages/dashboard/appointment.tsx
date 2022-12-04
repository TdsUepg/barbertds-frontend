import type { GetServerSideProps } from 'next/types'
import { parseCookies } from 'nookies'
import api from 'api'
import AppointmentsPage from 'containers/ClientDashboard/Appointment/AppointmentsPage'
import { Appointment } from 'containers/ClientDashboard/types'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['nextauth.token']: token, ['nextauth.email']: email } =
    parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const response = await api(ctx).get(`/appointment/client/${email}`)

  return {
    props: {
      data: response.data,
    },
  }
}

interface PageProperties {
  data: {
    appointments: Appointment[]
  }
}

export default function Page({ data }: PageProperties) {
  return <AppointmentsPage data={data} />
}
