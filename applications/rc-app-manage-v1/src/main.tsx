import { createRoot } from 'react-dom/client'
import '@/styles/global.scss';
import '@/styles/_ui.scss';
import App from './App.tsx';
import { StrictMode } from 'react';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />
    <App />
  </StrictMode>
)
