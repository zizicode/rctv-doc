// hooks/useSmartNavigate.ts
import { useNavigate } from "react-router-dom"
import { useDataStore } from "../store"

export const useSmartNavigate = () => {
  const navigate = useNavigate()
  const { setRouteLoading } = useDataStore()

  return (path: string) => {
    setRouteLoading(true)
    // Espera unos ms para mostrar el loader antes del cambio
    setTimeout(() => {
      navigate(path)
      // Desactiva el loader después de un pequeño retraso
      setTimeout(() => setRouteLoading(false), 800)
    }, 100)
  }
}
