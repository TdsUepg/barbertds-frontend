import type { GetServerSideProps } from 'next/types'
import { parseCookies } from 'nookies'
import EditService from 'containers/BarberDashboard/Services/EditService'

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

  if (role === 'client') {
    return {
      redirect: {
        destination: '/dashboard',
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

export default function Page() {
  return <EditService />
}
