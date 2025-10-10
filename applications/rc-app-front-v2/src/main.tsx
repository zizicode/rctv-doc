import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './router.tsx'
import './styles/fonts.scss';
import './styles/main.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter/>
  </StrictMode>,
)
