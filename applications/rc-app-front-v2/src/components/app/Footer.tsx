import { Link } from "react-router-dom"
import logo from "../../../public/rc-media.png"
import { navLinks, socialLinks } from "./Header"
import { useSmartNavigate } from "../../hooks/useSmartNavigate"

export default function Footer() {
  const useLink = useSmartNavigate()
  const year = new Date().getFullYear()

  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        {/* Columna 1 - Logo */}
        <div className="footer-logo">
          <img src={logo} alt="logo" />
          <p>
            Transmitiendo desde Villa Hermosa, La Romana, República Dominicana.
            Noticias, música y opinión 24/7.
          </p>
        </div>

        {/* Columna 2 - Navegación */}
        <div className="footer-nav">
          <h4>Secciones</h4>
          <ul>
            {
              navLinks.map((item, i) => (
                <li key={i}><Link to={item.href}  onClick={(e) => {
                  e.preventDefault();
                  useLink(item.href);
                }}>{item.label}</Link></li>
              ))
            }
          </ul>
        </div>

        {/* Columna 3 - Redes */}
        <div className="footer-social">
          <h4>Síguenos</h4>
          <div className="social-links">
            {
              socialLinks.map((item, i) => (
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    useLink(item.path);
                  }}
                  key={i}
                >
                  {item.icon}
                </a>
              ))
            }
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} RC Media. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
