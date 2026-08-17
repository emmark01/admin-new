import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import './Layout.css'

const titles: Record<string, { title: string; subtitle: string }> = {
  '/': { title: 'Dashboard', subtitle: 'Overview of users and recent activity' },
  '/users': { title: 'Users', subtitle: 'Search, filter, and manage workspace members' },
  '/users/new': { title: 'Add user', subtitle: 'Create a new workspace member' },
  '/roles': { title: 'Roles', subtitle: 'Review permissions assigned to each role' },
  '/activity': { title: 'Activity', subtitle: 'Audit trail of user management actions' },
  '/settings': { title: 'Settings', subtitle: 'Workspace defaults for user management' },
}

export function AppLayout() {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const meta =
    titles[location.pathname] ??
    (location.pathname.startsWith('/users/')
      ? { title: 'User', subtitle: 'Profile, role, and account status' }
      : { title: 'Admin Panel', subtitle: '' })

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Header title={meta.title} subtitle={meta.subtitle} />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
