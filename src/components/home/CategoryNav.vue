<template>
  <section class="category-section">
    <h3 class="section-label">الأقسام</h3>
    <div class="category-scroll">
      <div
        v-for="cat in categories"
        :key="cat.id"
        class="category-chip"
        :class="{ active: activeCategory === cat.slug }"
        @click="selectCategory(cat.slug)"
      >
        <span class="cat-icon">{{ cat.icon }}</span>
        <span class="cat-name">{{ cat.name }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeCategory = ref(null)

const categories = [
  { id: 'phones', name: 'هواتف', icon: '📱', slug: 'phones' },
  { id: 'laptops', name: 'لابتوب', icon: '💻', slug: 'laptops' },
  { id: 'tablets', name: 'لوحات', icon: '📟', slug: 'tablets' },
  { id: 'audio', name: 'سماعات', icon: '🎧', slug: 'audio' },
  { id: 'watches', name: 'ساعات', icon: '⌚', slug: 'watches' },
  { id: 'accessories', name: 'ملحقات', icon: '🔌', slug: 'accessories' }
]

function selectCategory(slug) {
  activeCategory.value = activeCategory.value === slug ? null : slug
  router.push(`/category/${slug}`)
}
</script>

<style scoped>
.category-section {
  margin-bottom: 24px;
}

.section-label {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.category-scroll {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 2px 0;
}

.category-scroll::-webkit-scrollbar {
  display: none;
}

.category-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-full);
  white-space: nowrap;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.category-chip:active,
.category-chip.active {
  background: var(--color-gold);
  border-color: var(--color-gold);
  color: var(--bg-primary);
}

.cat-icon {
  font-size: 1.1rem;
}

.cat-name {
  font-size: 0.8rem;
  font-weight: 600;
}

.category-chip.active .cat-name {
  color: var(--bg-primary);
}
</style>
