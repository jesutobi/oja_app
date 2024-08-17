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
      <div v-for="(product, index) in simlarProducts.data" :key="index">
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
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

const store = useSimilarProducts()
const { simlarProducts } = storeToRefs(store)
const Data = ref([])
const route = useRoute()
const id = ref(route.params.id)

const getSimilarProduct = (id) => {
  store.GetSimilarProducts(id)
}

watch(
  () => route.params.id,
  (newId) => {
    getSimilarProduct(newId)
  }
)

onMounted(() => {
  getSimilarProduct(route.params.id)
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
