<template>
  <div>
    <div
      class="flex items-center rounded p-1 text-center m-1 font text-xs justify-between bg-yellow-400 w-[100px] sm:w-[100px]"
    >
      <!-- decrement -->
      <div @click="decrementQuantity(Data)" class="px-1 cursor-pointer">
        <img src="@/assets/svg/minus-svgrepo-com.svg" class="w-[15px]" alt="" />
      </div>
      <div><span class="font2">|</span></div>
      <!-- data -->
      <div>
        <span class="">{{ getQuantity(Data.id) }}</span>
      </div>
      <div><span class="font2">|</span></div>
      <!-- increment -->
      <div @click="incrementQuantity(Data)" class="px-1 cursor-pointer">
        <img src="@/assets/svg/plus-svgrepo-com.svg" class="w-[18px]" alt="" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { useQuantityPerProduct } from '../../composables/quantityPerProduct'

const props = defineProps({
  Data: {
    type: Object,
    required: true
  }
})

const { getQuantity, incrementQuantity, decrementQuantity, removeProduct } = useQuantityPerProduct()
</script>
<style scoped></style>
