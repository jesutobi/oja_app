<template>
  <div class="container mx-auto">
    <div>
      <ProductDetail />
    </div>
  </div>
</template>

<script setup>
import ProductDetail from '@/components/Products/Product_details.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = ref(0)

const getId = () => {
  localStorage.setItem('product_id', route.params.id)
}

onMounted(() => {
  getId()
})
</script>

<style scoped></style>
