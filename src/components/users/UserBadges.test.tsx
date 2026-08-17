import { render, screen } from '@testing-library/react'
import { UserStatusBadge } from './UserStatusBadge'
import { UserRoleBadge } from './UserRoleBadge'

describe('user badges', () => {
  it('title-cases status with the matching tone class', () => {
    const { rerender } = render(<UserStatusBadge status="active" />)
    expect(screen.getByText('Active')).toHaveClass('badge-success')

    rerender(<UserStatusBadge status="invited" />)
    expect(screen.getByText('Invited')).toHaveClass('badge-info')

    rerender(<UserStatusBadge status="suspended" />)
    expect(screen.getByText('Suspended')).toHaveClass('badge-danger')
  })

  it('title-cases the user role', () => {
    render(<UserRoleBadge role="manager" />)
    expect(screen.getByText('Manager')).toHaveClass('badge-primary')
  })
})
