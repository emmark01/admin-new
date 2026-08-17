import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button, Input } from '../components/ui'
import './LoginPage.css'

export function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('ava.chen@northwind.io')
  const [password, setPassword] = useState('admin')
  const [error, setError] = useState('')

  if (user) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="login-page">
      <form
        className="login-card"
        onSubmit={(event) => {
          event.preventDefault()
          const ok = login(email, password)
          if (!ok) {
            setError('Enter a valid email and a password with at least 4 characters.')
            return
          }
          navigate('/')
        }}
      >
        <div className="login-brand">Admin Panel</div>
        <h1>Sign in</h1>
        <p>Use the demo credentials to open the user management workspace.</p>
        <Input label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={error}
          required
        />
        <Button type="submit" fullWidth>
          Continue
        </Button>
      </form>
    </div>
  )
}
