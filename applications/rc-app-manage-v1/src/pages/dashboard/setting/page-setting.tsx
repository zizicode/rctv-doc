import React, { useEffect, useState } from "react"
import "./setting.scss"
import type { User } from "@/types"
import { useAuthStore } from "@/store"
import { updateLiveUrl, updatePassword } from "@/lib/api/endpoint"

const SettingPage: React.FC = () => {
  const { user } = useAuthStore()
  const [initUser, setInitUser] = useState<User | null>(null)
  const [urlLive, setUrlLive] = useState(user?.live_url || "")
  const [loading, setLoading] = useState(false)

  const [payload, setPayload] = useState({
    id: user?.id || "",
    password: "",
    new_password: "",
  })

  function handleTyping(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setPayload((prev) => ({ ...prev, [name]: value }))
  }

  // 🧩 Cambiar contraseña
  async function handleSubmitPassword(e: React.FormEvent) {
    e.preventDefault()
    if (!payload.password || !payload.new_password) {
      console.warn("Debe llenar ambos campos")
      return
    }

    try {
      setLoading(true)
      const response = await updatePassword({
        id: user?.id || "",
        password: payload.password,
        new_password: payload.new_password,
      })
      console.log("Respuesta cambio de contraseña:", response)
    } catch (error) {
      console.error("Error al cambiar contraseña:", error)
    } finally {
      setLoading(false)
    }
  }

  // 🎥 Actualizar URL del Stream
  async function handleSubmitUrl(e: React.FormEvent) {
    e.preventDefault()
    if (!urlLive.trim() || !user?.id) return

    try {
      setLoading(true)
      const response = await updateLiveUrl({ id: user.id, live_url: urlLive })
      console.log("Respuesta actualización URL:", response)
    } catch (error) {
      console.error("Error al actualizar URL del Stream:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user?.id) setInitUser(user)
  }, [user])

  if (!initUser)
    return <p className="error-text">Hubo un error, no pudimos mostrar esta página</p>

  return (
    <div className="setting-page">
      <div className="title-setting">
        <h1>Configuración</h1>
        <p>Cambia tu contraseña y el enlace del Stream en vivo</p>
      </div>

      <div className="container-setting">
        {/* CAMBIO DE CONTRASEÑA */}
        <form className="form-section" onSubmit={handleSubmitPassword}>
          <input type="hidden" name="id" value={user?.id} />
          <label>
            <span>Nombre de usuario</span>
            <input type="text" value={initUser.username} disabled />
          </label>

          <label>
            <span>Contraseña actual</span>
            <input
              type="password"
              name="password"
              onChange={handleTyping}
              value={payload.password}
              required
            />
          </label>

          <label>
            <span>Nueva contraseña</span>
            <input
              type="password"
              name="new_password"
              onChange={handleTyping}
              value={payload.new_password}
              required
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Actualizando..." : "Cambiar ahora"}
          </button>
        </form>

        {/* CONFIGURAR STREAM */}
        <div className="divider" />

        <form className="form-section" onSubmit={handleSubmitUrl}>
          <h2>Configuración del Stream</h2>
          <label>
            <span>Enlace de transmisión (URL)</span>
            <input
              type="url"
              value={urlLive}
              onChange={(e) => setUrlLive(e.target.value)}
              required
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading
              ? "Actualizando..."
              : urlLive !== user?.live_url
              ? "Guardar cambios"
              : "Actualizar"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SettingPage
