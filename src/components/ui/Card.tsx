import type { ReactNode } from 'react'
import './Card.css'

type CardProps = {
  children: ReactNode
  className?: string
  padded?: boolean
}

export function Card({ children, className = '', padded = true }: CardProps) {
  return <section className={`card ${padded ? 'card-padded' : ''} ${className}`.trim()}>{children}</section>
}

export function CardHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="card-header">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {actions}
    </div>
  )
}
