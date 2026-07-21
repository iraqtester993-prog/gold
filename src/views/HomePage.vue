<template>
  <div class="home-page">
    <div class="container">

      <!-- Greeting Bar -->
      <div class="greeting-bar">
        <div class="greeting-user">
          <div class="user-avatar">
            <img v-if="customerStore.profile.avatar" :src="customerStore.profile.avatar" :alt="customerStore.profile.name" />
            <span v-else class="avatar-placeholder">{{ customerStore.profile.name.charAt(0) }}</span>
          </div>
          <div class="user-text">
            <span class="greeting-label">مرحباً بك</span>
            <h2 class="user-name">{{ customerStore.profile.name }}</h2>
          </div>
        </div>
        <button class="notification-btn" @click="$router.push('/notifications')">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span v-if="notificationStore.unreadCount > 0" class="notif-badge">
            {{ notificationStore.unreadCount }}
          </span>
        </button>
      </div>

      <!-- Search Bar -->
      <div class="search-bar" @click="$router.push('/products')">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <span class="search-placeholder">ابحث عن منتجات...</span>
      </div>

      <!-- Hero Slider -->
      <HeroSlider />

      <!-- Category Icons -->
      <CategoryIcons />

      <!-- Dashboard Section -->
      <section class="dashboard-section">
        <div class="section-header">
          <h2 class="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/>
              <rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>
            </svg>
            ملخص حسابك
          </h2>
        </div>
        <div class="dashboard-grid">
          <div class="dash-card glass-card">
            <div class="dash-card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
            <span class="dash-card-value">{{ customerStore.dashboard.activeContracts }}</span>
            <span class="dash-card-label">عقود نشطة</span>
          </div>

          <div class="dash-card glass-card">
            <div class="dash-card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <span class="dash-card-value">{{ formatCurrency(customerStore.dashboard.remainingAmount) }}</span>
            <span class="dash-card-label">المبلغ المتبقي</span>
          </div>

          <div class="dash-card glass-card">
            <div class="dash-card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <span class="dash-card-value">{{ customerStore.dashboard.remainingInstallments }}</span>
            <span class="dash-card-label">أقساط متبقية</span>
          </div>

          <div class="dash-card glass-card">
            <div class="dash-card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
              </svg>
            </div>
            <span class="dash-card-value">{{ formatCurrency(customerStore.dashboard.lastDeduction.amount) }}</span>
            <span class="dash-card-label">آخر استقطاع</span>
            <span class="dash-card-date">{{ formatDate(customerStore.dashboard.lastDeduction.date) }}</span>
          </div>

          <div class="dash-card glass-card dash-card-wide">
            <div class="dash-card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="m1 1 4 0 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </div>
            <div class="dash-card-order">
              <span class="dash-card-value-sm">{{ customerStore.dashboard.lastOrder.product }}</span>
              <span class="dash-card-label">{{ customerStore.dashboard.lastOrder.id }} · {{ formatDate(customerStore.dashboard.lastOrder.date) }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Products -->
      <section class="products-section">
        <div class="section-header">
          <h2 class="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            عروض اليوم
          </h2>
          <router-link to="/products" class="view-all">
            عرض الكل
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </router-link>
        </div>
        <div class="products-scroll">
          <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
        </div>
      </section>

      <!-- Best Sellers -->
      <section class="products-section">
        <div class="section-header">
          <h2 class="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2">
              <path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/>
            </svg>
            الأكثر مبيعاً
          </h2>
          <router-link to="/products" class="view-all">
            عرض الكل
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </router-link>
        </div>
        <div class="products-scroll">
          <ProductCard v-for="product in bestSellers" :key="product.id" :product="product" />
        </div>
      </section>

      <!-- New Products -->
      <section class="products-section">
        <div class="section-header">
          <h2 class="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            أجهزة جديدة
          </h2>
          <router-link to="/products" class="view-all">
            عرض الكل
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </router-link>
        </div>
        <div class="products-scroll">
          <ProductCard v-for="product in newProducts" :key="product.id" :product="product" />
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '../stores/productStore'
import { useCustomerStore } from '../stores/customerStore'
import { useNotificationStore } from '../stores/notificationStore'
import { useThemeStore } from '../stores/themeStore'
import { useCurrency } from '../composables/useCurrency'
import HeroSlider from '../components/home/HeroSlider.vue'
import CategoryIcons from '../components/home/CategoryIcons.vue'
import ProductCard from '../components/product/ProductCard.vue'

const productStore = useProductStore()
const customerStore = useCustomerStore()
const notificationStore = useNotificationStore()
const themeStore = useThemeStore()
const { formatCurrency } = useCurrency()

const featuredProducts = productStore.featuredProducts
const bestSellers = productStore.bestSellers
const newProducts = productStore.newProducts

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('ar-IQ', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>

<style scoped>
.home-page {
  padding: 16px 0 32px;
}

/* ── Greeting Bar ── */
.greeting-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.greeting-user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  overflow: hidden;
  border: 2px solid var(--color-gold);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--color-gold);
}

