import { Link } from 'react-router-dom'
import { Button, Card } from '../components/ui'

export function NotFoundPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <Card>
        <h1>Page not found</h1>
        <p style={{ color: 'var(--text-secondary)', margin: '8px 0 16px' }}>
          That admin route does not exist.
        </p>
        <Link to="/">
          <Button>Back to dashboard</Button>
        </Link>
      </Card>
    </div>
  )
}
