<template>
  <div>
    <!-- title -->
    <div class="text-center my-[3rem] text-[1.6rem]">
      <span class="featured-products font2">Similar Products</span>
    </div>

    <!-- product card -->
    <ProductGrid>
      <div v-for="(product, index) in Data" :key="index">
        <ProductCard :Data="product" class="w-full" />
      </div>
    </ProductGrid>
  </div>
</template>

<script setup>
import ProductGrid from '../slots/productCard.vue'
import ProductCard from './product_card.vue'
import { useSimilarProducts } from '@/stores/similar_products'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const store = useSimilarProducts()
const Data = store.GetSimilarProducts
const route = useRoute()

const props = defineProps({
  id: Number
})

const getSimilarProduct = async () => {
  const id = JSON.stringify(props.id)
  console.log(props.id)
  try {
    const response = await store.GetSimilarProducts(props.id)
    // product_review.value = response.data.reviews
    // console.log(product_review.value)
  } catch (error) {
    console.error('Failed to fetch similar product:', error)
  }
}

onMounted(() => {
  getSimilarProduct()
})
// const similarProducts
</script>

<style scoped></style>
