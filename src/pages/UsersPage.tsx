import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useUsers } from '../context/UsersContext'
import { useToast } from '../components/ui'
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  ConfirmDialog,
  Dropdown,
  EmptyState,
  Pagination,
  SearchInput,
  Select,
  Table,
} from '../components/ui'
import type { Column } from '../components/ui'
import { formatDateTime } from '../lib/format'
import type { User, UserRole, UserStatus } from '../types/user'
import { InviteUserModal } from '../components/users/InviteUserModal'
import { UserRoleBadge } from '../components/users/UserRoleBadge'
import { UserStatusBadge } from '../components/users/UserStatusBadge'
import './UsersPage.css'

const PAGE_SIZE = 6

export function UsersPage() {
  const { users, deleteUser, setStatus } = useUsers()
  const { notify } = useToast()
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const [selected, setSelected] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [pendingDelete, setPendingDelete] = useState<User | null>(null)

  const query = params.get('q') ?? ''
  const role = (params.get('role') ?? 'all') as UserRole | 'all'
  const status = (params.get('status') ?? 'all') as UserStatus | 'all'

  const filtered = useMemo(() => {
    return users.filter((user) => {
      const haystack = `${user.name} ${user.email} ${user.department}`.toLowerCase()
      const matchesQuery = haystack.includes(query.toLowerCase())
      const matchesRole = role === 'all' || user.role === role
      const matchesStatus = status === 'all' || user.status === status
      return matchesQuery && matchesRole && matchesStatus
    })
  }, [users, query, role, status])

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function updateFilter(key: string, value: string) {
    const next = new URLSearchParams(params)
    if (!value || value === 'all') next.delete(key)
    else next.set(key, value)
    setParams(next)
    setPage(1)
  }

  function toggleAll(checked: boolean) {
    setSelected(checked ? paged.map((user) => user.id) : [])
  }

  const columns: Column<User>[] = [
    {
      key: 'select',
      header: '',
      width: '48px',
      render: (user) => (
        <Checkbox
          checked={selected.includes(user.id)}
          onChange={(event) => {
            setSelected((current) =>
              event.target.checked ? [...current, user.id] : current.filter((id) => id !== user.id),
            )
          }}
        />
      ),
    },
    {
      key: 'user',
      header: 'User',
      render: (user) => (
        <Link to={`/users/${user.id}`} className="user-cell">
          <Avatar name={user.name} />
          <span>
            <strong>{user.name}</strong>
            <em>{user.email}</em>
          </span>
        </Link>
      ),
    },
    { key: 'role', header: 'Role', render: (user) => <UserRoleBadge role={user.role} /> },
    { key: 'status', header: 'Status', render: (user) => <UserStatusBadge status={user.status} /> },
    { key: 'dept', header: 'Department', render: (user) => user.department },
    { key: 'active', header: 'Last active', render: (user) => formatDateTime(user.lastActive) },
    {
      key: 'actions',
      header: '',
      width: '72px',
      render: (user) => (
        <Dropdown
          trigger={
            <Button variant="ghost" size="sm">
              •••
            </Button>
          }
          items={[
            { label: 'View', onSelect: () => navigate(`/users/${user.id}`) },
            { label: 'Edit', onSelect: () => navigate(`/users/${user.id}/edit`) },
            { label: 'Delete', danger: true, onSelect: () => setPendingDelete(user) },
          ]}
        />
      ),
    },
  ]

  return (
    <div className="users-page">
      <Card padded={false}>
        <div className="users-toolbar">
          <SearchInput
            placeholder="Search by name, email, or department"
            defaultValue={query}
            onChange={(event) => updateFilter('q', event.target.value)}
          />
          <Select
            options={[
              { value: 'all', label: 'All roles' },
              { value: 'admin', label: 'Admin' },
              { value: 'manager', label: 'Manager' },
              { value: 'support', label: 'Support' },
              { value: 'viewer', label: 'Viewer' },
            ]}
            value={role}
            onChange={(event) => updateFilter('role', event.target.value)}
          />
          <Select
            options={[
              { value: 'all', label: 'All statuses' },
              { value: 'active', label: 'Active' },
              { value: 'invited', label: 'Invited' },
              { value: 'suspended', label: 'Suspended' },
            ]}
            value={status}
            onChange={(event) => updateFilter('status', event.target.value)}
          />
          <Button variant="outline" onClick={() => setInviteOpen(true)}>
            Invite
          </Button>
          <Link to="/users/new">
            <Button>Add user</Button>
          </Link>
        </div>
        {selected.length > 0 && (
          <div className="users-bulk">
            <span>{selected.length} selected</span>
            <Button size="sm" variant="secondary" onClick={() => setStatus(selected, 'active')}>
              Activate
            </Button>
            <Button size="sm" variant="secondary" onClick={() => setStatus(selected, 'suspended')}>
              Suspend
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setSelected([])}>
              Clear
            </Button>
          </div>
        )}
        <div className="users-select-all">
          <Checkbox
            label="Select page"
            checked={paged.length > 0 && paged.every((user) => selected.includes(user.id))}
            onChange={(event) => toggleAll(event.target.checked)}
          />
        </div>
        <Table
          columns={columns}
          rows={paged}
          rowKey={(user) => user.id}
          empty={
            <EmptyState
              title="No users match these filters"
              description="Try a different search or clear the role and status filters."
              action={
                <Button variant="outline" onClick={() => setParams({})}>
                  Reset filters
                </Button>
              }
            />
          }
        />
        <Pagination page={page} pageSize={PAGE_SIZE} total={filtered.length} onPageChange={setPage} />
      </Card>
      <InviteUserModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete user"
        message={`Delete ${pendingDelete?.name}? This removes them from the workspace.`}
        confirmLabel="Delete"
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) {
            deleteUser(pendingDelete.id)
            notify(`${pendingDelete.name} deleted`)
            setPendingDelete(null)
          }
        }}
      />
    </div>
  )
}
