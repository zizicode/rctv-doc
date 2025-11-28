import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { CgFacebook } from "react-icons/cg"
import { AiOutlineYoutube } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { TbHandClick } from "react-icons/tb";
import { BiPlayCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import logo from "../../../public/rc-media.png"
import Live from "../Live/Live"
import { useDateTime } from "../../hooks/useDateTime"
import { useSmartNavigate } from "../../hooks/useSmartNavigate";
import api from "../../config/axios";

export const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Periódico digital", href: "/news" },
  { label: "Servicios", href: "/servicios" },
  { label: "Contacto", href: "/contacto" },
]

export const socialLinks = [
  { icon: <CgFacebook />, path: "https://www.facebook.com/RodolfoCordones?mibextid=ZbWKwL" },
  { icon: <AiOutlineYoutube />, path: "https://www.youtube.com/@rodolfocordones" },
  { icon: <AiOutlineInstagram />, path: "https://www.instagram.com/rodolfo_cordones" },
]

export default function Header() {
  const location = useLocation();
  const useLink = useSmartNavigate()
  const { date, time } = useDateTime()
  const [live, setLive] = useState<string | null>("https://player.castr.com/live_565cf300cbfa11f0bbf1f1b94fba7b6a");
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [viewLive, setViewLive] = useState(false);

  async function handleLive(){
    try {
      const getLive = await api.get(`${import.meta.env.VITE_API_URL_MEDIA}/live`) as {data: string}
      if(getLive) setLive(getLive?.data)
    } catch (error) {
      console.log("Live Stream no disponible")
    }
  }

  useEffect(() => {
    if(!live){
      handleLive()
    }
    const isNotHome = location.pathname === "/";
    if (isNotHome) {
      setViewLive(true)
      return
    }
    setViewLive(false)
  }, [location.pathname])

  return (
    <header className="header-wrapper">
      {/* NAVBAR */}
      <nav className="header-nav">
        <div className="nav-container">
          {/* LOGO + REDES */}
          <div className="nav-top">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>

            {/* BOTÓN MÓVIL */}
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* LINKS DESKTOP */}
          <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link to={'#'} onClick={() => useLink(link.href)} className={`${location.pathname === link.href ? 'active' : ''}`}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <section className={`hero-section ${viewLive ? 'open' : ''}`}>
        <div className="hero-container">
          <div className="hero-content">
            <h1>Transmisión en Vivo</h1>
            <p>
              El Primer Canal y radio online desde Villa Hermosa, La Romana,
              República Dominicana.
            </p>
            <button className="btn-listen"><BiPlayCircle/> Escuchar Ahora</button>
          </div>
          <div className="stream-container">
            <Live src={live ? live : ""}/>
          </div>
        </div>
      </section>

      {/* FECHA Y HORA */}
      <div className="date-day">
          <button className={`switch-live ${viewLive ? 'open' : ''}`} onClick={() => setViewLive(!viewLive)}><TbHandClick/><p>Live</p> <span className="live-dot"></span></button>
        <div className="container-date-day">
          <ul className={`social-icons`}>
                {socialLinks.map((item, i) => (
                  <li key={i}>
                    <Link to={item.path}>{item.icon}</Link>
                  </li>
                ))}
              </ul>
          <p className="data">{date}</p>
          <p>{time.toLocaleUpperCase()}</p>
        </div>
      </div>
    </header>
  )
}
