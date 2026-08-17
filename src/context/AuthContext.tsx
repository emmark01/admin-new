import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

type SessionUser = {
  name: string
  email: string
  role: string
}

type AuthContextValue = {
  user: SessionUser | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const DEMO_USER: SessionUser = {
  name: 'Ava Chen',
  email: 'ava.chen@northwind.io',
  role: 'Admin',
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(DEMO_USER)

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: (email, password) => {
        if (!email || password.length < 4) return false
        setUser({ ...DEMO_USER, email })
        return true
      },
      logout: () => setUser(null),
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
