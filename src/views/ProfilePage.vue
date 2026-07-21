<template>
  <div class="profile-page">
    <div class="container">
      <h1 class="page-title">الملف الشخصي</h1>

      <div class="profile-layout">
        <div class="profile-card">
          <div class="profile-avatar">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h2>{{ authStore.user?.name || 'مستخدم' }}</h2>
          <p>{{ authStore.user?.phone || '07XX XXX XXXX' }}</p>
        </div>

        <div class="profile-menu">
          <router-link to="/orders" class="menu-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <span>طلباتي</span>
            <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </router-link>

          <button class="menu-item" @click="authStore.logout()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  authStore.checkAuth()
  if (!authStore.isLoggedIn) {
    router.push('/login')
  }
})
</script>

<style scoped>
.profile-page {
  padding: 20px 0;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 24px;
}

.profile-layout {
  max-width: 500px;
}

.profile-card {
  text-align: center;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 40px 24px;
  margin-bottom: 20px;
}

.profile-avatar {
  width: 90px;
  height: 90px;
  border-radius: var(--radius-full);
  background: var(--bg-input);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  border: 2px solid var(--color-gold);
}

.profile-card h2 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.profile-card p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.profile-menu {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  color: var(--text-primary);
  font-size: 0.95rem;
  transition: background var(--transition-fast);
  width: 100%;
  text-align: right;
}

.menu-item:hover {
  background: var(--bg-card-hover);
}

.menu-item .arrow {
  margin-right: auto;
  color: var(--text-muted);
}
</style>
