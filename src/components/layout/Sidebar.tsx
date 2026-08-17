import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/users', label: 'Users' },
  { to: '/users/new', label: 'Add user' },
  { to: '/roles', label: 'Roles' },
  { to: '/activity', label: 'Activity' },
  { to: '/settings', label: 'Settings' },
]

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-mark">AP</span>
        <div>
          <strong>Admin Panel</strong>
          <p>User management</p>
        </div>
      </div>
      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.to === '/' || link.to === '/users'} className="sidebar-link">
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
