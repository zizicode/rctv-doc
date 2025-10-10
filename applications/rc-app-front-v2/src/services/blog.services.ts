import api from '@config/axios'

/**
 * Obtener todos los artículos del blog
 */
export const getAllPosts = async (page = 1, limit = 10) => {
  try {
    const response = await api.get('/api/posts', {
      params: { page, limit },
    })
    return response.data
  } catch (error) {
    console.error('Error al obtener artículos:', error)
    throw error
  }
}

/**
 * Obtener un artículo específico por slug
 */
export const getPostBySlug = async (slug) => {
  try {
    const response = await api.get(`/api/posts/${slug}`)
    return response.data
  } catch (error) {
    console.error(`Error al obtener artículo: ${slug}`, error)
    throw error
  }
}

/**
 * Obtener artículos por categoría
 */
export const getPostsByCategory = async (category, page = 1, limit = 10) => {
  try {
    const response = await api.get(`/api/posts/category/${category}`, {
      params: { page, limit },
    })
    return response.data
  } catch (error) {
    console.error(`Error al obtener artículos de categoría: ${category}`, error)
    throw error
  }
}

/**
 * Obtener artículos por etiqueta
 */
export const getPostsByTag = async (tag, page = 1, limit = 10) => {
  try {
    const response = await api.get(`/api/posts/tag/${tag}`, {
      params: { page, limit },
    })
    return response.data
  } catch (error) {
    console.error(`Error al obtener artículos con etiqueta: ${tag}`, error)
    throw error
  }
}

/**
 * Obtener todas las imágenes
 */
export const getAllImages = async (page = 1, limit = 20) => {
  try {
    const response = await api.get('/api/images', {
      params: { page, limit },
    })
    return response.data
  } catch (error) {
    console.error('Error al obtener imágenes:', error)
    throw error
  }
}

/**
 * Obtener una imagen específica
 */
export const getImageById = async (imageId) => {
  try {
    const response = await api.get(`/api/images/${imageId}`)
    return response.data
  } catch (error) {
    console.error(`Error al obtener imagen: ${imageId}`, error)
    throw error
  }
}

/**
 * Buscar artículos
 */
export const searchPosts = async (query, page = 1, limit = 10) => {
  try {
    const response = await api.get('/api/posts/search', {
      params: { q: query, page, limit },
    })
    return response.data
  } catch (error) {
    console.error(`Error en búsqueda: ${query}`, error)
    throw error
  }
}

export default {
  getAllPosts,
  getPostBySlug,
  getPostsByCategory,
  getPostsByTag,
  getAllImages,
  getImageById,
  searchPosts,
}