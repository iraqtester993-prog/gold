import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('golden-age-token') || null)
  const loading = ref(false)

  const isLoggedIn = computed(() => !!token.value && !!user.value)

  async function login(username, password) {
    loading.value = true
    try {
      // API call placeholder
      const mockUser = {
        id: 1,
        username,
        name: 'مستخدم',
        phone: '07XX XXX XXXX',
        email: ''
      }
      user.value = mockUser
      token.value = 'mock-jwt-token'
      localStorage.setItem('golden-age-token', token.value)
      return { success: true }
    } catch (error) {
      return { success: false, message: 'خطأ في تسجيل الدخول' }
    } finally {
      loading.value = false
    }
  }

  async function register(data) {
    loading.value = true
    try {
      return { success: true }
    } catch (error) {
      return { success: false, message: 'خطأ في التسجيل' }
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('golden-age-token')
  }

  function checkAuth() {
    if (token.value) {
      user.value = {
        id: 1,
        username: 'user',
        name: 'مستخدم',
        phone: '07XX XXX XXXX'
      }
    }
  }

  return { user, token, loading, isLoggedIn, login, register, logout, checkAuth }
})
