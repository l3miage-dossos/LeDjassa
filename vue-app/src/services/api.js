/**
 * Services API — Couche d'abstraction pour les endpoints
 */
import http from './http'

// ─── Todos ────────────────────────────────────────────────────────────────────
export const todoService = {
  getAll(params = {}) {
    return http.get('/todos', { params })
  },
  getById(id) {
    return http.get(`/todos/${id}`)
  },
  create(data) {
    return http.post('/todos', data)
  },
  update(id, data) {
    return http.put(`/todos/${id}`, data)
  },
  patch(id, data) {
    return http.patch(`/todos/${id}`, data)
  },
  delete(id) {
    return http.delete(`/todos/${id}`)
  }
}

// ─── Posts ────────────────────────────────────────────────────────────────────
export const postService = {
  getAll(params = {}) {
    return http.get('/posts', { params })
  },
  getById(id) {
    return http.get(`/posts/${id}`)
  },
  getComments(postId) {
    return http.get(`/posts/${postId}/comments`)
  },
  create(data) {
    return http.post('/posts', data)
  },
  update(id, data) {
    return http.put(`/posts/${id}`, data)
  },
  delete(id) {
    return http.delete(`/posts/${id}`)
  }
}

// ─── Users ────────────────────────────────────────────────────────────────────
export const userService = {
  getAll() {
    return http.get('/users')
  },
  getById(id) {
    return http.get(`/users/${id}`)
  },
  getTodos(userId) {
    return http.get(`/users/${userId}/todos`)
  }
}
