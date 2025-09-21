import React from 'react'
import { routerSections } from './mocks/sections'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container-footer">
        <div className="col">
          <h3>Rodolfo Cordones</h3>
          <p>Noticias y comunicación política comprometida con la verdad y la transparencia. Mantente informado sobre los acontecimientos más importantes del país y la región.</p>
        </div>
        <div className="col">
          <h3>Secciones</h3>
          <ul>
            {
              routerSections.map((r, i) => (
                <li key={i}><Link to={r.path}>{r.label}</Link></li>
              ))
            }
          </ul>
        </div>
        <div className="col">
          <h3>Contacto</h3>
          <p>info@rodolfocordones.com</p>
          <p>+1 (809) 000-000</p>
          <p>La Romana, Republica Dominicana</p>
        </div>
        <div className="bottom">
          <p>© 2025 Rodolfo Cordones. Todos los derechos reservados.</p>
          <p>Aviso Legal | Política de Privacidad</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer