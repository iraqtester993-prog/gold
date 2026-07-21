<template>
  <nav v-if="!route.meta.hideNav" class="bottom-nav">
    <router-link to="/home" class="nav-tab" :class="{ active: route.name === 'home' }">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
      <span>الرئيسية</span>
    </router-link>

    <router-link to="/categories" class="nav-tab" :class="{ active: route.name === 'categories' }">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
      <span>التصنيفات</span>
    </router-link>

    <router-link to="/orders" class="nav-tab" :class="{ active: route.name === 'orders' }">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
        <line x1="9" y1="12" x2="15" y2="12"/>
        <line x1="9" y1="16" x2="15" y2="16"/>
      </svg>
      <span>الطلبات</span>
    </router-link>

    <router-link to="/contracts" class="nav-tab" :class="{ active: route.name === 'contracts' }">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
      <span>العقود</span>
    </router-link>

    <router-link to="/profile" class="nav-tab" :class="{ active: route.name === 'profile' }">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
      <span>حسابي</span>
    </router-link>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: var(--mobile-nav-height);
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-light);
  z-index: 100;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: var(--bg-overlay);
  padding-bottom: env(safe-area-inset-bottom);
}

@media (min-width: 769px) {
  .bottom-nav {
    display: none;
  }
}

.nav-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 8px 12px;
  color: var(--text-muted);
  text-decoration: none;
  position: relative;
  transition: color var(--transition-fast);
}

.nav-tab.active {
  color: var(--color-gold);
}

.nav-tab.active::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 2px;
  background: var(--color-gold);
  border-radius: 0 0 2px 2px;
}

.nav-tab span {
  font-size: 0.62rem;
  font-weight: 600;
}

.nav-tab svg {
  transition: transform var(--transition-fast);
}

.nav-tab.active svg {
  transform: scale(1.1);
}
</style>
