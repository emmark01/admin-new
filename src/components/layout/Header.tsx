import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Avatar, Button, SearchInput } from '../ui'
import './Header.css'

type HeaderProps = {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="header">
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className="header-actions">
        <SearchInput
          placeholder="Search users..."
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              const value = event.currentTarget.value
              navigate(value ? `/users?q=${encodeURIComponent(value)}` : '/users')
            }
          }}
        />
        {user && (
          <div className="header-user">
            <Avatar name={user.name} />
            <div>
              <strong>{user.name}</strong>
              <p>{user.role}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={logout}>
              Sign out
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
