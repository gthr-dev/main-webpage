import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Events } from '../pages/Events.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Events />
  </StrictMode>
)
