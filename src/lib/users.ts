import type { User, UserRole, UserStatus } from '../types/user'

export type UserFilters = {
  query?: string
  role?: UserRole | 'all'
  status?: UserStatus | 'all'
}

export function filterUsers(users: User[], filters: UserFilters = {}) {
  const query = (filters.query ?? '').trim().toLowerCase()
  const role = filters.role ?? 'all'
  const status = filters.status ?? 'all'

  return users.filter((user) => {
    const haystack = `${user.name} ${user.email} ${user.department}`.toLowerCase()
    const matchesQuery = haystack.includes(query)
    const matchesRole = role === 'all' || user.role === role
    const matchesStatus = status === 'all' || user.status === status
    return matchesQuery && matchesRole && matchesStatus
  })
}
