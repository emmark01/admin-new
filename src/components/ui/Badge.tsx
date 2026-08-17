import type { ReactNode } from 'react'
import './Badge.css'

type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'primary'

type BadgeProps = {
  children: ReactNode
  tone?: BadgeTone
}

export function Badge({ children, tone = 'neutral' }: BadgeProps) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}
