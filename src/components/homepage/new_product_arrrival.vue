<template>
  <div>
    <div>
      <!-- title -->
      <DashTitleSlot class="mt-[2.5rem]">
        <div>
          <Title :text="`New Arrivals`" />
        </div>
        <div>
          <img src="@/assets/icon/new-star.svg" class="w-[30px]" alt="" />
        </div>
      </DashTitleSlot>
      <!-- product card -->
      <ProductGrid v-if="products.splice">
        <!-- <div > -->
        <div v-for="(product, index) in products.splice(0, 10)" :key="index">
          <ProductCard :Data="product" class="w-full" />
        </div>
        <!-- </div> -->
      </ProductGrid>
    </div>
  </div>
</template>

<script setup>
import DashTitleSlot from '@/components/slots/DashboardTitle.vue'
import Star from '@/assets/svg/star.vue'
import Title from '@/components/Dashboard/DashboardTitles.vue'
import Heart from '@/assets/svg/heart.vue'
import AddToCart from '@/assets/svg/add_to_cart.vue'
import Button_pop_up from '../slots/button_pop_up.vue'
import ProductGrid from '../slots/productCard.vue'
import ProductCard from '../Products/product_card.vue'
import { useProduct } from '@/stores/product'
import { onMounted, ref, reactive } from 'vue'

const store = useProduct()
const products = ref({})
const baseURL = ref('http://localhost:8000')

const GetNewlyArrivedProducts = () => {
  store.GetNewArrivals().then((response) => {
    console.log(response)
    const data = response.data
    products.value = data
  })
}

onMounted(() => {
  GetNewlyArrivedProducts()
})
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
