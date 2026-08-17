import type { InputHTMLAttributes } from 'react'
import './Input.css'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  hint?: string
  error?: string
}

export function Input({ label, hint, error, id, className = '', ...props }: InputProps) {
  const inputId = id ?? props.name

  return (
    <label className={`field ${className}`.trim()} htmlFor={inputId}>
      {label && <span className="field-label">{label}</span>}
      <input id={inputId} className={`field-input ${error ? 'is-invalid' : ''}`} {...props} />
      {error ? <span className="field-error">{error}</span> : hint ? <span className="field-hint">{hint}</span> : null}
    </label>
  )
}
