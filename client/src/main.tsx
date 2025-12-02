import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './hooks/AuthContext.tsx'
import { AddProvider } from './hooks/AddContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AddProvider>
      <App />
      </AddProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
