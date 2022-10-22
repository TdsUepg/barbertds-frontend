import api from 'api'
import ClientDashboard from 'containers/ClientDashboard'
import type { Service } from 'containers/ClientDashboard/types'

export async function getStaticProps() {
  const response = await api.get('/service')

  return { props: { data: response.data } }
}

interface PageProperties {
  data: {
    services: Service[]
  }
}

export default function Page({ data }: PageProperties) {
  return <ClientDashboard data={data} />
}