.greeting-label {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.user-name {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0;
}

.notification-btn {
  position: relative;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-full);
  color: var(--text-primary);
  transition: all var(--transition-fast);
}

.notification-btn:hover {
  border-color: var(--color-gold);
  color: var(--color-gold);
  box-shadow: var(--shadow-gold);
}

.notif-badge {
  position: absolute;
  top: -2px;
  left: -2px;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ef4444;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  border-radius: var(--radius-full);
  padding: 0 5px;
  border: 2px solid var(--bg-primary);
}

/* ── Search Bar ── */
.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  background: var(--bg-input);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  margin-bottom: 24px;
  cursor: pointer;
  transition: all var(--transition-fast);
  color: var(--text-muted);
}

.search-bar:hover {
  border-color: var(--color-gold);
  box-shadow: var(--shadow-gold);
}

.search-placeholder {
  font-size: 0.9rem;
}

/* ── Section Headers ── */
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0;
}

.view-all {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-gold);
  text-decoration: none;
  transition: opacity var(--transition-fast);
}

.view-all:hover {
  opacity: 0.8;
}

/* ── Dashboard ── */
.dashboard-section {
  margin-bottom: 36px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.glass-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all var(--transition-normal);
}

.glass-card:hover {
  border-color: var(--border-color);
  box-shadow: var(--shadow-md);
}

.dash-card {
  padding: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
}

.dash-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--color-gold-gradient);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.dash-card:hover::before {
  opacity: 1;
}

.dash-card-icon {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(212, 175, 55, 0.1);
  border-radius: var(--radius-md);
  color: var(--color-gold);
  margin-bottom: 2px;
}

.dash-card-value {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.2;
}

.dash-card-value-sm {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.3;
}

.dash-card-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 500;
}

.dash-card-date {
  font-size: 0.68rem;
  color: var(--color-gold);
  font-weight: 600;
}

.dash-card-wide {
  grid-column: span 2;
  flex-direction: row;
  gap: 14px;
  text-align: right;
}

.dash-card-order {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* ── Products Sections ── */
.products-section {
  margin-bottom: 36px;
}

.products-scroll {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .dash-card-wide {
    grid-column: span 2;
  }
  .products-scroll {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .greeting-label {
    display: none;
  }
  .user-name {
    font-size: 1rem;
  }
  .user-avatar {
    width: 40px;
    height: 40px;
  }
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  .dash-card {
    padding: 14px 10px;
  }
  .dash-card-value {
    font-size: 1rem;
  }
  .dash-card-wide {
    grid-column: span 2;
  }
  .products-scroll {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .dashboard-grid {
    grid-template-columns: 1fr 1fr;
  }
  .products-scroll {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
}
</style>
