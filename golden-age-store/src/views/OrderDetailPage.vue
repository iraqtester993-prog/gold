<template>
  <div class="order-detail-page" v-if="order">
    <div class="container">
      <div class="breadcrumb">
        <router-link to="/orders">طلباتي</router-link>
        <span>/</span>
        <span class="current">طلب #{{ order.id }}</span>
      </div>

      <div class="order-header">
        <h1>طلب #{{ order.id }}</h1>
        <span class="badge" :class="statusClass(order.status)">{{ order.statusLabel }}</span>
      </div>

      <div class="order-date">{{ formatDate(order.createdAt) }}</div>

      <div class="order-layout">
        <div class="order-items">
          <div v-for="item in order.items" :key="item.id" class="order-item">
            <img :src="item.image" :alt="item.name" />
            <div class="item-info">
              <h4>{{ item.name }}</h4>
              <span class="item-qty">الكمية: {{ item.quantity }}</span>
            </div>
            <span class="item-price">{{ formatCurrency(item.price * item.quantity) }}</span>
          </div>
        </div>

        <div class="order-info-card">
          <h3>تفاصيل الطلب</h3>
          <div class="info-row">
            <span>طريقة الدفع</span>
            <span>{{ paymentLabel }}</span>
          </div>
          <div class="info-row">
            <span>المدينة</span>
            <span>{{ order.city }}</span>
          </div>
          <div class="info-row">
            <span>العنوان</span>
            <span>{{ order.address }}</span>
          </div>
          <div class="info-row total">
            <span>الإجمالي</span>
            <span class="total-price">{{ formatCurrency(order.total) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderStore } from '../stores/orderStore'
import { useCurrency } from '../composables/useCurrency'

const route = useRoute()
const orderStore = useOrderStore()
const { formatCurrency } = useCurrency()

const order = computed(() => orderStore.getOrder(route.params.id))

const paymentLabels = {
  cash: 'الدفع عند الاستلام',
  installment: 'الدفع بالقسط',
  transfer: 'تحويل بنكي'
}

const paymentLabel = computed(() => order.value ? paymentLabels[order.value.paymentMethod] || '' : '')

function formatDate(date) {
  return new Date(date).toLocaleDateString('ar-IQ', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}

function statusClass(status) {
  const classes = { pending: 'badge-gold', delivered: 'badge-green', cancelled: 'badge-red' }
  return classes[status] || 'badge-gold'
}
</script>

<style scoped>
.order-detail-page {
  padding: 20px 0;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.breadcrumb a:hover {
  color: var(--color-gold);
}

.order-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.order-header h1 {
  font-size: 1.5rem;
  font-weight: 800;
}

.order-date {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 24px;
}

.order-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 24px;
  align-items: start;
}

.order-items {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 20px;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-light);
}

.order-item:last-child {
  border-bottom: none;
}

.order-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: var(--radius-md);
  background: var(--bg-input);
}

.item-info {
  flex: 1;
}

.item-info h4 {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.item-qty {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.item-price {
  font-weight: 700;
  color: var(--color-gold);
}

.order-info-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 24px;
}

.order-info-card h3 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.info-row.total {
  padding-top: 12px;
  border-top: 1px solid var(--border-light);
  font-weight: 700;
  color: var(--text-primary);
}

.total-price {
  color: var(--color-gold);
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .order-layout {
    grid-template-columns: 1fr;
  }
}
</style>
