<template>
  <div>
    <!-- title -->
    <DashTitleSlot class="mt-[2.5rem]">
      <div>
        <Title :text="`Similar products`" />
      </div>
      <div>
        <img src="@/assets/icon/similar-svgrepo-com.svg" class="w-[30px]" alt="" />
      </div>
    </DashTitleSlot>

    <!-- product card -->
    <ProductGrid>
      <div v-for="(product, index) in Data" :key="index">
        <ProductCard :Data="product" class="w-full" />
      </div>
    </ProductGrid>
  </div>
</template>

<script setup>
import DashTitleSlot from '@/components/slots/DashboardTitle.vue'
import Star from '@/assets/svg/star.vue'
import Title from '@/components/Dashboard/DashboardTitles.vue'
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
