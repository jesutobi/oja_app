<template>
  <div>
    <!-- title -->
    <div class="text-center my-[3rem] md:text-[1.6rem] text-[1.2rem]">
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
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const store = useSimilarProducts()
const Data = ref([])
const route = useRoute()

const getSimilarProduct = async () => {
  try {
    const response = await store.GetSimilarProducts(route.params.id)
    Data.value = response.data
  } catch (error) {
    console.error('Failed to fetch similar product:', error)
  }
}

onMounted(() => {
  getSimilarProduct()
})
// const similarProducts
</script>

<style scoped>
.featured-products {
  text-align: center;
  position: relative;
  display: inline-block;
}

.featured-products:after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: #c0392b; /* color of the underline */
  margin: 2px auto 0;
  border-radius: 3px;
}
</style>
