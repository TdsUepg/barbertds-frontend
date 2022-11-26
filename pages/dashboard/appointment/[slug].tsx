import type { GetServerSideProps } from 'next/types'
import { parseCookies } from 'nookies'
import Appointment from 'containers/ClientDashboard/Appointment/Appointment'

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

export default Appointment
