import { createContext, useState, useEffect } from 'react'
import { setCookie, parseCookies } from 'nookies'
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

type AuthContextType = {
  isAuthenticated: boolean
  user: User
  setUser: (user: User) => void
  signIn: (data: SignInData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()

    if (token) {
      api.get('/client').then((response) => {
        setUser(response.data.user)
      })
    }
  }, [])

  async function signIn({ email, password }: SignInData) {
    const { data }: SignInResponse = await api.post('/user/login', {
      email,
      password,
    })

    if (data.token) {
      setCookie(undefined, 'nextauth.token', data.token, {
        maxAge: 60 * 60 * 1, // 1 hour
      })

      api.defaults.headers['Authorization'] = `Bearer ${data.token}`

      setCookie(undefined, 'nextauth.role', data.role)

      setUser(data.user)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
