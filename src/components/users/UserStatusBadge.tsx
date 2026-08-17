import { Badge } from '../ui'
import { titleCase } from '../../lib/format'
import type { UserStatus } from '../../types/user'

function tone(status: UserStatus) {
  if (status === 'active') return 'success' as const
  if (status === 'invited') return 'info' as const
  return 'danger' as const
}

export function UserStatusBadge({ status }: { status: UserStatus }) {
  return <Badge tone={tone(status)}>{titleCase(status)}</Badge>
}
