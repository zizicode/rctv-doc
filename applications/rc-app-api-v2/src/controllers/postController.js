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

  async shareBySlug(req, res) {
    try {
      const { slug } = req.params;

      // Buscar post por slug
      const post = await postModel.findBySlug(slug);
      const SITE_URL = process.env.NODE_ENV === "production"
        ? "https://rodolfocordones.com"
        : "http://localhost:3005"

      if (!post) {
        return res.status(404).send(`
          <!DOCTYPE html>
          <html lang="es">
            <head>
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <title>Artículo no encontrado</title>
              <meta property="og:title" content="Artículo no encontrado" />
              <meta property="og:description" content="Este artículo no está disponible." />
            </head>
            <body>
              <p>El artículo no existe o fue eliminado.</p>
            </body>
          </html>
        `);
      }

      const redirectUrl = `${SITE_URL}/post/${slug}`;
      const imageUrl = post.cover_url?.startsWith("http")
        ? post.cover_url
        : `${SITE_URL}/media/${post.cover_url}`;

      // HTML con meta tags OG para bots
      const html = `
        <!DOCTYPE html>
        <html lang="es">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>${post.title}</title>
  
            <meta property="og:type" content="article" />
            <meta property="og:title" content="${post.title}" />
            <meta property="og:description" content="${post.description}" />
            <meta property="og:image" content="${imageUrl}" />
            <meta property="og:url" content="${redirectUrl}" />
  
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="${post.title}" />
            <meta name="twitter:description" content="${post.description}" />
            <meta name="twitter:image" content="${imageUrl}" />
  
            <meta name="robots" content="noindex,nofollow" />
          </head>
          <body>
            <p>Redirigiendo al artículo...</p>
            <script>window.location.replace("${redirectUrl}")</script>
          </body>
        </html>
      `;

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.send(html);

    } catch (error) {
      console.error("Error en shareBySlug:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
}