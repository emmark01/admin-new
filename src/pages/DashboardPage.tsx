import { Link } from 'react-router-dom'
import { useUsers } from '../context/UsersContext'
import { formatDateTime } from '../lib/format'
import { Card, CardHeader, StatCard, Table } from '../components/ui'
import type { Column } from '../components/ui'
import type { ActivityEvent } from '../types/user'
import './DashboardPage.css'

export function DashboardPage() {
  const { users, activity } = useUsers()
  const active = users.filter((user) => user.status === 'active').length
  const invited = users.filter((user) => user.status === 'invited').length
  const suspended = users.filter((user) => user.status === 'suspended').length

  const columns: Column<ActivityEvent>[] = [
    { key: 'action', header: 'Action', render: (row) => <strong>{row.action}</strong> },
    { key: 'detail', header: 'Detail', render: (row) => row.detail },
    { key: 'actor', header: 'Actor', render: (row) => row.userName },
    { key: 'when', header: 'When', render: (row) => formatDateTime(row.createdAt) },
  ]

  return (
    <div className="dashboard">
      <div className="dashboard-stats">
        <StatCard label="Total users" value={users.length} hint="Everyone in this workspace" />
        <StatCard label="Active" value={active} hint="Currently able to sign in" />
        <StatCard label="Invited" value={invited} hint="Waiting to accept access" />
        <StatCard label="Suspended" value={suspended} hint="Access currently paused" />
      </div>
      <Card>
        <CardHeader
          title="Recent activity"
          subtitle="Latest user management events"
          actions={
            <Link to="/activity" className="dashboard-link">
              View all
            </Link>
          }
        />
        <Table columns={columns} rows={activity.slice(0, 5)} rowKey={(row) => row.id} />
      </Card>
    </div>
  )
}
