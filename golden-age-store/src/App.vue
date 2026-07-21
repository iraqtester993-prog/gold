<template>
  <div id="app" :data-theme="theme">
    <AppHeader v-if="!hideHeader" />
    <main class="main-content" :class="{ 'no-header': hideHeader }">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <MobileNav v-if="!hideHeader" />
    <CartDrawer />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeStore } from './stores/themeStore'
import AppHeader from './components/layout/AppHeader.vue'
import MobileNav from './components/layout/MobileNav.vue'
import CartDrawer from './components/cart/CartDrawer.vue'

const route = useRoute()
const themeStore = useThemeStore()

const theme = computed(() => themeStore.currentTheme)
const hideHeader = computed(() => ['login', 'register'].includes(route.name))

onMounted(() => {
  themeStore.initTheme()
})
</script>

<style>
.main-content {
  padding-top: var(--header-height);
  min-height: 100vh;
  padding-bottom: 80px;
}

.main-content.no-header {
  padding-top: 0;
  padding-bottom: 0;
}

@media (min-width: 769px) {
  .main-content {
    padding-bottom: 0;
  }
}
</style>
