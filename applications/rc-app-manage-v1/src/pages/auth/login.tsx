import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { LuUserRoundCog, LuLockKeyhole } from "react-icons/lu"
import InputWrapper from "@/components/ui/input"
import { authLogin } from "@/lib/api/endpoint"
import { useAuthStore } from "@/store"
import { useDataStore } from "@/store/data.store"
import Toast from "@/lib/toast"

interface LoginProps {
  email: string
  password: string
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const { update } = useDataStore()
  const [onSubmit, setOnSubmit] = useState(false)
  const [formData, setFormData] = useState<LoginProps>({ email: "", password: "" })

  const handleTyping = ({ prop, value }: { prop: string; value: string | number }) => {
    setFormData((prev) => ({ ...prev, [prop]: value }))
  }

  const eventSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (onSubmit) return // evita doble clic

    if (!formData.email.trim() || !formData.password.trim()) {
      Toast.info("Completa todos los campos")
      return
    }

    try {
      setOnSubmit(true)
      const result = await authLogin(formData)
      setOnSubmit(false)

      if (!result?.token) {
        const msg = result?.response?.error || "Credenciales incorrectas"
        Toast.error(msg)
        return
      }

      const { user, data } = result.response
      Toast.success(`Bienvenido ${user.username}`)

      localStorage.setItem("token", result.token)
      login(user)
      update(data)

      navigate("/dashboard", { replace: true })
    } catch (error:any) {
      console.error("Error al iniciar sesión:", error)
      Toast.error(error?.response.data.error)
      setOnSubmit(false)
    }
  }

  return (
    <div className="page-login">
      <h1>Login</h1>
      <p className="sub-title">Para acceder al Dashboard</p>

      <form onSubmit={eventSubmit} noValidate>
        <InputWrapper
          icon={<LuUserRoundCog />}
          label="Correo o Usuario"
          type="text"
          name="email"
          placeholder="admin o admin@example.com"
          typing={handleTyping}
        />
        <InputWrapper
          icon={<LuLockKeyhole />}
          label="Contraseña"
          type="password"
          name="password"
          placeholder="***********"
          typing={handleTyping}
        />

        <button type="submit" disabled={onSubmit}>
          {onSubmit ? <div className="load"></div> : "Entrar"}
        </button>
      </form>
    </div>
  )
}

export default Login
