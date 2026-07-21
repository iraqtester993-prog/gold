<template>
  <div class="checkout-page">
    <div class="container">
      <h1 class="page-title">إتمام الطلب</h1>

      <div class="checkout-layout">
        <div class="checkout-form-section">
          <div class="section-card">
            <h2>معلومات التوصيل</h2>
            <form class="checkout-form">
              <div class="form-row">
                <div class="form-group">
                  <label>الاسم الكامل</label>
                  <input v-model="form.name" type="text" class="form-input" placeholder="أدخل اسمك الكامل" />
                </div>
                <div class="form-group">
                  <label>رقم الهاتف</label>
                  <input v-model="form.phone" type="tel" class="form-input" placeholder="07XX XXX XXXX" />
                </div>
              </div>
              <div class="form-group">
                <label>المدينة</label>
                <select v-model="form.city" class="form-input">
                  <option value="">اختر المدينة</option>
                  <option value="baghdad">بغداد</option>
                  <option value="basra">البصرة</option>
                  <option value="erbil">أربيل</option>
                  <option value="sulaymaniyah">السليمانية</option>
                  <option value="najaf">النجف</option>
                  <option value="karbala">كربلاء</option>
                  <option value="mosul">الموصل</option>
                  <option value="diyala">ديالى</option>
                </select>
              </div>
              <div class="form-group">
                <label>العنوان التفصيلي</label>
                <textarea v-model="form.address" class="form-input" rows="3" placeholder="الحي، الشارع، رقم المنزل..."></textarea>
              </div>
            </form>
          </div>

          <div class="section-card">
            <h2>طريقة الدفع</h2>
            <div class="payment-options">
              <label class="payment-option" :class="{ active: form.paymentMethod === 'cash' }">
                <input type="radio" value="cash" v-model="form.paymentMethod" />
                <div class="option-content">
                  <span class="option-icon">💵</span>
                  <div>
                    <span class="option-title">الدفع عند الاستلام</span>
                    <span class="option-desc">ادفع عند استلام طلبك</span>
                  </div>
                </div>
              </label>

              <label class="payment-option" :class="{ active: form.paymentMethod === 'installment' }">
                <input type="radio" value="installment" v-model="form.paymentMethod" />
                <div class="option-content">
                  <span class="option-icon">📅</span>
                  <div>
                    <span class="option-title">الدفع بالقسط</span>
                    <span class="option-desc">قسم المبلغ على أقساط شهرية</span>
                  </div>
                </div>
              </label>

              <label class="payment-option" :class="{ active: form.paymentMethod === 'transfer' }">
                <input type="radio" value="transfer" v-model="form.paymentMethod" />
                <div class="option-content">
                  <span class="option-icon">🏦</span>
                  <div>
                    <span class="option-title">تحويل بنكي</span>
                    <span class="option-desc">تحويل مباشر إلى الحساب البنكي</span>
                  </div>
                </div>
              </label>
            </div>

            <InstallmentCalc v-if="form.paymentMethod === 'installment'" :price="cartStore.totalPrice" />
          </div>
        </div>

        <div class="order-summary-card">
          <h3>ملخص الطلب</h3>
          <div class="order-items">
            <div v-for="item in cartStore.items" :key="item.id" class="order-item">
              <img :src="item.image" :alt="item.name" />
              <div class="item-info">
                <span class="item-name">{{ item.name }}</span>
                <span class="item-qty">الكمية: {{ item.quantity }}</span>
              </div>
              <span class="item-price">{{ formatCurrency(item.price * item.quantity) }}</span>
            </div>
          </div>
          <div class="summary-rows">
            <div class="summary-row">
              <span>المجموع الفرعي</span>
              <span>{{ formatCurrency(cartStore.totalPrice) }}</span>
            </div>
            <div class="summary-row">
              <span>التوصيل</span>
              <span class="free">مجاني</span>
            </div>
            <div class="summary-row total">
              <span>الإجمالي</span>
              <span class="total-price">{{ formatCurrency(cartStore.totalPrice) }}</span>
            </div>
          </div>
          <button class="btn btn-primary btn-full btn-lg" @click="placeOrder">
            تأكيد الطلب
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import { useOrderStore } from '../stores/orderStore'
import { useCurrency } from '../composables/useCurrency'
import InstallmentCalc from '../components/payment/InstallmentCalc.vue'

const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()
const { formatCurrency } = useCurrency()

const form = reactive({
  name: '',
  phone: '',
  city: '',
  address: '',
  paymentMethod: 'cash'
})

function placeOrder() {
  if (!form.name || !form.phone || !form.city || !form.address) {
    alert('يرجى ملء جميع الحقول المطلوبة')
    return
  }

  const order = orderStore.createOrder({
    ...form,
    items: cartStore.items,
    total: cartStore.totalPrice
  })

  cartStore.clearCart()
  router.push(`/orders/${order.id}`)
}
</script>

<style scoped>
.checkout-page {
  padding: 20px 0;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 24px;
}

.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 24px;
  align-items: start;
}

.section-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 24px;
  margin-bottom: 20px;
}

.section-card h2 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.payment-option {
  cursor: pointer;
}

.option-content {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  background: var(--bg-input);
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.payment-option.active .option-content {
  border-color: var(--color-gold);
  background: rgba(212, 168, 67, 0.08);
}

.option-icon {
  font-size: 1.5rem;
}

.option-title {
  display: block;
  font-weight: 700;
  color: var(--text-primary);
  font-size: 0.9rem;
}

.option-desc {
  display: block;
  color: var(--text-muted);
  font-size: 0.8rem;
}

.order-summary-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 24px;
  position: sticky;
  top: calc(var(--header-height) + 20px);
}

.order-summary-card h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.order-items {
  margin-bottom: 16px;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--border-light);
}

.order-item img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: var(--radius-md);
  background: var(--bg-input);
}

.item-info {
  flex: 1;
}

.item-name {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
}

.item-qty {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.item-price {
  font-weight: 700;
  color: var(--color-gold);
  font-size: 0.9rem;
}

.summary-rows {
  margin-bottom: 16px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.summary-row .free {
  color: #22c55e;
}

.summary-row.total {
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
  .checkout-layout {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .order-summary-card {
    position: static;
  }
}
</style>
