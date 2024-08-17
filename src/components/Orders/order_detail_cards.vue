<template>
  <div>
    <div class="grid grid-cols-12 max-[1024px]:grid-cols-1 lg:gap-2 my-2">
      <!-- product items -->
      <DashboardCard class="col-span-7 lg:my-0 my-2">
        <DashboardCardHeader class="p-2">
          <div class="flex items-center justify-between">
            <div class="font2 text-sm">
              <span>Ordered product</span>
            </div>
            <div>
              <img src="@/assets/icon/bag.svg" style="width: 23px" />
            </div>
          </div>
        </DashboardCardHeader>
        <div
          v-for="(data, index) in singleOrderDetail.order_items"
          :key="index"
          class="flex p-2 border-b"
        >
          <!-- image -->
          <div class="">
            <img
              loading="lazy"
              @load="onImageLoad"
              :src="`${baseURL}/storage/${data.product.images[0].image_path}`"
              class="object-cover rounded-lg h-[75px] w-[75px]"
              :class="{
                'skeleton-loader animate-skeleton bg-slate-400/10': isLoaded
              }"
              alt=""
            />
          </div>
          <!-- details -->
          <div class="px-2">
            <!-- product title -->
            <div class="productFont text-xs sm:text-sm">
              <span
                >{{
                  data.product.product_title
                    .toString()
                    .replace(/(<([^>]+)>)/gi, '')
                    .substring(0, 42)
                }}
              </span>
            </div>
            <!-- product brand -->
            <div class="font2 py-1 text-yellow-600 text-xs">
              <span>{{ data.product.product_brand }} </span>
            </div>

            <!-- product features -->
            <div class="py-1 text-xs">
              <span>Quantity</span>
              <span class="font-black"> : {{ data.product_quantity }}</span>
            </div>
          </div>
        </div>
      </DashboardCard>
      <!-- order address -->
      <div class="col-span-5 lg:my-0 my-2">
        <!-- shipping address -->
        <DashboardCard>
          <DashboardCardHeader class="p-2">
            <div class="flex items-center justify-between">
              <div class="font2 text-sm">
                <span>shipping Address</span>
              </div>
              <div>
                <img src="../../../public/icon/address-book.svg" style="width: 23px" />
              </div>
            </div>
          </DashboardCardHeader>
          <div v-if="singleOrderDetail.order_address" class="text-[0.82rem] px-2">
            <div class="flex items-center py-2">
              <div>
                <span>Recipient : </span>
              </div>
              <div class="px-1 text-gray-500">
                <span>{{
                  singleOrderDetail.order_address.first_name +
                  ' ' +
                  singleOrderDetail.order_address.last_name
                }}</span>
              </div>
            </div>

            <div class="flex items-center py-2">
              <div>
                <span> Phone number : </span>
              </div>
              <div class="px-1 text-gray-500">
                <span>{{ singleOrderDetail.order_address.phone_number }}</span>
              </div>
            </div>
            <div class="flex items-center py-2">
              <div>
                <span> State : </span>
              </div>
              <div class="px-1 text-gray-500">
                <span>{{ JSON.parse(singleOrderDetail.order_address.state).state }}</span>
              </div>
            </div>
            <div class="flex items-center py-2">
              <div>
                <span> Lga : </span>
              </div>
              <div class="px-1 text-gray-500">
                <span>{{ JSON.parse(singleOrderDetail.order_address.city) }}</span>
              </div>
            </div>
            <div class="py-2">
              <div class="">
                <span>Delivery address :</span
                ><span class="px-1 text-gray-500">
                  {{ singleOrderDetail.order_address.delivery_address }}</span
                >
              </div>
            </div>
          </div>
          <!-- <router-link to="address-book">
            <div class="text-xs justify-end p-2 flex items-center cursor-pointer">
              <div class="px-2 cursor-pointer" title="set address">
                <Set />
              </div>
              <div class="">
                <span>Change address</span>
              </div>
            </div></router-link
          > -->
        </DashboardCard>

        <!-- payment details -->
        <DashboardCard class="mt-2">
          <DashboardCardHeader class="p-2">
            <div class="flex items-center justify-between">
              <div class="font2 text-sm">
                <span>Payment details</span>
              </div>
              <div>
                <img src="@/assets/icon/cash-dollar-flow-svgrepo-com.svg" class="w-[25px]" alt="" />
              </div>
            </div>
          </DashboardCardHeader>
          <div class="text-[0.82rem] px-2">
            <!-- Payment Method -->
            <div class="flex items-center py-1">
              <div>
                <span>Payment Method : </span>
              </div>
              <div class="px-1 text-gray-500">
                <span>{{ singleOrderDetail.payment_method }}</span>
              </div>
            </div>
            <!-- Payment Status -->
            <div class="flex items-center py-2">
              <div>
                <span>Payment Status : </span>
              </div>
              <div class="px-2">
                <span
                  :class="{
                    redBadge: singleOrderDetail.payment_status === 'unpaid',
                    greenBadge: singleOrderDetail.payment_status === 'paid'
                  }"
                  class="p-1 text-[0.7rem] rounded-lg"
                  >{{ singleOrderDetail.payment_status }}</span
                >
              </div>
            </div>
            <!-- order Status -->
            <div class="flex items-center py-2">
              <div>
                <span>Order Status : </span>
              </div>
              <div class="px-2">
                <span
                  :class="{
                    yellowBadge: singleOrderDetail.order_status === 'pending',
                    greenBadge: singleOrderDetail.order_status === 'delivered'
                  }"
                  class="p-1 text-[0.7rem] rounded-lg"
                  >{{ singleOrderDetail.order_status }}</span
                >
              </div>
            </div>
            <!-- Payment code -->
            <div v-if="singleOrderDetail.payment_status === 'paid'" class="flex items-center py-2">
              <div>
                <span>Payment Code : </span>
              </div>
              <div class="px-1 text-gray-500">
                <span></span>
              </div>
            </div>
            <!-- Order Code -->
            <div class="flex items-center py-2">
              <div>
                <span>Order Code : </span>
              </div>
              <div class="px-1 text-gray-500">
                <span>{{ singleOrderDetail.order_code }}</span>
              </div>
            </div>
            <!-- Total Item -->
            <div
              :class="{ 'border-b': singleOrderDetail.payment_status === 'paid' }"
              class="flex items-center py-2"
            >
              <div>
                <span>Total Item : </span>
              </div>
              <div class="px-1 text-gray-500">
                <span>{{ singleOrderDetail.total_item }}</span>
              </div>
            </div>
            <!-- Total Amount -->
            <div class="flex items-center py-2">
              <div>
                <span>Total Amount : </span>
              </div>
              <div class="px-1 text-green-600">
                <span class="productFont"
                  >&#8358;{{ formatPrice(singleOrderDetail.total_amount) }}</span
                >
              </div>
            </div>
            <ProdButton
              v-if="singleOrderDetail.payment_status === 'unpaid'"
              @click="initializePayment"
              :Width="`w-full`"
              class="py-2"
            >
              <div class="flex items-center justify-center">
                <div class="px-2 text-xs sm:text-[0.9rem] font2">
                  <span> Continue Payment</span>
                </div>
                <div>
                  <img
                    src="@/assets/icon/cash-dollar-flow-svgrepo-com.svg"
                    class="w-[30px]"
                    alt=""
                  />
                </div>
              </div>
            </ProdButton>
          </div>
        </DashboardCard>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useUserStore } from '@/stores/Authentication'
