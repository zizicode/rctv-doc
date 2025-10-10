import jwt from "jsonwebtoken"
import { userModel } from "../models/userModel.js"
import { postModel } from "../models/postModel.js"
import { mediaModel } from "../models/mediaModel.js"

export const authController = {
  // ======================================================
  // 🧩 REGISTRO
  // ======================================================
  async register(req, res) {
    try {
      const { username, email, password, role } = req.body

      if (!email || !password) {
        return res.status(400).json({ error: "El correo y la contraseña son requeridos" })
      }

      const existingUser = await userModel.findByEmail(email)
      if (existingUser) {
        return res.status(409).json({ error: "El usuario ya existe" })
      }

      const user = await userModel.create(username, email, password, role, (url_live = ""))

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      )

      res.status(201).json({
        message: "Usuario registrado",
        user,
        token,
      })
    } catch (error) {
      console.error("Error al registrar usuario:", error)
      res.status(500).json({ error: "Error interno del servidor" })
    }
  },

  // ======================================================
  // 🔑 LOGIN
  // ======================================================
  async login(req, res) {
    try {
      const { email, password } = req.body
  
      if (!email || !password) {
        return res.status(400).json({ error: "Correo/Usuario y contraseña son requeridos" })
      }
  
      // Buscar por email o username
      let user = await userModel.findByEmail(email)
      if (!user) {
        user = await userModel.findByUsername(email)
      }
  
      if (!user) {
        return res.status(401).json({ error: "Credenciales inválidas" })
      }
  
      // Verificar contraseña
      const isValidPassword = await userModel.verifyPassword(password, user.password_hash)
      if (!isValidPassword) {
        return res.status(401).json({ error: "Credenciales inválidas" })
      }
  
      // Generar token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      )
  
      // Datos base
      const get_post = await postModel.getAll()
      const get_media = await mediaModel.getAll()
  
      res.json({
        message: "Inicio de sesión correcto",
        response: {
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            live_url: user.live_url,
          },
          data: {
            posts: get_post,
            media: get_media,
          },
        },
        token,
      })
    } catch (error) {
      console.error("Error en inicio de sesión:", error)
      res.status(500).json({ error: "Error interno del servidor" })
    }
  },

  // ======================================================
  // 🔄 ACTUALIZAR DATA GENERAL
  // ======================================================
  async updateData(req, res) {
    try {
      const get_post = await postModel.getAll()
      const get_media = await mediaModel.getAll()

      const data = { posts: get_post, media: get_media }

      res.json({
        message: "Información actualizada",
        data,
      })
    } catch (error) {
      console.error("Error al actualizar data:", error)
      res.status(500).json({ error: "Error interno del servidor" })
    }
  },

  // ======================================================
  // 👤 PERFIL
  // ======================================================
  async getProfile(req, res) {
    try {
      const user = await userModel.findById(req.user.id)
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" })
      }
      res.json(user)
    } catch (error) {
      console.error("Error al obtener perfil:", error)
      res.status(500).json({ error: "Error interno del servidor" })
    }
  },

  // ======================================================
  // 🔒 ACTUALIZAR CONTRASEÑA
  // ======================================================
  async updatePassword(req, res) {
    try {
      const { password, new_password } = req.body
      const userId = req.user.id

      if (!password || !new_password) {
        return res.status(400).json({ error: "Debes ingresar la contraseña actual y la nueva" })
      }

      const updatedUser = await userModel.updatePassword(userId, password, new_password)

      res.json({
        message: "Contraseña actualizada",
        user: updatedUser,
      })
    } catch (error) {
      console.error("Error al actualizar contraseña:", error)
      res.status(400).json({ error: error.message || "No se pudo actualizar la contraseña" })
    }
  },

  // ======================================================
  // 🌐 ACTUALIZAR LIVE_URL
  // ======================================================
  async updateLiveUrl(req, res) {
    try {
      const { live_url } = req.body
      const userId = req.user.id

      if (!live_url || !live_url.trim()) {
        return res.status(400).json({ error: "La URL en vivo es requerida" })
      }

      const updatedUser = await userModel.updateLiveUrl(userId, live_url.trim())

      res.json({
        message: "URL en vivo actualizada",
        user: updatedUser,
      })
    } catch (error) {
      console.error("Error al actualizar URL en vivo:", error)
      res.status(500).json({ error: "Error interno del servidor" })
    }
  },
}
