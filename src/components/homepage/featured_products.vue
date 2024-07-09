<template>
  <div>
    <div>
      <!-- title -->
      <DashTitleSlot class="mt-[5.5rem]">
        <div>
          <Title :text="`Featured Products`" />
        </div>
        <div class="w-[80px] flex">
          <div class="" v-for="(star, index) in starFive" :key="index">
            <Star :color="`#FFBF00`" />
          </div>
        </div>
      </DashTitleSlot>

      <!-- product card -->

      <Carousel :settings="settings" :breakpoints="breakpoints">
        <Slide v-for="(product, index) in products" :key="index" class="py-[1.5rem]">
          <ProductCard :Data="product" class="w-full" />
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup>
import Star from '@/assets/svg/star.vue'
import Title from '@/components/Dashboard/DashboardTitles.vue'
import DashTitleSlot from '@/components/slots/DashboardTitle.vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

import Heart from '@/assets/svg/heart.vue'
import AddToCart from '@/assets/svg/add_to_cart.vue'
import Button_pop_up from '../slots/button_pop_up.vue'
// import ProductCard from '../slots/productCard.vue'
import ProductCard from '../Products/product_card.vue'
import { useProduct } from '@/stores/product'
import { onMounted, ref, reactive } from 'vue'

const store = useProduct()
const products = ref({})
const baseURL = ref('http://localhost:8000')
const starFive = ref(5)

const settings = reactive({
  itemsToShow: 1,
  snapAlign: 'center'
})

const breakpoints = reactive({
  300: {
    itemsToShow: 1.5,
    snapAlign: 'center'
  },
  400: {
    itemsToShow: 2,
    snapAlign: 'center'
  },
  568: {
    itemsToShow: 2.6,
    snapAlign: 'center'
  },
  767: {
    itemsToShow: 3.5,
    snapAlign: 'center'
  },
  992: {
    itemsToShow: 4,
    snapAlign: 'start'
  },
  1024: {
    itemsToShow: 4.5,
    snapAlign: 'start'
  },
  1200: {
    itemsToShow: 5.2,
    snapAlign: 'start'
  }
})

const GetFeaturedProducts = () => {
  store.GetFeaturedProducts().then((response) => {
    const data = response.data
    products.value = data
  })
}

onMounted(() => {
  GetFeaturedProducts()
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
