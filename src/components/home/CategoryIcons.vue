<template>
  <section class="brands-section">
    <h3 class="brands-title">الماركات</h3>
    <div class="brands-scroll">
      <div
        v-for="brand in brands"
        :key="brand.id"
        class="brand-item"
        @click="$router.push(`/category/${brand.slug}`)"
      >
        <div class="brand-circle">
          <img :src="brand.image" :alt="brand.name" />
        </div>
        <span class="brand-name">{{ brand.name }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
const brands = [
  {
    id: 'samsung',
    name: 'Samsung',
    slug: 'phones',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/200px-Samsung_Logo.svg.png'
  },
  {
    id: 'apple',
    name: 'Apple',
    slug: 'phones',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/200px-Apple_logo_black.svg.png'
  },
  {
    id: 'sony',
    name: 'Sony',
    slug: 'audio',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Sony_logo_2019.svg/200px-Sony_logo_2019.svg.png'
  },
  {
    id: 'dell',
    name: 'Dell',
    slug: 'laptops',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/200px-Dell_Logo.svg.png'
  },
  {
    id: 'hp',
    name: 'HP',
    slug: 'laptops',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/200px-HP_logo_2012.svg.png'
  },
  {
    id: 'lenovo',
    name: 'Lenovo',
    slug: 'laptops',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Lenovo_logo_2015.svg/200px-Lenovo_logo_2015.svg.png'
  }
]
</script>

<style scoped>
.brands-section {
  margin-bottom: 24px;
}

.brands-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 14px;
}

.brands-scroll {
  display: flex;
  gap: 18px;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 4px 0;
}

.brands-scroll::-webkit-scrollbar {
  display: none;
}

.brand-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 68px;
  cursor: pointer;
  transition: transform var(--transition-fast);
}

.brand-item:active {
  transform: scale(0.95);
}

.brand-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--bg-card);
  border: 2px solid var(--border-light);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all var(--transition-fast);
}

.brand-item:active .brand-circle {
  border-color: var(--color-gold);
}

.brand-circle img {
  width: 40px;
  height: 40px;
  object-fit: contain;
  filter: var(--brand-logo-filter, none);
}

.brand-name {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-align: center;
}
</style>
