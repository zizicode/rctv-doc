/**
 * @typedef {Object} BlogPost
 * @property {string} id - ID único del artículo
 * @property {string} title - Título del artículo
 * @property {string} slug - URL amigable del artículo
 * @property {string} content - Contenido HTML del artículo
 * @property {string} excerpt - Resumen del artículo
 * @property {string} author - Autor del artículo
 * @property {string} coverImage - URL de la imagen de portada
 * @property {string} category - Categoría del artículo
 * @property {string[]} tags - Etiquetas del artículo
 * @property {Date} createdAt - Fecha de creación
 * @property {Date} updatedAt - Fecha de actualización
 * @property {boolean} published - Si está publicado
 */

/**
 * @typedef {Object} BlogImage
 * @property {string} id - ID único de la imagen
 * @property {string} url - URL de la imagen
 * @property {string} alt - Texto alternativo
 * @property {string} title - Título de la imagen
 * @property {number} width - Ancho de la imagen
 * @property {number} height - Alto de la imagen
 * @property {Date} uploadedAt - Fecha de carga
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Si la solicitud fue exitosa
 * @property {any} data - Datos de la respuesta
 * @property {string} message - Mensaje de respuesta
 * @property {number} statusCode - Código de estado HTTP
 */

/**
 * @typedef {Object} ApiError
 * @property {number} statusCode - Código de error
 * @property {string} message - Mensaje de error
 * @property {any} data - Datos adicionales del error
 */

export {}