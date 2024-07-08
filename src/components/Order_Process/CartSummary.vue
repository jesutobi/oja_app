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
          <span>Price Details ({{ cartItems.length }} item)</span>
        </div>
        <!-- summary -->
        <div v-for="(item, index) in cartItems" :key="index" class="flex py-2 justify-between">
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
            <span>&#8358; {{ formatPrice(totalAmount) }}</span>
          </div>
        </div>
      </div>
      <div v-if="isLoggedIn">
        <div v-if="$route.name === 'shopping_cart'">
          <!-- <router-link to="checkout"> -->
          <ProdButton @click="CheckOut" :Width="`w-full`" class="mt-2">
            <div class="flex items-center justify-center">
              <div class="px-2 text-xs sm:text-[0.9rem] font2">
                <span> Proceed to Checkout</span>
              </div>
              <div>
                <img src="@/assets/icon/truck-long-svgrepo-com.svg" class="w-[30px]" alt="" />
              </div>
            </div>
          </ProdButton>
          <!-- </router-link> -->
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
import { useOrdersStore } from '@/stores/orders'
import axios from 'axios'
import { storeToRefs } from 'pinia'

const router = useRouter()
const store = useUserStore()
const orderStore = useOrdersStore()
const { selected_shipping_id, selected_payment_method } = storeToRefs(orderStore)
const userEmail = store.user.userInfo.email
const isLoggedIn = useIsLoggedIn()
const { getQuantity } = useQuantityPerProduct()
const { formatPrice } = useFormatPrice()
const InCartStore = useCartStore()
const { cartItems, totalAmount } = storeToRefs(InCartStore)
const transactionReference = ref('')
const ipDetails = ref({})
const orderCode = ref('')

const orderDetails = ref({
  user_id: store.user.userInfo.id,
  shipping_address_id: selected_shipping_id.value,
  total_amount: totalAmount.value,
  total_item: cartItems.value.length,
  payment_status: 'unpaid',
  ip_address: JSON.stringify(ipDetails),
  payment_method: selected_payment_method.value,
  order_items: cartItems.value,
  order_code: orderCode
})

const PlaceOrder = () => {
  orderStore
    .PlaceOrder(orderDetails.value)
    .then((msg) => {
      successMsg.value = msg
      setTimeout(() => {
        toast.update(id, {
          render: successMsg,
          theme: 'colored',
          type: 'success',
          autoClose: 1000,
          transition: 'slide',
          dangerouslyHTMLString: true
        })
        setTimeout(() => {
          // done
          toast.done(
            router.push({
              name: 'home'
            })
          )
        })
      }, 2000)
    })
    .catch((error) => {
      errorsInfo.value = error
      console.log(errorsInfo)
      setTimeout(() => {
        toast.update(id, {
          render: 'The Provided credentials are not correct',
          autoClose: true,
          closeOnClick: true,
          closeButton: true,
          type: 'error',
          isLoading: false
        })
      }, 2000)
      // errorNotify()
    })
}

const initializePayment = () => {
  if (orderDetails.payment_method !== '' && orderDetails.shipping_address_id !== '') {
    generateTransactionReference()
    PlaceOrder()
    const handler = PaystackPop.setup({
      key: 'pk_test_3267ad833473ba445a15e20bd2c4382746945327',
      email: userEmail,
      amount: totalAmount.value * 100,
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
      const id = ' You omitted a required option'
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
  if (prefix === 'Oja_') {
    const length = 10
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = prefix

    for (let i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)]
    }
    return result
  } else {
    const length = 4
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = prefix

    for (let i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)]
    }
    return result
  }
}

const generateTransactionReference = () => {
  transactionReference.value = generateReference('Oja_')
  orderCode.value = generateReference('OJA_')
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
const CheckOut = () => {
  if (cartItems.length === 0) {
    setTimeout(() => {
      const id = ' You need to add product to cart'
      toast(id, {
        theme: 'dark',
        type: 'warning',
        autoClose: 2000,
        transition: 'slide',
        dangerouslyHTMLString: true
      })
    })
  } else {
    router.push({
      name: 'checkout'
    })
  }
}

const getIpData = async () => {
  try {
    const response = await axios.get('https://ipinfo.io/json?token=f49c0e45d47a54')
    ipDetails.value = response.data
  } catch (error) {
    // Handle errors
    console.error('failed:', error)
    throw error
  }
}

onMounted(() => {
  getIpData()
  const script = document.createElement('script')
  script.setAttribute('src', 'https://js.paystack.co/v1/inline.js')
  document.body.appendChild(script)
})
</script>

<style scoped></style>
