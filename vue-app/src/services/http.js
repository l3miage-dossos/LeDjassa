/**
 * Service HTTP — Axios configuré avec intercepteurs
 * Utilisé pour tous les appels API de l'application
 */
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})


apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    if (import.meta.env.DEV) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`, config.params || config.data || '')
    }
    return config
  },
  (error) => {
    console.error('[API] Erreur de requête:', error)
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(`[API] ✓ ${response.status} ${response.config.url}`)
    }
    return response
  },
  (error) => {
    const status = error.response?.status
    const message = error.response?.data?.message || error.message

    switch (status) {
      case 401:
        console.warn('[API] Non autorisé — redirection vers login')
        localStorage.removeItem('auth_token')
        break
      case 403:
        console.warn('[API] Accès refusé')
        break
      case 404:
        console.warn('[API] Ressource introuvable')
        break
      case 500:
        console.error('[API] Erreur serveur interne')
        break
      default:
        console.error(`[API] Erreur ${status}:`, message)
    }

    return Promise.reject({
      status,
      message,
      original: error
    })
  }
)

export default apiClient
