import { useDataStore } from "@/store/data.store"
import { useEffect, useState } from "react"

export default function LoadingPage() {
  const [loading, setLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const {update} = useDataStore()

  useEffect(() => {
    setLoading(true)
    setFadeOut(false)

    // Mantener mínimo 3 segundos
    const timer = setTimeout(() => {
      update()
      setFadeOut(true)
      setTimeout(() => setLoading(false), 500) // esperar transición fade-out
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <div className={`loading-page ${fadeOut ? "fade-out" : ""}`}>
      <div className="loading-spinner"></div>
      <p className="loading-text">Cargando</p>
    </div>
  )
}
