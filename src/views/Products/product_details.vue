<template>
  <div class="container mx-auto">
    <div>
      <ProductDetail />
      <SimilarProducts />
    </div>
  </div>
</template>

<script setup>
import ProductDetail from '@/components/Products/Product_details.vue'
import SimilarProducts from '@/components/Products/SimilarProducts.vue'
import { onMounted, ref, watch } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { useProduct } from '@/stores/product'

const store = useProduct()
const route = useRoute()
// const Category = ref({})
// const CategoryId = ref(Category.value.id)

// const getId = () => {
//   localStorage.setItem('product_id', route.params.id)
// }

const getProductDetail = (id) => {
  store.GetProductDetail(id).then((response) => {
    const data = response.data

    // Category.value = JSON.parse(data.product_category)
    // ('cat', Category.value)
  })
}

watch(
  () => route.params.id,
  (newId) => {
    getProductDetail(newId)
  }
)

onMounted(() => {
  // getId()
  getProductDetail(route.params.id)
})
</script>

<style scoped></style>
