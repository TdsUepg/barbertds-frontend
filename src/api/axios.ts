import axios from 'axios'
import type { NextPageContext, NextApiRequest } from 'next'
import type { Request } from 'express'
import { parseCookies } from 'nookies'

type ContextType =
  | Pick<NextPageContext, 'req'>
  | {
      req: NextApiRequest
    }
  | {
      req: Request
    }
  | null
  | undefined

export function getAPIClient(ctx: ContextType) {
  const { 'nextauth.token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:3333/',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
  }
}
