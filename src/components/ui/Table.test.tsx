import { render, screen } from '@testing-library/react'
import { Table } from './Table'

const rows = [
  { id: '1', name: 'Ava Chen' },
  { id: '2', name: 'Marcus Reid' },
]

describe('Table', () => {
  it('renders column headers and row values', () => {
    render(
      <Table
        columns={[{ key: 'name', header: 'User', render: (row) => row.name }]}
        rows={rows}
        rowKey={(row) => row.id}
      />,
    )

    expect(screen.getByRole('columnheader', { name: 'User' })).toBeInTheDocument()
    expect(screen.getByText('Ava Chen')).toBeInTheDocument()
    expect(screen.getByText('Marcus Reid')).toBeInTheDocument()
  })

  it('shows the empty state when there are no rows', () => {
    render(
      <Table
        columns={[{ key: 'name', header: 'User', render: (row: { id: string; name: string }) => row.name }]}
        rows={[] as Array<{ id: string; name: string }>}
        rowKey={(row) => row.id}
        empty={<p>No users match these filters</p>}
      />,
    )

    expect(screen.getByText('No users match these filters')).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })
})
