<template>
  <div class="products-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">
          {{ currentCategory ? currentCategory.name : 'جميع المنتجات' }}
        </h1>
        <div class="sort-bar">
          <select v-model="productStore.sortBy" class="sort-select">
            <option value="featured">المميزة</option>
            <option value="price-low">السعر: الأقل</option>
            <option value="price-high">السعر: الأعلى</option>
            <option value="rating">التقييم</option>
            <option value="newest">الأحدث</option>
          </select>
          <span class="results-count">{{ productStore.filteredProducts.length }} منتج</span>
        </div>
      </div>

      <div class="products-layout">
        <aside class="filters-sidebar">
          <div class="filter-section">
            <h4>الأقسام</h4>
            <label
              v-for="cat in productStore.categories"
              :key="cat.id"
              class="filter-option"
            >
              <input
                type="radio"
                :value="cat.id"
                v-model="productStore.selectedCategory"
                name="category"
              />
              <span class="checkmark"></span>
              <span>{{ cat.icon }} {{ cat.name }}</span>
            </label>
            <label class="filter-option">
              <input type="radio" :value="null" v-model="productStore.selectedCategory" name="category" />
              <span class="checkmark"></span>
              <span>الكل</span>
            </label>
          </div>

          <button
            v-if="productStore.selectedCategory"
            class="btn btn-outline btn-sm btn-full"
            @click="productStore.selectedCategory = null"
          >
            مسح الفلتر
          </button>
        </aside>

        <div class="products-content">
          <div class="products-grid">
            <ProductCard
              v-for="product in productStore.filteredProducts"
              :key="product.id"
              :product="product"
            />
          </div>
          <div v-if="productStore.filteredProducts.length === 0" class="no-results">
            <p>لا توجد منتجات مطابقة</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/productStore'
import ProductCard from '../components/product/ProductCard.vue'

const route = useRoute()
const productStore = useProductStore()

const currentCategory = computed(() => {
  if (route.params.slug) {
    return productStore.categories.find(c => c.slug === route.params.slug)
  }
  return null
})

onMounted(() => {
  if (route.params.slug) {
    productStore.selectedCategory = route.params.slug
  }
})

watch(() => route.params.slug, (newSlug) => {
  productStore.selectedCategory = newSlug || null
})
</script>

<style scoped>
.products-page {
  padding: 20px 0;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
}

.sort-bar {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sort-select {
  padding: 8px 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.85rem;
  cursor: pointer;
}

.results-count {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.products-layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 24px;
}

.filters-sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.filter-section h4 {
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  cursor: pointer;
  color: var(--text-secondary);
  font-size: 0.9rem;
  transition: color var(--transition-fast);
}

.filter-option:hover {
  color: var(--color-gold);
}

.filter-option input {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid var(--border-light);
  border-radius: var(--radius-full);
  transition: all var(--transition-fast);
}

.filter-option input:checked ~ .checkmark {
  border-color: var(--color-gold);
  background: var(--color-gold);
  box-shadow: inset 0 0 0 3px var(--bg-card);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.no-results {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-muted);
  font-size: 1.1rem;
}

@media (max-width: 1024px) {
  .products-layout {
    grid-template-columns: 1fr;
  }

  .filters-sidebar {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  }

  .filter-section {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }

  .filter-section h4 {
    margin-bottom: 0;
    margin-left: 8px;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}
</style>
