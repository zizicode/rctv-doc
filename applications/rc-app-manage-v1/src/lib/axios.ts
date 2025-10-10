import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // URL desde .env
  timeout: 10000, // 10s, evita que se quede colgado
  headers: {
    "Content-Type": "application/json",
  },
})

export const apiUpload = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 20000,
  headers: { "Content-Type": "multipart/form-data" },
})


// Interceptor para requests
apiUpload.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") // o desde tu store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") // o desde tu store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Interceptor para responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Opcional: redirigir al login o limpiar sesión
      localStorage.removeItem("token")
    }
    return Promise.reject(error)
  }
)

export default api
