import { useState } from 'react'
import { Button, Input, Modal, Select, useToast } from '../ui'
import { useUsers } from '../../context/UsersContext'
import type { UserRole } from '../../types/user'

type InviteUserModalProps = {
  open: boolean
  onClose: () => void
}

export function InviteUserModal({ open, onClose }: InviteUserModalProps) {
  const { createUser } = useUsers()
  const { notify } = useToast()
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<UserRole>('viewer')

  function reset() {
    setEmail('')
    setRole('viewer')
  }

  return (
    <Modal
      open={open}
      title="Invite user"
      onClose={() => {
        reset()
        onClose()
      }}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (!email.includes('@')) return
              const name = email.split('@')[0].replace('.', ' ')
              createUser({
                name: name.replace(/\b\w/g, (char) => char.toUpperCase()),
                email,
                role,
                status: 'invited',
                department: 'Unassigned',
              })
              notify(`Invite sent to ${email}`)
              reset()
              onClose()
            }}
          >
            Send invite
          </Button>
        </>
      }
    >
      <div style={{ display: 'grid', gap: 12 }}>
        <Input label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <Select
          label="Role"
          value={role}
          onChange={(event) => setRole(event.target.value as UserRole)}
          options={[
            { value: 'admin', label: 'Admin' },
            { value: 'manager', label: 'Manager' },
            { value: 'support', label: 'Support' },
            { value: 'viewer', label: 'Viewer' },
          ]}
        />
      </div>
    </Modal>
  )
}
