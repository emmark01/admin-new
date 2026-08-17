import { render, screen } from '@testing-library/react'
import { EmptyState } from './EmptyState'

describe('EmptyState', () => {
  it('renders the title, description, and optional action', () => {
    render(
      <EmptyState
        title="No users match these filters"
        description="Try a different search."
        action={<button type="button">Reset filters</button>}
      />,
    )

    expect(screen.getByRole('heading', { name: 'No users match these filters' })).toBeInTheDocument()
    expect(screen.getByText('Try a different search.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reset filters' })).toBeInTheDocument()
  })
})
