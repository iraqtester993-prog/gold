<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-header">
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
        <p class="brand-tagline">انشئ حسابك وتسوق الآن</p>
      </div>

      <div class="register-form-card">
        <form @submit.prevent="handleRegister" class="register-form">
          <div class="input-group">
            <input v-model="form.name" type="text" placeholder="الاسم الكامل" class="form-input" required />
            <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="var(--color-gold)">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>

          <div class="input-group">
            <input v-model="form.phone" type="tel" placeholder="رقم الهاتف" class="form-input" required />
            <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="var(--color-gold)">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>

          <div class="input-group">
            <input v-model="form.username" type="text" placeholder="اسم المستخدم" class="form-input" required />
            <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="var(--color-gold)">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>

          <div class="input-group">
            <input v-model="form.password" type="password" placeholder="كلمة المرور" class="form-input" required />
            <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="var(--color-gold)">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>

          <div class="input-group">
            <input v-model="form.confirmPassword" type="password" placeholder="تأكيد كلمة المرور" class="form-input" required />
            <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="var(--color-gold)">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>

          <button type="submit" class="btn btn-primary btn-full btn-lg">
            انشاء حساب
          </button>
        </form>
      </div>

      <div class="login-option">
        <span>لديك حساب بالفعل؟</span>
        <router-link to="/login" class="login-link">تسجيل الدخول</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  name: '',
  phone: '',
  username: '',
  password: '',
  confirmPassword: ''
})

async function handleRegister() {
  if (form.password !== form.confirmPassword) {
    alert('كلمتا المرور غير متطابقتين')
    return
  }
  const result = await authStore.register(form)
  if (result.success) {
    router.push('/login')
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  padding: 20px;
}

.register-container {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.register-header {
  text-align: center;
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

.register-form-card {
  width: 100%;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  padding: 32px 24px;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
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

.login-option {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.login-link {
  color: var(--color-gold);
  font-weight: 700;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
