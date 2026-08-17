import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { UsersProvider } from './context/UsersContext'
import { ToastProvider } from './components/ui'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UsersProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </UsersProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
