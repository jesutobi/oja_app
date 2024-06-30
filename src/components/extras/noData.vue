<template>
  <div>
    <div class="flex items-center justify-center h-[50vh]">
      <div>
        <div v-if="$route.path === '/Product/shopping_cart'" class="my-1 flex justify-center">
          <img src="@/assets/icon/bag.svg" alt="" />
        </div>
        <!-- icon -->
        <div v-else class="my-1 flex justify-center">
          <img src="@/assets/icon/grey-clipboard.svg" style="width: 120px" alt="" />
        </div>

        <div class="text-[0.8rem] text-center w-72 mt-[2rem]">
          <span>{{ text }}</span>
        </div>
        <div
          class="text-[0.8rem] py-2 font2 text-center w-72"
          v-if="$route.path === '/Product/shopping_cart'"
        >
          <span>Add product to cart</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Bag from '@/components/navigation/cart.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
// Define the props you expect to receive
const props = defineProps({
  text: String
})

const text = props.text
</script>

<style scoped></style>
