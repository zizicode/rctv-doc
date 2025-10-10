import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuthStore } from "@/store"

interface AuthRouterProps {
  children: React.ReactNode
}

export const AuthRouter: React.FC<AuthRouterProps> = ({ children }) => {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")

    // Validar autenticación
    if ((!user?.id || !token) && location.pathname !== "/login") {
      navigate("/login", { replace: true })
      return
    }

    if (user?.id && token && location.pathname === "/login") {
      navigate("/dashboard", { replace: true })
      return
    }

    setIsChecking(false) // listo para renderizar
  }, [user?.id, location.pathname])

  if (isChecking) return null // evita parpadeo

  return children
}
