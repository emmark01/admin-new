import { formatDate, formatDateTime, titleCase } from './format'

describe('formatDate', () => {
  it('formats an ISO date for English locales', () => {
    expect(formatDate('2024-01-12T09:00:00.000Z')).toContain('2024')
    expect(formatDate('2024-01-12T09:00:00.000Z')).toMatch(/Jan/)
  })
})

describe('formatDateTime', () => {
  it('includes month and day', () => {
    const formatted = formatDateTime('2026-08-17T10:12:00.000Z')
    expect(formatted).toMatch(/Aug/)
    expect(formatted).toMatch(/17/)
  })
})

describe('titleCase', () => {
  it('capitalizes the first letter', () => {
    expect(titleCase('admin')).toBe('Admin')
    expect(titleCase('suspended')).toBe('Suspended')
  })

  it('leaves the rest of the string unchanged', () => {
    expect(titleCase('active')).toBe('Active')
  })
})
