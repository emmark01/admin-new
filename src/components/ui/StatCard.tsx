import type { ReactNode } from 'react'
import './StatCard.css'

type StatCardProps = {
  label: string
  value: string | number
  hint?: string
  icon?: ReactNode
}

export function StatCard({ label, value, hint, icon }: StatCardProps) {
  return (
    <article className="stat-card">
      <div>
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
        {hint && <p className="stat-hint">{hint}</p>}
      </div>
      {icon && <div className="stat-icon">{icon}</div>}
    </article>
  )
}
