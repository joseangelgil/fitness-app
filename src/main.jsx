import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import AppProvider from './utils/context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>   
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>,
)
