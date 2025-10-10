import { useEffect, useState } from "react"
import { useDataStore } from "../../store"
import logo from "../../../public/rc-media.png"
import "./RouteLoading.scss"

export default function RouteLoading() {
  const { routeLoading, fetchPosts } = useDataStore()
  const [visible, setVisible] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
      fetchPosts()

    if (routeLoading) {
      // 👇 Llevar scroll arriba antes de mostrar loader
      window.scrollTo({ top: 0, behavior: "instant" })

      setVisible(true)
      setFadeOut(false)
      document.body.style.overflow = "hidden"
    } else if (visible) {
      setFadeOut(true)
      setTimeout(() => {
        setVisible(false)
        document.body.style.overflow = ""
      }, 400)
    }
  }, [routeLoading])

  if (!visible) return null

  return (
    <div className={`route-loading ${fadeOut ? "fade-out" : ""}`}>
      <div className="route-loading__content">
        <img src={logo} alt="Logo" className="route-loading__logo" />
        <div className="route-loading__spinner" />
      </div>
    </div>
  )
}
