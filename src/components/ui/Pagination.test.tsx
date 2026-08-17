import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  it('shows the current range and disables previous on the first page', () => {
    render(<Pagination page={1} pageSize={6} total={14} onPageChange={vi.fn()} />)
    expect(screen.getByText('Showing 1-6 of 14')).toBeInTheDocument()
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled()
  })

  it('disables next on the last page and reports an empty range', () => {
    render(<Pagination page={1} pageSize={6} total={0} onPageChange={vi.fn()} />)
    expect(screen.getByText('Showing 0-0 of 0')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled()
  })

  it('requests the next and previous page', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination page={2} pageSize={6} total={14} onPageChange={onPageChange} />)

    await user.click(screen.getByRole('button', { name: 'Next' }))
    await user.click(screen.getByRole('button', { name: 'Previous' }))
    expect(onPageChange).toHaveBeenCalledWith(3)
    expect(onPageChange).toHaveBeenCalledWith(1)
  })
})
