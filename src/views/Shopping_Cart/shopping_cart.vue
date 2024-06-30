<template>
  <div class="container font mx-auto">
    <div
      class="grid grid-cols-12 max-[768px]:gap-0 max-[768px]:grid-cols-1 max-[1024px]:gap-2 pt-[2rem] min-[1024px]:gap-4"
    >
      <!-- product in cart -->
      <div class="lg:col-span-8 max-[1024px]:col-span-8 relative">
        <!-- title -->
        <div class="flex justify-between mb-[4rem] items-center">
          <div>
            <div class="sm:text-[1.5rem] text-[1rem] font-semibold">
              <span>Shopping Bag</span>
            </div>
            <div class="sm:text-sm txt-xs font-black">
              <span class="font2 px-1">{{ productInCart.length }} </span>
              <span>items in your bag</span>
            </div>
          </div>
          <!-- remove product from cart -->
          <div class="mb-4 flex justify-end">
            <IconHover>
              <Button class="bg-yellow-400 rounded-lg p-2">
                <div class="flex items-center p-0">
                  <div>
                    <Trash :color="`#facc15`" />
                  </div>
                  <div class="px-2 text-xs font2">
                    <span> Clear bag</span>
                  </div>
                </div>
              </Button>
            </IconHover>
          </div>
        </div>
        <div>
          <ProductInCart />
        </div>
      </div>

      <!-- order summary -->
      <div class="lg:col-span-4 max-[1024px]:col-span-4 max-[768px]:hidden">
        <div class="shadow-md rounded-[1.5rem] py-2">
          <CartSummary />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// import { useCartStore } from '@/stores/cart'
import IconHover from '@/components/slots/iconHover.vue'
import Trash from '@/assets/svg/trash.vue'
import { useCartStore } from '@/stores/cart'
import ProductInCart from '@/components/Products/ProductInCart.vue'
import CartSummary from '@/components/Products/CartSummary.vue'

const InCartStore = useCartStore()
const productInCart = InCartStore.cartItems
</script>
<style scoped></style>
