<template>
  <div>
    <div class="shadow text-xs p-2 sm:text-[0.85rem] font bg-white sm:rounded-xl">
      <!-- title -->
      <div class="flex items-center justify-between">
        <div class="text-xs sm:text-[0.9rem] py-3 font2">
          <span>Bag Summary</span>
        </div>
        <div>
          <img src="@/assets/icon/bag.svg" class="w-[20px]" alt="" />
        </div>
      </div>
      <div class="bg-slate-200/25 shadow p-2 rounded-lg">
        <div class="py-2 font2">
          <span>Price Details ({{ productInCart.length }} item)</span>
        </div>
        <!-- summary -->
        <div v-for="(item, index) in productInCart" :key="index" class="flex py-2 justify-between">
          <div class="text-gray-500">
            <span
              >{{ getQuantity(item.id) }} x
              {{
                item.product_title
                  .toString()
                  .replace(/(<([^>]+)>)/gi, '')
                  .substring(0, 20)
              }}...</span
            >
          </div>
          <div class="productFont">
            <span>&#8358;{{ formatPrice(InCartStore.calculateTotalPrice(item)) }}</span>
          </div>
        </div>
        <div class="flex py-2 justify-between">
          <div class="text-gray-500">
            <span>Delivery Charges</span>
          </div>
          <div class="productFont text-green-600">
            <span>&#8358; free delivery</span>
          </div>
        </div>
        <hr class="mb-2 mt-3" />
        <div class="flex py-2 justify-between">
          <div class="text-gray-500">
            <span>Total Amount</span>
          </div>
          <div class="productFont text-green-600">
            <span>&#8358; {{ formatPrice(TotalAmount) }}</span>
          </div>
        </div>
      </div>
      <div v-if="isLoggedIn">
        <div v-if="$route.name === 'shopping_cart'">
          <router-link to="checkout">
            <ProdButton :Width="`w-full`" class="mt-2">
              <div class="flex items-center justify-center">
                <div class="px-2 text-xs sm:text-[0.9rem] font2">
                  <span> Proceed to Checkout</span>
                </div>
                <div>
                  <img src="@/assets/icon/truck-long-svgrepo-com.svg" class="w-[30px]" alt="" />
                </div>
              </div>
            </ProdButton>
          </router-link>
        </div>
        <div v-if="$route.name === 'checkout'">
          <ProdButton @click="initializePayment" :Width="`w-full`" class="mt-2">
            <div class="flex items-center justify-center">
              <div class="px-2 text-xs sm:text-[0.9rem] font2">
                <span> Proceed to Payment</span>
              </div>
              <div>
                <img src="@/assets/icon/cash-dollar-flow-svgrepo-com.svg" class="w-[30px]" alt="" />
              </div>
            </div>
          </ProdButton>

          <LittleInfo
            class="pt-2 text-black"
            :text="`You would be redirected to a payment gateway `"
          />
        </div>
      </div>

      <div v-else>
        <router-link to="/Auth/Login">
          <ProdButton :Width="`w-full`" class="mt-2">
            <div class="flex items-center justify-center">
              <div class="px-1 text-xs sm:text-[0.9rem] font2">
                <span> Sign in to Checkout</span>
              </div>
              <div>
                <img src="@/assets/icon/lock-svgrepo-com.svg" alt="" />
              </div>
            </div>
          </ProdButton>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import LittleInfo from '@/components/extras/littleInfo.vue'
import ProdButton from '../slots/productButtons.vue'
import IconHover from '@/components/slots/iconHover.vue'
import { useCartStore } from '@/stores/cart'
import { computed, onMounted, ref } from 'vue'
import { useFormatPrice } from '../../composables/formatPrice'
import { useQuantityPerProduct } from '../../composables/quantityPerProduct'
import { useIsLoggedIn } from '@/composables/isAuhenticated'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/Authentication'

const props = defineProps({
  SelectedPaymentOption: String
})

const store = useUserStore()
const user = store.user.userInfo
const userEmail = store.user.userInfo.email
const PUBLIC_KEY = 'pk_test_3267ad833473ba445a15e20bd2c4382746945327'
const route = useRoute()
const isLoggedIn = useIsLoggedIn()
const { getQuantity } = useQuantityPerProduct()
const { formatPrice } = useFormatPrice()
const InCartStore = useCartStore()
const TotalAmount = ref(InCartStore.totalAmount)
const productInCart = ref(InCartStore.cartItems)
const transactionReference = ref('')

const initializePayment = () => {
  if (props.SelectedPaymentOption === 'PayStack') {
    generateTransactionReference()
    const handler = PaystackPop.setup({
      key: 'pk_test_3267ad833473ba445a15e20bd2c4382746945327',
      email: userEmail,
      amount: TotalAmount.value * 100,
      currency: 'NGN',
      ref: transactionReference.value,
      callback: (response) => {
        console.log(response)
        // var reference = response.reference
        processPayment()
      },
      onClose: function () {
        close()
      }
    })
    handler.openIframe()
  } else {
    setTimeout(() => {
      const id = ' Select your payment option'
      toast(id, {
        theme: 'dark',
        type: 'warning',
        autoClose: 2000,
        transition: 'slide',
        dangerouslyHTMLString: true
      })
    })
  }
}

const generateReference = (prefix) => {
  const length = 10
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = prefix

  for (let i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

const generateTransactionReference = () => {
  transactionReference.value = generateReference('Oja_')
}

const processPayment = () => {
  setTimeout(() => {
    const id = 'Successful Payment'
    toast(id, {
      theme: 'colored',
      type: 'success',
      autoClose: 2000,
      transition: 'slide',
      dangerouslyHTMLString: true
    })
  })
}
const close = () => {
  setTimeout(() => {
    const id = ' You closed the payment gateway'
    toast(id, {
      theme: 'dark',
      type: 'info',
      autoClose: 2000,
      transition: 'slide',
      dangerouslyHTMLString: true
    })
  })
}

onMounted(() => {
  const script = document.createElement('script')
  script.setAttribute('src', 'https://js.paystack.co/v1/inline.js')
  document.body.appendChild(script)
})
</script>

<style scoped></style>
