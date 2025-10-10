import { pool } from "../config/database.js"
import bcrypt from "bcryptjs"

export const userModel = {
  async create(username, email, password, role = "admin", live_url="" ) {
    const passwordHash = await bcrypt.hash(password, 10)
    const result = await pool.query(
      "INSERT INTO users (username, email, password_hash, role, live_url) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email, role, live_url, created_at",
      [username, email, passwordHash, role, live_url],
    )
    return result.rows[0]
  },

  async findByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email])
    return result.rows[0]
  },

  async findByUsername(username) {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username])
    return result.rows[0]
  },

  async findById(id) {
    const result = await pool.query("SELECT id, email, role, created_at, updated_at FROM users WHERE id = $1", [id])
    return result.rows[0]
  },

  async getAll() {
    const result = await pool.query(
      "SELECT id, email, role, live_url, created_at, updated_at FROM users ORDER BY created_at DESC",
    )
    return result.rows
  },

  async update(id, data) {
    const fields = []
    const values = []
    let paramCount = 1

    if (data.email) {
      fields.push(`email = $${paramCount++}`)
      values.push(data.email)
    }
    if (data.password) {
      const passwordHash = await bcrypt.hash(data.password, 10)
      fields.push(`password_hash = $${paramCount++}`)
      values.push(passwordHash)
    }
    if (data.role) {
      fields.push(`role = $${paramCount++}`)
      values.push(data.role)
    }

    fields.push(`updated_at = NOW()`)
    values.push(id)

    const result = await pool.query(
      `UPDATE users SET ${fields.join(", ")} WHERE id = $${paramCount} RETURNING id, email, role, live_url, updated_at`,
      values,
    )
    return result.rows[0]
  },

  async delete(id) {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING id", [id])
    return result.rows[0]
  },

  async updatePassword(id, oldPassword, newPassword) {
    // Buscar usuario actual
    const userQuery = await pool.query("SELECT password_hash FROM users WHERE id = $1", [id])
    const user = userQuery.rows[0]

    if (!user) throw new Error("Usuario no encontrado")

    // Comparar contraseña actual
    const validPassword = await bcrypt.compare(oldPassword, user.password_hash)
    if (!validPassword) throw new Error("Contraseña actual incorrecta")

    // Encriptar nueva contraseña
    const newHash = await bcrypt.hash(newPassword, 10)

    // Actualizar
    const result = await pool.query(
      `
      UPDATE users 
      SET password_hash = $1, updated_at = NOW() 
      WHERE id = $2 
      RETURNING id, email, username, live_url, updated_at
      `,
      [newHash, id]
    )

    return result.rows[0]
  },

  async updateLiveUrl(id, live_url) {
    const result = await pool.query(
      `
      UPDATE users 
      SET live_url = $1, updated_at = NOW() 
      WHERE id = $2 
      RETURNING id, email, username, live_url, updated_at
      `,
      [live_url, id]
    )

    return result.rows[0]
  },

  async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
  },
}
