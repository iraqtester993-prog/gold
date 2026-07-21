<template>
  <section class="hero-slider">
    <div class="slides-wrapper" :style="{ transform: `translateX(${currentSlide * 100}%)` }">
      <div v-for="(slide, i) in slides" :key="i" class="slide" :style="{ background: slide.bg }">
        <div class="slide-content container">
          <div class="slide-text">
            <span class="slide-badge">{{ slide.badge }}</span>
            <h1 class="slide-title">{{ slide.title }}</h1>
            <p class="slide-desc">{{ slide.desc }}</p>
            <div class="slide-price" v-if="slide.price">
              <span class="old-price">{{ formatCurrency(slide.oldPrice) }}</span>
              <span class="new-price">{{ formatCurrency(slide.price) }}</span>
            </div>
            <router-link :to="slide.link" class="btn btn-primary btn-lg">
              {{ slide.btnText }}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="flip-rtl">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </router-link>
          </div>
          <div class="slide-image">
            <img :src="slide.image" :alt="slide.title" />
          </div>
        </div>
      </div>
    </div>

    <div class="slider-controls">
      <button class="slider-btn prev" @click="prevSlide">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      <div class="slider-dots">
        <button
          v-for="(_, i) in slides"
          :key="i"
          class="dot"
          :class="{ active: currentSlide === i }"
          @click="currentSlide = i"
        />
      </div>
      <button class="slider-btn next" @click="nextSlide">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCurrency } from '../../composables/useCurrency'

const { formatCurrency } = useCurrency()
const currentSlide = ref(0)
let timer = null

const slides = [
  {
    badge: 'عرض خاص',
    title: 'iPhone 15 Pro Max',
    desc: 'الأحدث من آبل - تصميم تيتانيوم مع شريحة A17 Pro',
    price: 1800000,
    oldPrice: 2000000,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600',
    link: '/products/2',
    btnText: 'تسوق الآن',
    bg: 'linear-gradient(135deg, #0a1628 0%, #1a2a4a 100%)'
  },
  {
    badge: 'جديد',
    title: 'Samsung Galaxy S24 Ultra',
    desc: 'كامل المواصفات - كاميرا 200MP - معالج Snapdragon 8 Gen 3',
    price: 1500000,
    oldPrice: 1800000,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600',
    link: '/products/1',
    btnText: 'التفاصيل',
    bg: 'linear-gradient(135deg, #0f2035 0%, #1a3050 100%)'
  },
  {
    badge: 'الأكثر مبيعاً',
    title: 'MacBook Pro M3',
    desc: 'أداء خارق للمحترفين - شريحة M3 الجديدة',
    price: 2500000,
    oldPrice: 2800000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600',
    link: '/products/3',
    btnText: 'اطلب الآن',
    bg: 'linear-gradient(135deg, #0a1628 0%, #162040 100%)'
  }
]

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
}

onMounted(() => {
  timer = setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.hero-slider {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
  margin-bottom: 32px;
}

.slides-wrapper {
  display: flex;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide {
  min-width: 100%;
  padding: 48px 0;
}

.slide-content {
  display: flex;
  align-items: center;
  gap: 40px;
}

.slide-text {
  flex: 1;
}

.slide-badge {
  display: inline-block;
  padding: 4px 14px;
  background: var(--color-gold);
  color: var(--bg-primary);
  font-size: 0.8rem;
  font-weight: 700;
  border-radius: var(--radius-full);
  margin-bottom: 16px;
}

.slide-title {
  font-size: 2.2rem;
  font-weight: 900;
  color: var(--text-primary);
  margin-bottom: 12px;
  line-height: 1.2;
}

.slide-desc {
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 20px;
  max-width: 400px;
}

.slide-price {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.old-price {
  text-decoration: line-through;
  color: var(--text-muted);
  font-size: 1.1rem;
}

.new-price {
  color: var(--color-gold);
  font-size: 1.6rem;
  font-weight: 800;
}

.slide-image {
  flex: 0 0 300px;
  display: flex;
  justify-content: center;
}

.slide-image img {
  max-height: 260px;
  object-fit: contain;
  border-radius: var(--radius-md);
}

.slider-controls {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;
}

.slider-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border-light);
  transition: all var(--transition-fast);
}

.slider-btn:hover {
  background: var(--color-gold);
  color: var(--bg-primary);
  border-color: var(--color-gold);
}

.slider-dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--text-muted);
  transition: all var(--transition-fast);
}

.dot.active {
  width: 24px;
  background: var(--color-gold);
}

@media (max-width: 768px) {
  .slide-content {
    flex-direction: column;
    text-align: center;
  }

  .slide-title {
    font-size: 1.5rem;
  }

  .slide-image {
    flex: none;
  }

  .slide-image img {
    max-height: 160px;
  }

  .slide-price {
    justify-content: center;
  }
}
</style>
