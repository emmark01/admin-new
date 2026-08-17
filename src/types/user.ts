export type UserStatus = 'active' | 'invited' | 'suspended'
export type UserRole = 'admin' | 'manager' | 'support' | 'viewer'

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  department: string
  lastActive: string
  createdAt: string
  phone?: string
  location?: string
  notes?: string
}

export type RoleDefinition = {
  id: UserRole
  name: string
  description: string
  permissions: string[]
  userCount: number
}

export type ActivityEvent = {
  id: string
  userId: string
  userName: string
  action: string
  detail: string
  createdAt: string
}
