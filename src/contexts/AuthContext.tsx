import { createContext, useState, useEffect } from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import api from 'api'

type SignInData = {
  email: string
  password: string
}

type SignInResponse = {
  data: {
    role: string
    token: string
    user: User
  }
}

type User = {
  id?: string
  email: string
  name: string
}

export type AuthContextType = {
  isAuthenticated: boolean
  user: User | null
  setUser: (user: User | null) => void
  signIn: (data: SignInData) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user

  useEffect(() => {
    const {
      'nextauth.token': token,
      'nextauth.role': role,
      'nextauth.email': email,
    } = parseCookies()

    if (token) {
      if (role === 'client') {
        api()
          .get(`/client/${email}`)
          .then((response) => {
            setUser(response.data)
          })
      }

      if (role === 'barber') {
        api()
          .get(`/barber/${email}`)
          .then((response) => {
            setUser(response.data.user)
          })
      }
    }
  }, [])

  async function signIn({ email, password }: SignInData) {
    const { data }: SignInResponse = await api().post('/user/login', {
      email,
      password,
    })

    if (data.token) {
      setCookie(undefined, 'nextauth.token', data.token, {
        maxAge: 60 * 60 * 24, // 24 hour
      })

      api().defaults.headers['Authorization'] = `Bearer ${data.token}`

      setCookie(undefined, 'nextauth.role', data.role)

      setCookie(undefined, 'nextauth.email', email)

      if (data.token) {
        if (data.role === 'client') {
          const response = await api().get(`/client/${email}`)

          setCookie(undefined, 'nextauth.id', response.data.id)

          setUser(response.data)
        }

        if (data.role === 'barber') {
          const response = await api().get(`/barber/${email}`)

          setCookie(undefined, 'nextauth.id', response.data.id)

          setUser(response.data)
        }
      }
    }
  }

  async function signOut() {
    destroyCookie(undefined, 'nextauth.role')
    destroyCookie(undefined, 'nextauth.token')
    destroyCookie(undefined, 'nextauth.email')
    destroyCookie(undefined, 'nextauth.id')
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, setUser, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
