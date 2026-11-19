import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './lib/gsap'
import './index.css'
import App from './App'
import { SmoothScroll } from './hooks/useLenis'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SmoothScroll>
      <App />
    </SmoothScroll>
  </StrictMode>,
)