import Set from '@/assets/svg/set.vue'
import ProdButton from '../slots/productButtons.vue'
import DashboardCard from '@/components/slots/DashboardCard.vue'
import DashboardCardHeader from '@/components/slots/DashboardCardHeader.vue'
import { useOrdersStore } from '@/stores/orders'
import { useFormatPrice } from '../../composables/formatPrice'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { usePaymentStore } from '@/stores/payment_details.js'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const paymentstore = usePaymentStore()
const baseURL = ref('https://api.ojastore.com.ng')
// const { formatDate, formatTime } = useFormatDate()
const { formatPrice } = useFormatPrice()
const orderStore = useOrdersStore()
const { singleOrderDetail } = storeToRefs(orderStore)
const store = useUserStore()
const { userInfo } = storeToRefs(store)
const transactionReference = ref('')
const order_id = singleOrderDetail.value.id

const isLoaded = ref(false)

const initializePayment = () => {
  generateTransactionReference()
  const handler = PaystackPop.setup({
    key: 'pk_test_3267ad833473ba445a15e20bd2c4382746945327',
    email: userInfo.value.email,
    amount: singleOrderDetail.value.total_amount * 100,
    currency: 'NGN',
    ref: transactionReference.value,

    callback: (response) => {
      const payload = {
        payment_status: response.status,
        transaction_code: response.trans,
        reference_code: response.trxref,
        order_details_id: order_id
      }
      paymentstore.PaymentDetails(payload)
      processPayment()
    },

    onClose: function () {
      close()
    }
  })
  handler.openIframe()
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
  const id = 'Payment Successful'
  toast(id, {
    theme: 'colored',
    type: 'success',
    autoClose: 2000,
    transition: 'slide',
    dangerouslyHTMLString: true
  })
}

const onImageLoad = () => {
  isLoaded.value = true
}

onMounted(() => {
  // (singleOrderDetail)
  onImageLoad()
  const script = document.createElement('script')
  script.setAttribute('src', 'https://js.paystack.co/v1/inline.js')
  document.body.appendChild(script)
})
</script>
<style></style>
