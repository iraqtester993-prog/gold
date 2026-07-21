<template>
  <div class="home-page">
    <div class="container">
      <HeroSlider />
      <CategoryIcons />
      <FeaturedProducts title="🔥 عروض اليوم" :products="featuredProducts" />
      <FeaturedProducts title="⭐ الأكثر مبيعاً" :products="bestSellers" />
      <FeaturedProducts title="📱 أجهزة جديدة" :products="newProducts" />
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '../stores/productStore'
import HeroSlider from '../components/home/HeroSlider.vue'
import CategoryIcons from '../components/home/CategoryIcons.vue'
import FeaturedProducts from '../components/home/FeaturedProducts.vue'

const productStore = useProductStore()
const featuredProducts = productStore.featuredProducts
const bestSellers = productStore.bestSellers
const newProducts = productStore.newProducts
</script>

<style scoped>
.home-page {
  padding: 16px 0;
}
</style>
