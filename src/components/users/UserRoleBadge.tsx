import { Badge } from '../ui'
import { titleCase } from '../../lib/format'
import type { UserRole } from '../../types/user'

export function UserRoleBadge({ role }: { role: UserRole }) {
  return <Badge tone="primary">{titleCase(role)}</Badge>
}
