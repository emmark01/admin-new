import type { SelectHTMLAttributes } from 'react'
import './Input.css'

type SelectOption = {
  value: string
  label: string
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  hint?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
}

export function Select({
  label,
  hint,
  error,
  options,
  placeholder,
  id,
  className = '',
  ...props
}: SelectProps) {
  const selectId = id ?? props.name

  return (
    <label className={`field ${className}`.trim()} htmlFor={selectId}>
      {label && <span className="field-label">{label}</span>}
      <select id={selectId} className={`field-select ${error ? 'is-invalid' : ''}`} {...props}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <span className="field-error">{error}</span> : hint ? <span className="field-hint">{hint}</span> : null}
    </label>
  )
}
