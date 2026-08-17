import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { activity as seedActivity, users as seedUsers } from '../data/mock'
import type { ActivityEvent, User, UserRole, UserStatus } from '../types/user'

type UserInput = Omit<User, 'id' | 'createdAt' | 'lastActive'> & {
  id?: string
}

type UsersContextValue = {
  users: User[]
  activity: ActivityEvent[]
  getUser: (id: string) => User | undefined
  createUser: (input: UserInput) => User
  updateUser: (id: string, patch: Partial<User>) => User | undefined
  deleteUser: (id: string) => void
  setStatus: (ids: string[], status: UserStatus) => void
  setRole: (ids: string[], role: UserRole) => void
}

const UsersContext = createContext<UsersContextValue | null>(null)

function nextId(users: User[]) {
  const max = users.reduce((acc, user) => Math.max(acc, Number(user.id.replace('usr_', ''))), 1000)
  return `usr_${max + 1}`
}

export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(seedUsers)
  const [activity, setActivity] = useState<ActivityEvent[]>(seedActivity)

  const value = useMemo<UsersContextValue>(() => {
    function log(userName: string, action: string, detail: string, userId = 'usr_1001') {
      setActivity((current) => [
        {
          id: `act_${Date.now()}`,
          userId,
          userName,
          action,
          detail,
          createdAt: new Date().toISOString(),
        },
        ...current,
      ])
    }

    return {
      users,
      activity,
      getUser: (id) => users.find((user) => user.id === id),
      createUser: (input) => {
        const user: User = {
          ...input,
          id: nextId(users),
          createdAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
        }
        setUsers((current) => [user, ...current])
        log('Ava Chen', 'Created user', `Added ${user.name}`)
        return user
      },
      updateUser: (id, patch) => {
        let updated: User | undefined
        setUsers((current) =>
          current.map((user) => {
            if (user.id !== id) return user
            updated = { ...user, ...patch }
            return updated
          }),
        )
        if (updated) {
          log('Ava Chen', 'Updated user', `Edited ${updated.name}`)
        }
        return updated
      },
      deleteUser: (id) => {
        const user = users.find((item) => item.id === id)
        setUsers((current) => current.filter((item) => item.id !== id))
        if (user) {
          log('Ava Chen', 'Deleted user', `Removed ${user.name}`)
        }
      },
      setStatus: (ids, status) => {
        setUsers((current) => current.map((user) => (ids.includes(user.id) ? { ...user, status } : user)))
        log('Ava Chen', 'Changed status', `Set ${ids.length} user(s) to ${status}`)
      },
      setRole: (ids, role) => {
        setUsers((current) => current.map((user) => (ids.includes(user.id) ? { ...user, role } : user)))
        log('Ava Chen', 'Changed role', `Set ${ids.length} user(s) to ${role}`)
      },
    }
  }, [users, activity])

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}

export function useUsers() {
  const context = useContext(UsersContext)
  if (!context) {
    throw new Error('useUsers must be used within UsersProvider')
  }
  return context
}
