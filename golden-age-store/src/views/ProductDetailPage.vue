<template>
  <div class="product-detail" v-if="product">
    <div class="container">
      <div class="breadcrumb">
        <router-link to="/">الرئيسية</router-link>
        <span>/</span>
        <router-link to="/products">المنتجات</router-link>
        <span>/</span>
        <span class="current">{{ product.name }}</span>
      </div>

      <div class="detail-grid">
        <div class="product-gallery">
          <div class="main-image">
            <img :src="product.image" :alt="product.name" />
            <div class="image-badges">
              <span v-if="product.isNew" class="badge badge-gold">جديد</span>
              <span v-if="discount > 0" class="badge badge-red">-{{ discount }}%</span>
            </div>
          </div>
        </div>

        <div class="product-info">
          <span class="product-brand">{{ product.brand }}</span>
          <h1 class="product-name">{{ product.name }}</h1>

          <div class="product-rating">
            <div class="stars">
              <svg v-for="i in 5" :key="i" width="18" height="18" viewBox="0 0 24 24"
                :fill="i <= Math.round(product.rating) ? 'var(--color-gold)' : 'none'"
                :stroke="i <= Math.round(product.rating) ? 'var(--color-gold)' : 'var(--text-muted)'"
                stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <span>{{ product.rating }}</span>
            <span class="review-count">({{ product.reviews }} تقييم)</span>
          </div>

          <div class="product-price-section">
            <span class="current-price">{{ formatCurrency(product.price) }}</span>
            <span v-if="product.originalPrice > product.price" class="original-price">
              {{ formatCurrency(product.originalPrice) }}
            </span>
            <span v-if="discount > 0" class="discount-badge">خصم {{ discount }}%</span>
          </div>

          <InstallmentBadge :price="product.price" :months="3" />

          <div class="product-specs" v-if="product.specs">
            <h3>المواصفات</h3>
            <div class="specs-grid">
              <div v-for="(value, key) in product.specs" :key="key" class="spec-item">
                <span class="spec-label">{{ specLabels[key] || key }}</span>
                <span class="spec-value">{{ value }}</span>
              </div>
            </div>
          </div>

          <div class="product-description">
            <h3>الوصف</h3>
            <p>{{ product.description }}</p>
          </div>

          <div class="product-actions">
            <button class="btn btn-primary btn-lg btn-full" @click="addToCart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="m1 1 4 0 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              أضف للسلة
            </button>
          </div>
        </div>
      </div>

      <InstallmentCalc :price="product.price" />

      <FeaturedProducts title="منتجات مشابهة" :products="relatedProducts" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/productStore'
import { useCartStore } from '../stores/cartStore'
import { useCurrency } from '../composables/useCurrency'
import InstallmentBadge from '../components/common/InstallmentBadge.vue'
import InstallmentCalc from '../components/payment/InstallmentCalc.vue'
import FeaturedProducts from '../components/home/FeaturedProducts.vue'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()
const { formatCurrency } = useCurrency()

const product = computed(() => productStore.getProduct(route.params.id))

const relatedProducts = computed(() => {
  if (!product.value) return []
  return productStore.getProductsByCategory(product.value.category)
    .filter(p => p.id !== product.value.id)
    .slice(0, 4)
})

const discount = computed(() => {
  if (!product.value || !product.value.originalPrice || product.value.originalPrice <= product.value.price) return 0
  return Math.round((1 - product.value.price / product.value.originalPrice) * 100)
})

const specLabels = {
  storage: 'التخزين',
  ram: 'الذاكرة',
  screen: 'الشاشة',
  type: 'النوع',
  wireless: 'لاسلكي',
  anc: 'إلغاء الضوضاء'
}

function addToCart() {
  cartStore.addItem(product.value)
}
</script>

<style scoped>
.product-detail {
  padding: 20px 0 40px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.breadcrumb a:hover {
  color: var(--color-gold);
}

.breadcrumb .current {
  color: var(--text-primary);
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

.main-image {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-image img {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
}

.image-badges {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.product-brand {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-name {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 8px 0 16px;
  line-height: 1.3;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.stars {
  display: flex;
  gap: 2px;
}

.product-rating > span {
  font-weight: 600;
  color: var(--text-primary);
}

.review-count {
  color: var(--text-muted) !important;
  font-weight: 400 !important;
  font-size: 0.85rem;
}

.product-price-section {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.current-price {
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--color-gold);
}

.original-price {
  font-size: 1.1rem;
  color: var(--text-muted);
  text-decoration: line-through;
}

.discount-badge {
  padding: 4px 12px;
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: var(--radius-full);
}

.product-specs, .product-description {
  margin-top: 24px;
}

.product-specs h3, .product-description h3 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.specs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.spec-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 14px;
  background: var(--bg-input);
  border-radius: var(--radius-md);
}

.spec-label {
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.spec-value {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--text-primary);
}

.product-description p {
  color: var(--text-secondary);
  line-height: 1.8;
}

.product-actions {
  margin-top: 24px;
}

@media (max-width: 768px) {
  .detail-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .product-name {
    font-size: 1.3rem;
  }

  .current-price {
    font-size: 1.4rem;
  }
}
</style>
