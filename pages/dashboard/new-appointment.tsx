import type { GetServerSideProps } from 'next/types'
import { parseCookies } from 'nookies'
import NewAppointment from 'containers/ClientDashboard/Appointment/NewAppointment'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['nextauth.token']: token, ['nextauth.role']: role } =
    parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      data: {},
    },
  }
}

export default NewAppointment
