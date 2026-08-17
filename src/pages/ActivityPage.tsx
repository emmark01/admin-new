import { useMemo, useState } from 'react'
import { useUsers } from '../context/UsersContext'
import { formatDateTime } from '../lib/format'
import { Card, EmptyState, SearchInput, Table } from '../components/ui'
import type { Column } from '../components/ui'
import type { ActivityEvent } from '../types/user'

export function ActivityPage() {
  const { activity } = useUsers()
  const [query, setQuery] = useState('')

  const rows = useMemo(
    () =>
      activity.filter((event) =>
        `${event.action} ${event.detail} ${event.userName}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [activity, query],
  )

  const columns: Column<ActivityEvent>[] = [
    { key: 'action', header: 'Action', render: (row) => <strong>{row.action}</strong> },
    { key: 'detail', header: 'Detail', render: (row) => row.detail },
    { key: 'actor', header: 'Actor', render: (row) => row.userName },
    { key: 'when', header: 'When', render: (row) => formatDateTime(row.createdAt) },
  ]

  return (
    <Card>
      <div style={{ paddingBottom: 16 }}>
        <SearchInput placeholder="Search activity" value={query} onChange={(event) => setQuery(event.target.value)} />
      </div>
      <Table
        columns={columns}
        rows={rows}
        rowKey={(row) => row.id}
        empty={<EmptyState title="No activity found" description="User management events will appear here." />}
      />
    </Card>
  )
}
