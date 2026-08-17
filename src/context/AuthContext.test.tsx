import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { AuthProvider, useAuth } from './AuthContext'

function wrapper({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}

describe('AuthContext', () => {
  it('throws when used outside the provider', () => {
    expect(() => renderHook(() => useAuth())).toThrow('useAuth must be used within AuthProvider')
  })

  it('starts with the demo admin session', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    expect(result.current.user?.email).toBe('ava.chen@northwind.io')
    expect(result.current.user?.role).toBe('Admin')
  })

  it('rejects a short password and accepts a valid login', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    act(() => {
      expect(result.current.login('admin@northwind.io', 'abc')).toBe(false)
    })

    act(() => {
      expect(result.current.login('admin@northwind.io', 'admin')).toBe(true)
    })
    expect(result.current.user?.email).toBe('admin@northwind.io')
  })

  it('clears the session on logout', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    act(() => {
      result.current.logout()
    })
    expect(result.current.user).toBeNull()
  })
})
