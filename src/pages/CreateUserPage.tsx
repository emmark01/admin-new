import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUsers } from '../context/UsersContext'
import { Breadcrumb, Button, Card, Input, Select, Textarea, useToast } from '../components/ui'
import type { UserRole, UserStatus } from '../types/user'
import './UserFormPage.css'

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'manager', label: 'Manager' },
  { value: 'support', label: 'Support' },
  { value: 'viewer', label: 'Viewer' },
]

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'invited', label: 'Invited' },
  { value: 'suspended', label: 'Suspended' },
]

export function CreateUserPage() {
  const { createUser } = useUsers()
  const { notify } = useToast()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<UserRole>('viewer')
  const [status, setStatus] = useState<UserStatus>('invited')
  const [department, setDepartment] = useState('')
  const [location, setLocation] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')

  return (
    <div className="user-form-page">
      <Breadcrumb items={[{ label: 'Users', to: '/users' }, { label: 'Add user' }]} />
      <Card>
        <form
          className="user-form"
          onSubmit={(event) => {
            event.preventDefault()
            if (!name.trim() || !email.includes('@')) {
              setError('Name and a valid email are required.')
              return
            }
            const user = createUser({
              name,
              email,
              role,
              status,
              department: department || 'Unassigned',
              location,
              phone,
              notes,
            })
            notify(`${user.name} created`)
            navigate(`/users/${user.id}`)
          }}
        >
          <div className="user-form-grid">
            <Input label="Full name" value={name} onChange={(event) => setName(event.target.value)} required />
            <Input label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} error={error} required />
            <Select label="Role" value={role} options={roleOptions} onChange={(event) => setRole(event.target.value as UserRole)} />
            <Select
              label="Status"
              value={status}
              options={statusOptions}
              onChange={(event) => setStatus(event.target.value as UserStatus)}
            />
            <Input label="Department" value={department} onChange={(event) => setDepartment(event.target.value)} />
            <Input label="Location" value={location} onChange={(event) => setLocation(event.target.value)} />
            <Input label="Phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
          </div>
          <Textarea label="Notes" value={notes} onChange={(event) => setNotes(event.target.value)} />
          <div className="user-form-actions">
            <Button variant="outline" onClick={() => navigate('/users')}>
              Cancel
            </Button>
            <Button type="submit">Create user</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
