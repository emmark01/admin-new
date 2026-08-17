import { roles } from '../data/mock'
import { Badge, Card, CardHeader } from '../components/ui'
import './RolesPage.css'

export function RolesPage() {
  return (
    <div className="roles-page">
      {roles.map((role) => (
        <Card key={role.id}>
          <CardHeader title={role.name} subtitle={role.description} actions={<Badge tone="primary">{role.userCount} users</Badge>} />
          <div className="role-permissions">
            {role.permissions.map((permission) => (
              <Badge key={permission}>{permission}</Badge>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}
