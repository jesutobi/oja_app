<template>
  <div>
    <div class="shadow text-xs p-2 sm:text-[0.85rem] mt-[7.5rem] font bg-white sm:rounded-lg">
      <!-- title -->
      <div class="flex items-center justify-between">
        <div class="text-xs sm:text-[0.9rem] py-3 font2">
          <span>Bag Summary</span>
        </div>
        <div>
          <img src="@/assets/icon/bag.svg" class="w-[20px]" alt="" />
        </div>
      </div>
      <div class="bg-yellow-200/25 p-2 rounded-lg">
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
            <span>&#8358; {{ InCartStore.totalAmount }}</span>
          </div>
        </div>
      </div>

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
    </div>
  </div>
</template>

<script setup>
import ProdButton from '../slots/productButtons.vue'
import IconHover from '@/components/slots/iconHover.vue'
import { useCartStore } from '@/stores/cart'
import { ref } from 'vue'
import { useFormatPrice } from '../../composables/formatPrice'
import { useQuantityPerProduct } from '../../composables/quantityPerProduct'

const { getQuantity } = useQuantityPerProduct()

const { formatPrice } = useFormatPrice()
const InCartStore = useCartStore()
const productInCart = ref(InCartStore.cartItems)
// const calculateTotalPrice = (item) => {
//   return item.product_price * item.quantity
// }
</script>

<style scoped></style>
