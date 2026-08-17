import { render, screen } from '@testing-library/react'
import { Avatar } from './Avatar'

describe('Avatar', () => {
  it('renders two-letter initials from the name', () => {
    render(<Avatar name="Ava Chen" />)
    expect(screen.getByTitle('Ava Chen')).toHaveTextContent('AC')
  })

  it('renders an image when a source is provided', () => {
    render(<Avatar name="Ava Chen" src="/ava.png" />)
    expect(screen.getByRole('img', { name: 'Ava Chen' })).toHaveAttribute('src', '/ava.png')
  })
})
