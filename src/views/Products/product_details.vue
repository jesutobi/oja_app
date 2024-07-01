<template>
  <div class="container mx-auto">
    <div>
      <ProductDetail />
      <SimilarProducts :id="8" />
      {{ Category.id }}
    </div>
  </div>
</template>

<script setup>
import ProductDetail from '@/components/Products/Product_details.vue'
import SimilarProducts from '@/components/Products/SimilarProducts.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProduct } from '@/stores/product'

const store = useProduct()
const route = useRoute()
const Category = ref({})
const CategoryId = ref(Category.value.id)

// const getId = () => {
//   localStorage.setItem('product_id', route.params.id)
// }

const getProductDetail = () => {
  store.GetProductDetail(route.params.id).then((response) => {
    const data = response.data

    Category.value = JSON.parse(data.product_category)
    console.log('cat', Category.value)
  })
}

onMounted(() => {
  // getId()
  getProductDetail()
})
</script>

<style scoped></style>
