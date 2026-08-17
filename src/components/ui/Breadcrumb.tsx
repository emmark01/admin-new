import { Link } from 'react-router-dom'
import './Breadcrumb.css'

type Crumb = {
  label: string
  to?: string
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="breadcrumb-item">
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
          {index < items.length - 1 && <span className="breadcrumb-sep">/</span>}
        </span>
      ))}
    </nav>
  )
}
