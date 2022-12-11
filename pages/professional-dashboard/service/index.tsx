import type { GetServerSideProps } from 'next/types'
import { parseCookies } from 'nookies'
import Services from 'containers/BarberDashboard/Services/Service'
import { Service } from 'containers/BarberDashboard/types'
import api from 'api'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    ['nextauth.token']: token,
    ['nextauth.role']: role,
    ['nextauth.id']: id,
  } = parseCookies(ctx)

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

  const response = await api(ctx).get(`/service/barber/${id}`)

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
  return <Services data={data} />
}
