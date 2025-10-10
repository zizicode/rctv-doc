import { api, apiUpload } from "@/lib/axios"

// 🧍 USUARIOS
export async function getUsers() {
  const { data } = await api.get("/users")
  return data
}

// 🔐 AUTENTICACIÓN
export async function authLogin(props: { email: string; password: string }) {
  const { data } = await api.post("/auth/login", props)
  return data
}

// 🔄 ACTUALIZAR CONTRASEÑA
export async function updatePassword(props: {
  id: string
  password: string
  new_password: string
}) {
  const { data } = await api.put("/auth/update-password", props)
  return data
}

// 🎥 ACTUALIZAR URL DEL STREAM
export async function updateLiveUrl(props: {
  id: string
  live_url: string
}) {
  const { data } = await api.put("/auth/update-live-url", props)
  return data
}

// 📰 POSTS
export async function addNewPost(props: {
  title: string
  slug: string
  body: string
  cover_url: string
  author_id: string
  published: boolean
  description: string
  keywords: string[]
}) {
  const { data } = await api.post("/posts", props)
  return data
}

export async function updatePost(props: {
  id?: string
  title: string
  slug: string
  body: string
  cover_url: string
  author_id: string
  published: boolean
  description: string
  keywords: string[]
}) {
  const { data } = await api.put(`/posts/${props.id}`, props)
  return data
}

export async function updatePublishedPost(props: {
  id?: string
  published: boolean
}) {
  const { data } = await api.put(`/posts/published/${props.id}`, props)
  return data
}

export async function DeletePost(props: { id: string }) {
  const { data } = await api.delete(`/posts/${props.id}`)
  return data
}

// 🖼️ MEDIA
export async function addNewImage(props: {
  file: File
  title?: string
  description?: string
  uploaded_by?: string
}) {
  const { data } = await apiUpload.post("/media", props)
  return data
}

export async function addNewMultiImage(formData: FormData) {
  const { data } = await apiUpload.post("/media", formData)
  return data
}

export async function deleteImage(props: { id: string }) {
  const { data } = await api.delete(`/media/${props.id}`)
  return data
}

// ♻️ SINCRONIZAR DATOS
export async function updateData() {
  const { data } = await api.post("/auth/update-data")
  return data
}
