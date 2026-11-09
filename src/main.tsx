import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { applyPerformanceMode } from './lib/device'
import './index.css'

// На слабых устройствах и в режиме экономии трафика отключаем декоративные анимации
applyPerformanceMode()

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Элемент #root не найден в index.html')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
