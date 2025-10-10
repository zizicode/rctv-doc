import { mediaModel } from "../models/mediaModel.js"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const mediaController = {
  async upload(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No se subió ningún archivo" })
      }

      const { uploaded_by, title, description } = req.body;

      const fileUrl = `/media/${req.file.filename}`
      const type = await req.file.mimetype.startsWith("image") ? "image" : "video"

      const mediaData = {
        file_url: fileUrl,
        type,
        title: title || req.file.originalname,
        description: description || "",
        uploaded_by: uploaded_by || "",
      }
      const media = await mediaModel.create(mediaData)
      res.status(201).json({
        message: "Archivo subido",
        media,
      })
    } catch (error) {
      console.error("Error al subir archivo:", error)
      res.status(500).json({ error: "Error interno del servidor" })
    }
  },

  async getAll(req, res) {
    try {
      const filters = {}
      if (req.query.type) filters.type = req.query.type
      if (req.query.uploaded_by) filters.uploaded_by = req.query.uploaded_by

      const media = await mediaModel.getAll(filters)
      res.json(media)
    } catch (error) {
      console.error("Error al obtener archivos:", error)
      res.status(500).json({ error: "Error interno del servidor" })
    }
  },

  async getById(req, res) {
    try {
      const media = await mediaModel.findById(req.params.id)
      if (!media) {
        return res.status(404).json({ error: "Archivo no encontrado" })
      }
      res.json(media)
    } catch (error) {
      console.error("Error al obtener archivo:", error)
      res.status(500).json({ error: "Error interno del servidor" })
    }
  },

  async update(req, res) {
    try {
      const media = await mediaModel.update(req.params.id, req.body)
      if (!media) {
        return res.status(404).json({ error: "Archivo no encontrado" })
      }
      res.json({ message: "Archivo actualizado", media })
    } catch (error) {
      console.error("Error al actualizar archivo:", error)
      res.status(500).json({ error: "Error interno del servidor" })
    }
  },

  async delete(req, res) {
    try {
      const media = await mediaModel.delete(req.params.id)
      if (!media) {
        return res.status(404).json({ error: "Archivo no encontrado" })
      }

      const filePath = path.join(__dirname, "../../", media.file_url)
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }

      res.json({ message: "Archivo eliminado" })
    } catch (error) {
      console.error("Error al eliminar archivo:", error)
      res.status(500).json({ error: "Error interno del servidor" })
    }
  },
}
