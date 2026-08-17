import { users } from '../data/mock'
import { filterUsers } from './users'

describe('filterUsers', () => {
  it('returns all users when no filters are set', () => {
    expect(filterUsers(users)).toHaveLength(users.length)
  })

  it('matches name, email, or department', () => {
    expect(filterUsers(users, { query: 'ava chen' }).map((user) => user.id)).toEqual(['usr_1001'])
    expect(filterUsers(users, { query: 'northwind.io' }).length).toBe(users.length)
    expect(filterUsers(users, { query: 'support' }).every((user) => user.department === 'Support')).toBe(true)
  })

  it('filters by role and status together', () => {
    const result = filterUsers(users, { role: 'manager', status: 'suspended' })
    expect(result).toHaveLength(1)
    expect(result[0]?.name).toBe('Elena Kovacs')
  })

  it('ignores role and status when set to all', () => {
    expect(filterUsers(users, { role: 'all', status: 'all' })).toHaveLength(users.length)
  })

  it('returns an empty list when nothing matches', () => {
    expect(filterUsers(users, { query: 'no-such-user' })).toEqual([])
  })
})
