<template>
  <div class="container font mx-auto p-2">
    <!-- <div class="pt-2">
      <Back />
    </div> -->
    <div
      class="grid grid-cols-12 max-[768px]:gap-0 max-[768px]:grid-cols-1 max-[1024px]:gap-2 pt-[2rem] min-[1024px]:gap-6"
    >
      <!-- product in cart -->
      <div class="lg:col-span-8 max-[1024px]:col-span-7 relative">
        <div>
          <CheckoutMethods @pay_with_PayStack="SelectedMethod" />
        </div>
      </div>

      <!-- order summary -->
      <div class="lg:col-span-4 max-[1024px]:col-span-5 mt-[0.8rem]">
        <CartSummary :SelectedPaymentOption="selectedPaymentValue" />
      </div>
    </div>
  </div>
</template>
<script setup>
import Back from '@/components/extras/goBack.vue'
import ProdButton from '../../components/slots/productButtons.vue'
// import { useCartStore } from '@/stores/cart'
import IconHover from '@/components/slots/iconHover.vue'
import Trash from '@/assets/svg/trash.vue'
import { useCartStore } from '@/stores/cart'
import CheckoutMethods from '@/components/Order_Process/CheckoutMethods.vue'
import CartSummary from '@/components/Order_Process/CartSummary.vue'
import { ref } from 'vue'

const InCartStore = useCartStore()
const productInCart = InCartStore.cartItems

const selectedPaymentValue = ref('')

const SelectedMethod = (value) => {
  selectedPaymentValue.value = value
}
</script>
<style scoped></style>
