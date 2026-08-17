import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useUsers } from '../context/UsersContext'
import { formatDate, formatDateTime } from '../lib/format'
import { Avatar, Breadcrumb, Button, Card, CardHeader, ConfirmDialog, Switch, Tabs, useToast } from '../components/ui'
import { UserRoleBadge } from '../components/users/UserRoleBadge'
import { UserStatusBadge } from '../components/users/UserStatusBadge'
import './UserDetailPage.css'

export function UserDetailPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { getUser, activity, updateUser, deleteUser } = useUsers()
  const { notify } = useToast()
  const user = getUser(id)
  const [tab, setTab] = useState('profile')
  const [confirmDelete, setConfirmDelete] = useState(false)

  if (!user) {
    return (
      <Card>
        <p>User not found.</p>
        <Link to="/users">Back to users</Link>
      </Card>
    )
  }

  const events = activity.filter((item) => item.detail.includes(user.name) || item.userId === user.id)

  return (
    <div className="user-detail">
      <Breadcrumb items={[{ label: 'Users', to: '/users' }, { label: user.name }]} />
      <Card>
        <div className="user-hero">
          <Avatar name={user.name} size="lg" />
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <div className="user-meta">
              <UserRoleBadge role={user.role} />
              <UserStatusBadge status={user.status} />
            </div>
          </div>
          <div className="user-hero-actions">
            <Link to={`/users/${user.id}/edit`}>
              <Button variant="outline">Edit</Button>
            </Link>
            <Button variant="danger" onClick={() => setConfirmDelete(true)}>
              Delete
            </Button>
          </div>
        </div>
      </Card>
      <Tabs
        tabs={[
          { id: 'profile', label: 'Profile' },
          { id: 'activity', label: 'Activity' },
          { id: 'access', label: 'Access' },
        ]}
        value={tab}
        onChange={setTab}
      />
      {tab === 'profile' && (
        <Card>
          <CardHeader title="Profile" subtitle="Contact and workspace details" />
          <dl className="user-fields">
            <div>
              <dt>Department</dt>
              <dd>{user.department}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{user.location ?? '—'}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{user.phone ?? '—'}</dd>
            </div>
            <div>
              <dt>Created</dt>
              <dd>{formatDate(user.createdAt)}</dd>
            </div>
            <div>
              <dt>Last active</dt>
              <dd>{formatDateTime(user.lastActive)}</dd>
            </div>
            <div>
              <dt>Notes</dt>
              <dd>{user.notes ?? '—'}</dd>
            </div>
          </dl>
        </Card>
      )}
      {tab === 'activity' && (
        <Card>
          <CardHeader title="Activity" subtitle="Events related to this user" />
          <ul className="user-activity">
            {events.length === 0 && <li>No activity recorded yet.</li>}
            {events.map((event) => (
              <li key={event.id}>
                <strong>{event.action}</strong>
                <span>{event.detail}</span>
                <em>{formatDateTime(event.createdAt)}</em>
              </li>
            ))}
          </ul>
        </Card>
      )}
      {tab === 'access' && (
        <Card>
          <CardHeader title="Access" subtitle="Enable or pause this account" />
          <Switch
            label={user.status === 'active' ? 'Account is active' : 'Account is paused'}
            checked={user.status === 'active'}
            onChange={(checked) => {
              updateUser(user.id, { status: checked ? 'active' : 'suspended' })
              notify(checked ? 'User activated' : 'User suspended')
            }}
          />
        </Card>
      )}
      <ConfirmDialog
        open={confirmDelete}
        title="Delete user"
        message={`Delete ${user.name}? This cannot be undone in this workspace.`}
        confirmLabel="Delete"
        onCancel={() => setConfirmDelete(false)}
        onConfirm={() => {
          deleteUser(user.id)
          notify(`${user.name} deleted`)
          navigate('/users')
        }}
      />
    </div>
  )
}
