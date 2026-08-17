import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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

export function EditUserPage() {
  const { id = '' } = useParams()
  const { getUser, updateUser } = useUsers()
  const user = getUser(id)
  const { notify } = useToast()
  const navigate = useNavigate()
  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [role, setRole] = useState<UserRole>(user?.role ?? 'viewer')
  const [status, setStatus] = useState<UserStatus>(user?.status ?? 'active')
  const [department, setDepartment] = useState(user?.department ?? '')
  const [location, setLocation] = useState(user?.location ?? '')
  const [phone, setPhone] = useState(user?.phone ?? '')
  const [notes, setNotes] = useState(user?.notes ?? '')

  if (!user) {
    return <Card>User not found.</Card>
  }

  return (
    <div className="user-form-page">
      <Breadcrumb
        items={[
          { label: 'Users', to: '/users' },
          { label: user.name, to: `/users/${user.id}` },
          { label: 'Edit' },
        ]}
      />
      <Card>
        <form
          className="user-form"
          onSubmit={(event) => {
            event.preventDefault()
            updateUser(user.id, { name, email, role, status, department, location, phone, notes })
            notify(`${name} updated`)
            navigate(`/users/${user.id}`)
          }}
        >
          <div className="user-form-grid">
            <Input label="Full name" value={name} onChange={(event) => setName(event.target.value)} required />
            <Input label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
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
            <Button variant="outline" onClick={() => navigate(`/users/${user.id}`)}>
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
