import { postModel } from "../models/postModel.js"

export const postController = {
  async create(req, res) {
    try {
      const postData = {
        ...req.body,
      }

      const post = await postModel.create(postData)
      res.status(201).json({ message: "Publicación creada", post })
    } catch (error) {
      console.error("Create post error:", error)
      if (error.code === "23505") {
        // Unique violation
        return res.status(409).json({ error: "El slug ya existe" })
      }
      res.status(500).json({ error: "Error interno del servidor" })
    }
  },

  async getAll(req, res) {
    try {
      const filters = {}
      if (req.query.published !== undefined) {
        filters.published = req.query.published === "true"
      }
      if (req.query.author_id) {
        filters.author_id = req.query.author_id
      }

      const posts = await postModel.getAll(filters)
      res.json(posts)
    } catch (error) {
      console.error("Get all posts error:", error)
      res.status(500).json({ error: "Error interno del servidor" })
    }
  },

  async getById(req, res) {
    try {
      const post = await postModel.findById(req.params.id)
      if (!post) {
        return res.status(404).json({ error: "Publicación no encontrada" })
      }

      // Increment views
      await postModel.incrementViews(req.params.id)

      res.json(post)
    } catch (error) {
      console.error("Get post error:", error)
      res.status(500).json({ error: "Error interno del servidor" })
    }
  },

  async getBySlug(req, res) {
    try {
      const post = await postModel.findBySlug(req.params.slug)
      if (!post) {
        return res.status(404).json({ error: "Publicación no encontrada" })
      }

      // Increment views
      await postModel.incrementViews(post.id)

      res.json(post)
    } catch (error) {
      console.error("Get post by slug error:", error)
      res.status(500).json({ error: "Error interno del servidor" })
    }
  },

  async update(req, res) {
    try {
      const post = await postModel.update(req.params.id, req.body)
      if (!post) {
        return res.status(404).json({ error: "Publicación no encontrada" })
      }
      res.json({ message: "Publicación actualizada", post })
    } catch (error) {
      console.error("Update post error:", error)
      if (error.code === "23505") {
        return res.status(409).json({ error: "El slug ya existe" })
      }
      res.status(500).json({ error: "Error interno del servidor" })
    }
  },

  async published(req, res) {
    try {
      const post = await postModel.published(req.body.published, req.params.id)
      if (!post) {
        return res.status(404).json({ error: "Publicación no encontrada" })
      }
      res.json({ message: `Publicación ${post.published ? 'publicada' : 'despublicada'}` })
    } catch (error) {
      console.error("Published post error:", error)
      res.status(500).json({ error: "Error interno del servidor" })
    }
  },

  async delete(req, res) {
    try {
      const post = await postModel.delete(req.params.id)
      if (!post) {
        return res.status(404).json({ error: "Publicación no encontrada" })
      }
      res.json({ message: "Publicación eliminada" })
    } catch (error) {
      console.error("Delete post error:", error)
      res.status(500).json({ error: "Error interno del servidor" })
    }
  },
}