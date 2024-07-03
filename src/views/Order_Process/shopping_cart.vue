<template>
  <div class="container font mx-auto p-2">
    <!-- <div class="pt-2">
      <Back />
    </div> -->
    <div
      class="grid grid-cols-12 max-[768px]:gap-0 max-[1024px]:grid-cols-1 max-[1024px]:gap-0 pt-[2rem] min-[1024px]:gap-6"
    >
      <!-- product in cart -->
      <div class="lg:col-span-8 max-[1024px]:col-span-7 relative">
        <!-- title -->
        <DashTitleSlot class="mb-[2.5rem]">
          <div>
            <div class="sm:text-[1.5rem] text-[1rem] font-semibold">
              <span>Shopping Bag</span>
            </div>
            <div class="sm:text-sm text-xs font-black">
              <span class="font2 px-1">{{ productInCart.length }} </span>
              <span>items in your bag</span>
            </div>
          </div>
          <!-- remove product from cart -->
          <div v-if="productInCart.length >= 1" class="">
            <ProdButton class="">
              <div class="flex items-center p-0">
                <div class="px-2 text-xs font2">
                  <span> Clear bag</span>
                </div>
                <div>
                  <Trash :color="`#facc15`" />
                </div>
              </div>
            </ProdButton>
          </div>
          <div v-if="productInCart.length === 0">
            <ProdButton class="">
              <div class="flex items-center p-0">
                <div class="px-2 text-xs font2">
                  <span> Add to Bag</span>
                </div>
                <div>
                  <img src="@/assets/icon/bag.svg" class="w-[20px]" alt="" />
                </div>
              </div>
            </ProdButton>
          </div>
        </DashTitleSlot>
        <div>
          <ProductInCart />
        </div>
      </div>

      <!-- order summary -->
      <div class="lg:col-span-4 max-[1024px]:col-span-5 mt-2 lg:mt-[7.5rem]">
        <CartSummary />
      </div>
    </div>
  </div>
</template>
<script setup>
import DashTitleSlot from '@/components/slots/DashboardTitle.vue'
import Back from '@/components/extras/goBack.vue'
import ProdButton from '../../components/slots/productButtons.vue'
// import { useCartStore } from '@/stores/cart'
import IconHover from '@/components/slots/iconHover.vue'
import Trash from '@/assets/svg/trash.vue'
import { useCartStore } from '@/stores/cart'
import ProductInCart from '@/components/Order_Process/ProductInCart.vue'
import CartSummary from '@/components/Order_Process/CartSummary.vue'

const InCartStore = useCartStore()
const productInCart = InCartStore.cartItems
</script>
<style scoped></style>
