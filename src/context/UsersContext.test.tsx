import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { UsersProvider, useUsers } from './UsersContext'

function wrapper({ children }: { children: ReactNode }) {
  return <UsersProvider>{children}</UsersProvider>
}

describe('UsersContext', () => {
  it('throws when used outside the provider', () => {
    expect(() => renderHook(() => useUsers())).toThrow('useUsers must be used within UsersProvider')
  })

  it('loads seed users and looks them up by id', () => {
    const { result } = renderHook(() => useUsers(), { wrapper })
    expect(result.current.users.length).toBeGreaterThan(0)
    expect(result.current.getUser('usr_1001')?.name).toBe('Ava Chen')
    expect(result.current.getUser('missing')).toBeUndefined()
  })

  it('creates a user and records activity', () => {
    const { result } = renderHook(() => useUsers(), { wrapper })
    const before = result.current.users.length

    act(() => {
      result.current.createUser({
        name: 'Test User',
        email: 'test.user@northwind.io',
        role: 'viewer',
        status: 'invited',
        department: 'QA',
      })
    })

    expect(result.current.users).toHaveLength(before + 1)
    expect(result.current.users[0]?.name).toBe('Test User')
    expect(result.current.users[0]?.id).toMatch(/^usr_\d+$/)
    expect(result.current.activity[0]?.action).toBe('Created user')
  })

  it('updates, suspends, and deletes a user', () => {
    const { result } = renderHook(() => useUsers(), { wrapper })

    act(() => {
      result.current.updateUser('usr_1008', { department: 'Sales' })
    })
    expect(result.current.getUser('usr_1008')?.department).toBe('Sales')

    act(() => {
      result.current.setStatus(['usr_1008'], 'suspended')
      result.current.setRole(['usr_1008'], 'support')
    })
    expect(result.current.getUser('usr_1008')?.status).toBe('suspended')
    expect(result.current.getUser('usr_1008')?.role).toBe('support')

    act(() => {
      result.current.deleteUser('usr_1008')
    })
    expect(result.current.getUser('usr_1008')).toBeUndefined()
    expect(result.current.activity[0]?.action).toBe('Deleted user')
  })
})
