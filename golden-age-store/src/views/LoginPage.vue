<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <div class="logo">
          <svg viewBox="0 0 40 40" width="50" height="50">
            <rect x="4" y="4" width="14" height="14" rx="2" fill="var(--color-gold)" opacity="0.8"/>
            <rect x="22" y="4" width="14" height="14" rx="2" fill="var(--color-gold)" opacity="0.6"/>
            <rect x="4" y="22" width="14" height="14" rx="2" fill="var(--color-gold)" opacity="0.6"/>
            <rect x="22" y="22" width="14" height="14" rx="2" fill="var(--color-gold)" opacity="0.4"/>
            <rect x="13" y="13" width="14" height="14" rx="2" fill="var(--color-gold)"/>
          </svg>
        </div>
        <h1 class="brand-name">العصر الذهبي</h1>
        <p class="brand-tagline">أجهزة إلكترونية</p>
      </div>

      <div class="login-form-card">
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="input-group">
            <input
              v-model="username"
              type="text"
              placeholder="اسم المستخدم"
              class="form-input"
              required
            />
            <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="var(--color-gold)">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>

          <div class="input-group">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="الرقم السري"
              class="form-input"
              required
            />
            <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="var(--color-gold)">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <button type="button" class="toggle-pass" @click="showPassword = !showPassword">
              <svg v-if="!showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
              <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
          </div>

          <div class="form-options">
            <a href="#" class="forgot-link">هل نسيت كلمة السر؟</a>
          </div>

          <button type="submit" class="btn btn-primary btn-full btn-lg" :disabled="authStore.loading">
            <span v-if="authStore.loading">جاري الدخول...</span>
            <span v-else>دخول</span>
          </button>
        </form>
      </div>

      <div class="guest-option">
        <router-link to="/" class="btn btn-secondary btn-full">
          المتابعة كضيف
        </router-link>
      </div>

      <div class="register-option">
        <span>ليس لديك حساب؟</span>
        <router-link to="/register" class="register-btn">انشاء حساب</router-link>
      </div>

      <ThemeToggle />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import ThemeToggle from '../components/common/ThemeToggle.vue'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const showPassword = ref(false)

async function handleLogin() {
  const result = await authStore.login(username.value, password.value)
  if (result.success) {
    router.push('/')
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.login-header {
  text-align: center;
}

.logo {
  margin-bottom: 12px;
}

.brand-name {
  font-size: 2rem;
  font-weight: 900;
  color: var(--color-gold);
  margin-bottom: 4px;
}

.brand-tagline {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.login-form-card {
  width: 100%;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  padding: 32px 24px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  position: relative;
}

.input-group .form-input {
  padding-right: 48px;
}

.input-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
}

.toggle-pass {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-options {
  display: flex;
  justify-content: center;
}

.forgot-link {
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.forgot-link:hover {
  color: var(--color-gold);
}

.guest-option {
  width: 100%;
}

.register-option {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.register-btn {
  padding: 10px 24px;
  background: var(--color-gold);
  color: var(--bg-primary);
  border-radius: var(--radius-full);
  font-weight: 700;
  font-size: 0.9rem;
  transition: all var(--transition-fast);
}

.register-btn:hover {
  background: var(--color-gold-light);
}

.login-page :deep(.theme-toggle) {
  position: fixed;
  top: 16px;
  left: 16px;
}
</style>
