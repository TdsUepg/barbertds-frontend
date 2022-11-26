import type { GetServerSideProps } from 'next/types'
import { parseCookies } from 'nookies'
import api from 'api'
import ClientDashboard from 'containers/ClientDashboard'
import type { Service } from 'containers/ClientDashboard/types'

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

  const response = await api(ctx).get('/service')

  if (role === 'barber') {
    return {
      redirect: {
        destination: '/professional-dashboard',
        permanent: false,
      },
    }
  }

  return {
    props: {
      data: response.data,
    },
  }
}

interface PageProperties {
  data: {
    services: Service[]
  }
}

export default function Page({ data }: PageProperties) {
  return <ClientDashboard data={data} />
}
