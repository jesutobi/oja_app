<template>
  <div>
    <div class="font2 py-3">
      <span>Product Description</span>
    </div>
    <div>
      <p
        v-html="productDetail.product_description"
        class="whitespace-pre-wrap text-[0.8rem] leading-relaxed"
      ></p>
    </div>
  </div>
</template>
<script setup>
import { useProduct } from '@/stores/product'
import { storeToRefs } from 'pinia'

const store = useProduct()
const { productDetail } = storeToRefs(store)
</script>
<style scoped></style>
