import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from '@/routes'
import { AuthInitializer } from '@/components/auth'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthInitializer>
      <RouterProvider router={router} />
    </AuthInitializer>
  </StrictMode>,
)
