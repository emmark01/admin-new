import type { InputHTMLAttributes } from 'react'
import './Checkbox.css'

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <label className={`checkbox ${className}`.trim()}>
      <input type="checkbox" {...props} />
      {label && <span>{label}</span>}
    </label>
  )
}
