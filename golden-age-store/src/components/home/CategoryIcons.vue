<template>
  <section class="category-icons">
    <router-link
      v-for="cat in categories"
      :key="cat.id"
      :to="`/category/${cat.slug}`"
      class="category-item"
    >
      <div class="category-icon">
        <span class="icon-emoji">{{ cat.icon }}</span>
      </div>
      <span class="category-name">{{ cat.name }}</span>
    </router-link>
  </section>
</template>

<script setup>
const categories = [
  { id: 'phones', name: 'هواتف', icon: '📱', slug: 'phones' },
  { id: 'laptops', name: 'لابتوب', icon: '💻', slug: 'laptops' },
  { id: 'tablets', name: 'لوحات', icon: '📟', slug: 'tablets' },
  { id: 'audio', name: 'سماعات', icon: '🎧', slug: 'audio' },
  { id: 'watches', name: 'ساعات', icon: '⌚', slug: 'watches' },
  { id: 'accessories', name: 'ملحقات', icon: '🔌', slug: 'accessories' }
]
</script>

<style scoped>
.category-icons {
  display: flex;
  justify-content: center;
  gap: 24px;
  padding: 24px 0;
  margin-bottom: 32px;
  overflow-x: auto;
  scrollbar-width: none;
}

.category-icons::-webkit-scrollbar {
  display: none;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 72px;
  transition: transform var(--transition-fast);
}

.category-item:hover {
  transform: translateY(-4px);
}

.category-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
}

.category-item:hover .category-icon {
  border-color: var(--color-gold);
  box-shadow: var(--shadow-gold);
}

.icon-emoji {
  font-size: 1.8rem;
}

.category-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
  transition: color var(--transition-fast);
}

.category-item:hover .category-name {
  color: var(--color-gold);
}

@media (max-width: 768px) {
  .category-icons {
    justify-content: flex-start;
    padding: 16px 0;
    gap: 16px;
  }

  .category-icon {
    width: 56px;
    height: 56px;
  }

  .icon-emoji {
    font-size: 1.5rem;
  }
}
</style>
