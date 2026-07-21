<template>
  <div class="cart-page">
    <div class="container">
      <h1 class="page-title">سلة المشتريات</h1>

      <div v-if="cartStore.items.length" class="cart-layout">
        <div class="cart-items">
          <CartItem v-for="item in cartStore.items" :key="item.id" :item="item" />
        </div>

        <div class="cart-summary-card">
          <h3>ملخص الطلب</h3>
          <div class="summary-rows">
            <div class="summary-row">
              <span>عدد المنتجات</span>
              <span>{{ cartStore.totalItems }}</span>
            </div>
            <div class="summary-row">
              <span>المجموع الفرعي</span>
              <span>{{ formatCurrency(cartStore.totalPrice) }}</span>
            </div>
            <div v-if="cartStore.totalSavings > 0" class="summary-row savings">
              <span>التخفيضات</span>
              <span>-{{ formatCurrency(cartStore.totalSavings) }}</span>
            </div>
            <div class="summary-row total">
              <span>الإجمالي</span>
              <span class="total-price">{{ formatCurrency(cartStore.totalPrice) }}</span>
            </div>
          </div>
          <router-link to="/checkout" class="btn btn-primary btn-full btn-lg">
            إتمام الشراء
          </router-link>
          <router-link to="/products" class="btn btn-outline btn-full" style="margin-top: 10px;">
            متابعة التسوق
          </router-link>
        </div>
      </div>

      <div v-else class="empty-cart">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.5">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="m1 1 4 0 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <h2>سلتك فارغة</h2>
        <p>ابدأ التسوق الآن واكتشف أفضل الأجهزة الإلكترونية</p>
        <router-link to="/products" class="btn btn-primary btn-lg">
          تصفح المنتجات
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cartStore'
import { useCurrency } from '../composables/useCurrency'
import CartItem from '../components/cart/CartItem.vue'

const cartStore = useCartStore()
const { formatCurrency } = useCurrency()
</script>

<style scoped>
.cart-page {
  padding: 20px 0;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 24px;
}

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 24px;
  align-items: start;
}

.cart-items {
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 20px;
}

.cart-summary-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 24px;
  position: sticky;
  top: calc(var(--header-height) + 20px);
}

.cart-summary-card h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.summary-rows {
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.summary-row.savings {
  color: #22c55e;
}

.summary-row.total {
  padding-top: 12px;
  border-top: 1px solid var(--border-light);
  font-weight: 700;
  font-size: 1rem;
  color: var(--text-primary);
}

.total-price {
  color: var(--color-gold);
  font-size: 1.2rem;
}

.empty-cart {
  text-align: center;
  padding: 80px 20px;
}

.empty-cart h2 {
  font-size: 1.5rem;
  margin: 20px 0 12px;
  color: var(--text-primary);
}

.empty-cart p {
  color: var(--text-secondary);
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }

  .cart-summary-card {
    position: static;
  }
}
</style>
