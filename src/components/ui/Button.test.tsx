import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders children and defaults to type button', () => {
    render(<Button>Save</Button>)
    const button = screen.getByRole('button', { name: 'Save' })
    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveClass('btn-primary', 'btn-md')
  })

  it('applies variant, size, and full width classes', () => {
    render(
      <Button variant="danger" size="sm" fullWidth>
        Delete
      </Button>,
    )
    expect(screen.getByRole('button', { name: 'Delete' })).toHaveClass('btn-danger', 'btn-sm', 'btn-full')
  })

  it('calls onClick when enabled and ignores clicks when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const { rerender } = render(<Button onClick={onClick}>Go</Button>)

    await user.click(screen.getByRole('button', { name: 'Go' }))
    expect(onClick).toHaveBeenCalledTimes(1)

    rerender(
      <Button onClick={onClick} disabled>
        Go
      </Button>,
    )
    await user.click(screen.getByRole('button', { name: 'Go' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
