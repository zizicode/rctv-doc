import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App.tsx'
import "@styles/_variable.scss"
import "@styles/main.scss";
import NavbarLayout from './shared/layouts/navbar/Navbar.tsx';
import Footer from './shared/layouts/footer/Footer.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NavbarLayout />
      <App />
    <Footer />
  </React.StrictMode>,
)
