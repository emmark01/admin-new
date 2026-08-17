import type { InputHTMLAttributes } from 'react'
import './SearchInput.css'

type SearchInputProps = InputHTMLAttributes<HTMLInputElement>

export function SearchInput({ className = '', ...props }: SearchInputProps) {
  return (
    <label className={`search-input ${className}`.trim()}>
      <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
        <path
          fill="currentColor"
          d="M8.5 3a5.5 5.5 0 0 1 4.38 8.82l3.65 3.65-1.06 1.06-3.65-3.65A5.5 5.5 0 1 1 8.5 3Zm0 1.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
        />
      </svg>
      <input type="search" {...props} />
    </label>
  )
}
