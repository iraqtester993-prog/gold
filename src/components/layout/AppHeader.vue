<template>
  <header class="app-header" :class="{ scrolled: isScrolled }">
    <div class="container header-content">
      <router-link to="/home" class="logo">
        <div class="logo-icon">
          <svg viewBox="0 0 40 40" width="36" height="36">
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#D4A843;stop-opacity:1"/>
                <stop offset="100%" style="stop-color:#F0D078;stop-opacity:1"/>
              </linearGradient>
            </defs>
            <rect x="4" y="4" width="14" height="14" rx="3" fill="url(#logoGrad)" opacity="0.85"/>
            <rect x="22" y="4" width="14" height="14" rx="3" fill="url(#logoGrad)" opacity="0.65"/>
            <rect x="4" y="22" width="14" height="14" rx="3" fill="url(#logoGrad)" opacity="0.65"/>
            <rect x="22" y="22" width="14" height="14" rx="3" fill="url(#logoGrad)" opacity="0.45"/>
            <rect x="13" y="13" width="14" height="14" rx="3" fill="url(#logoGrad)"/>
          </svg>
        </div>
        <div class="logo-text">
          <span class="logo-name">العصر الذهبي</span>
          <span class="logo-tagline">أجهزة إلكترونية</span>
        </div>
      </router-link>

      <div class="search-bar" :class="{ focused: searchFocused }">
        <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="ابحث عن منتج..."
          @focus="searchFocused = true"
          @blur="searchFocused = false"
          @input="handleSearch"
        />
      </div>

      <div class="header-actions">
        <ThemeToggle />

        <button class="action-btn notif-btn" @click="goToNotifs">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span v-if="notificationStore.unreadCount > 0" class="notif-badge">
            {{ notificationStore.unreadCount }}
          </span>
        </button>

        <router-link to="/cart" class="action-btn cart-btn">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="m1 1 4 0 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span v-if="cartStore.totalItems > 0" class="cart-badge">
            {{ cartStore.totalItems }}
          </span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../../stores/cartStore'
import { useAuthStore } from '../../stores/authStore'
import { useProductStore } from '../../stores/productStore'
import { useNotificationStore } from '../../stores/notificationStore'
import ThemeToggle from '../common/ThemeToggle.vue'

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()
const productStore = useProductStore()
const notificationStore = useNotificationStore()

const searchQuery = ref('')
const searchFocused = ref(false)
const isScrolled = ref(false)

function handleSearch() {
  productStore.searchQuery = searchQuery.value
  if (searchQuery.value && router.currentRoute.value.name !== 'products') {
    router.push('/products')
  }
}

function goToNotifs() {
  router.push('/notifications')
}

function onScroll() {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-light);
  z-index: 100;
  transition: all var(--transition-normal);
}

.app-header.scrolled {
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.header-content {
  display: flex;
  align-items: center;
  height: 100%;
  gap: 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  text-decoration: none;
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--transition-fast);
}

.logo:hover .logo-icon {
  transform: rotate(-4deg) scale(1.05);
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-name {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-gold);
  line-height: 1.2;
  background: var(--color-gold-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-tagline {
  font-size: 0.7rem;
  color: var(--text-secondary);
  font-weight: 400;
}

.search-bar {
  flex: 1;
  max-width: 480px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: var(--bg-input);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-full);
  transition: all var(--transition-fast);
}

.search-bar.focused {
  border-color: var(--color-gold);
  box-shadow: 0 0 0 3px rgba(212, 168, 67, 0.1);
  background: var(--bg-card);
}

.search-icon {
  color: var(--text-muted);
  flex-shrink: 0;
  transition: color var(--transition-fast);
}

.search-bar.focused .search-icon {
  color: var(--color-gold);
}

.search-bar input {
  flex: 1;
  color: var(--text-primary);
  font-size: 0.9rem;
  background: none;
  border: none;
  outline: none;
}

.search-bar input::placeholder {
  color: var(--text-muted);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.action-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  transition: all var(--transition-fast);
  text-decoration: none;
}

.action-btn:hover {
  background: var(--bg-card);
  color: var(--color-gold);
}

.cart-badge {
  position: absolute;
  top: 2px;
  left: 2px;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gold);
  color: var(--bg-primary);
  font-size: 0.65rem;
  font-weight: 700;
  border-radius: var(--radius-full);
  padding: 0 4px;
  animation: badgePop 0.3s ease;
}

.notif-btn {
  position: relative;
}

.notif-badge {
  position: absolute;
  top: 2px;
  left: 2px;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ef4444;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  border-radius: var(--radius-full);
  padding: 0 4px;
  animation: badgePop 0.3s ease;
}

@keyframes badgePop {
  0% { transform: scale(0); }
  70% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

@media (max-width: 768px) {
  .search-bar {
    display: none;
  }

  .logo-text {
    display: none;
  }

  .app-header {
    padding: 0 8px;
  }
}
</style>
