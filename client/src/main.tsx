import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ReactQueryProvider from './context/ReactQueryProvider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <App />
      <ReactQueryDevtools initialIsOpen={false} position={'bottom-right' as any} />
    </ReactQueryProvider>
  </StrictMode>
)
