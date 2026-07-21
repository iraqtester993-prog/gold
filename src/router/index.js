import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomePage.vue'),
    meta: { title: 'الرئيسية' }
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/ProductsPage.vue'),
    meta: { title: 'المنتجات' }
  },
  {
    path: '/products/:id',
    name: 'product-detail',
    component: () => import('../views/ProductDetailPage.vue'),
    meta: { title: 'تفاصيل المنتج' }
  },
  {
    path: '/category/:slug',
    name: 'category',
    component: () => import('../views/ProductsPage.vue'),
    meta: { title: 'القسم' }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/CartPage.vue'),
    meta: { title: 'سلة المشتريات' }
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('../views/CheckoutPage.vue'),
    meta: { title: 'إتمام الطلب' }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginPage.vue'),
    meta: { title: 'تسجيل الدخول', guest: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterPage.vue'),
    meta: { title: 'إنشاء حساب', guest: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfilePage.vue'),
    meta: { title: 'الملف الشخصي', requiresAuth: true }
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('../views/OrdersPage.vue'),
    meta: { title: 'طلباتي', requiresAuth: true }
  },
  {
    path: '/orders/:id',
    name: 'order-detail',
    component: () => import('../views/OrderDetailPage.vue'),
    meta: { title: 'تفاصيل الطلب', requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || 'الرئيسية'} | العصر الذهبي`
  next()
})

export default router
