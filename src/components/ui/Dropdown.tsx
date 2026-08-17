import { useEffect, useRef, useState, type ReactNode } from 'react'
import './Dropdown.css'

type DropdownItem = {
  label: string
  onSelect: () => void
  danger?: boolean
}

type DropdownProps = {
  trigger: ReactNode
  items: DropdownItem[]
}

export function Dropdown({ trigger, items }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="dropdown" ref={ref}>
      <div onClick={() => setOpen((value) => !value)}>{trigger}</div>
      {open && (
        <div className="dropdown-menu" role="menu">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`dropdown-item ${item.danger ? 'is-danger' : ''}`}
              onClick={() => {
                item.onSelect()
                setOpen(false)
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
