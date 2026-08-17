import { useState } from 'react'
import { Button, Card, CardHeader, Input, Select, Switch, useToast } from '../components/ui'

export function SettingsPage() {
  const { notify } = useToast()
  const [workspace, setWorkspace] = useState('Northwind')
  const [defaultRole, setDefaultRole] = useState('viewer')
  const [requireMfa, setRequireMfa] = useState(true)
  const [autoSuspend, setAutoSuspend] = useState(false)

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <Card>
        <CardHeader title="Workspace" subtitle="Defaults applied when inviting new users" />
        <div style={{ display: 'grid', gap: 16, maxWidth: 480 }}>
          <Input label="Workspace name" value={workspace} onChange={(event) => setWorkspace(event.target.value)} />
          <Select
            label="Default role"
            value={defaultRole}
            onChange={(event) => setDefaultRole(event.target.value)}
            options={[
              { value: 'admin', label: 'Admin' },
              { value: 'manager', label: 'Manager' },
              { value: 'support', label: 'Support' },
              { value: 'viewer', label: 'Viewer' },
            ]}
          />
        </div>
      </Card>
      <Card>
        <CardHeader title="Security" subtitle="Account policy for this admin panel" />
        <div style={{ display: 'grid', gap: 16 }}>
          <Switch checked={requireMfa} onChange={setRequireMfa} label="Require MFA for admins" />
          <Switch checked={autoSuspend} onChange={setAutoSuspend} label="Auto-suspend unused accounts after 90 days" />
        </div>
      </Card>
      <div>
        <Button
          onClick={() => notify('Settings saved')}
        >
          Save settings
        </Button>
      </div>
    </div>
  )
}
