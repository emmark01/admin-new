import type { TextareaHTMLAttributes } from 'react'
import './Input.css'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  hint?: string
  error?: string
}

export function Textarea({ label, hint, error, id, className = '', ...props }: TextareaProps) {
  const textareaId = id ?? props.name

  return (
    <label className={`field ${className}`.trim()} htmlFor={textareaId}>
      {label && <span className="field-label">{label}</span>}
      <textarea id={textareaId} className={`field-textarea ${error ? 'is-invalid' : ''}`} {...props} />
      {error ? <span className="field-error">{error}</span> : hint ? <span className="field-hint">{hint}</span> : null}
    </label>
  )
}
