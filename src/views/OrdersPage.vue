<template>
  <div class="orders-page">
    <div class="container">
      <h1 class="page-title">طلباتي</h1>

      <div v-if="orderStore.orders.length" class="orders-list">
        <router-link
          v-for="order in orderStore.orders"
          :key="order.id"
          :to="`/orders/${order.id}`"
          class="order-card"
        >
          <div class="order-header">
            <span class="order-id">طلب #{{ order.id }}</span>
            <span class="badge" :class="statusClass(order.status)">{{ order.statusLabel }}</span>
          </div>
          <div class="order-body">
            <div class="order-items-preview">
              <img v-for="(item, i) in order.items.slice(0, 3)" :key="i" :src="item.image" :alt="item.name" />
              <span v-if="order.items.length > 3" class="more">+{{ order.items.length - 3 }}</span>
            </div>
            <div class="order-info">
              <span class="order-date">{{ formatDate(order.createdAt) }}</span>
              <span class="order-total">{{ formatCurrency(order.total) }}</span>
            </div>
          </div>
        </router-link>
      </div>

      <div v-else class="empty-orders">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
        <h2>لا توجد طلبات</h2>
        <p>لم تقم بأي طلبات بعد</p>
        <router-link to="/products" class="btn btn-primary">تسوق الآن</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useOrderStore } from '../stores/orderStore'
import { useCurrency } from '../composables/useCurrency'

const orderStore = useOrderStore()
const { formatCurrency } = useCurrency()

function formatDate(date) {
  return new Date(date).toLocaleDateString('ar-IQ', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}

function statusClass(status) {
  const classes = {
    pending: 'badge-gold',
    delivered: 'badge-green',
    cancelled: 'badge-red'
  }
  return classes[status] || 'badge-gold'
}
</script>

<style scoped>
.orders-page {
  padding: 20px 0;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 24px;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 600px;
}

.order-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 16px 20px;
  transition: all var(--transition-fast);
}

.order-card:hover {
  border-color: var(--border-color);
  box-shadow: var(--shadow-md);
}

.order-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.order-id {
  font-weight: 700;
  font-size: 0.9rem;
}

.order-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.order-items-preview {
  display: flex;
  align-items: center;
}

.order-items-preview img {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  object-fit: cover;
  background: var(--bg-input);
  margin-left: -8px;
  border: 2px solid var(--bg-card);
}

.order-items-preview img:first-child {
  margin-left: 0;
}

.more {
  margin-left: -8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-input);
  border-radius: var(--radius-md);
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 600;
}

.order-info {
  text-align: left;
}

.order-date {
  display: block;
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.order-total {
  font-weight: 800;
  color: var(--color-gold);
}

.empty-orders {
  text-align: center;
  padding: 80px 20px;
}

.empty-orders h2 {
  margin: 20px 0 8px;
  color: var(--text-primary);
}

.empty-orders p {
  color: var(--text-secondary);
  margin-bottom: 24px;
}
</style>
