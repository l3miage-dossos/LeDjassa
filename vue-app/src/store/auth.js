/**
 * Store Pinia — Authentification
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const token = ref(localStorage.getItem('auth_token') || null)

  const isAuthenticated = computed(() => !!token.value)
  const userName = computed(() => user.value?.name || 'Invité')

  function login(credentials) {

    if (credentials.email && credentials.password) {
      const mockUser = {
        id: 1,
        name: 'Siaka DOSSO',
        email: credentials.email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.email}`
      }
      const mockToken = btoa(`${credentials.email}:${Date.now()}`)
      user.value = mockUser
      token.value = mockToken
      localStorage.setItem('user', JSON.stringify(mockUser))
      localStorage.setItem('auth_token', mockToken)
      return true
    }
    return false
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('auth_token')
  }

  return { user, token, isAuthenticated, userName, login, logout }
})
