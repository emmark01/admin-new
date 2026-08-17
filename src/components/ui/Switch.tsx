import './Switch.css'

type SwitchProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
}

export function Switch({ checked, onChange, label, disabled }: SwitchProps) {
  return (
    <label className={`switch ${disabled ? 'is-disabled' : ''}`}>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="switch-track" />
      {label && <span className="switch-label">{label}</span>}
    </label>
  )
}
