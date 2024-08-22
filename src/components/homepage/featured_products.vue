<template>
  <div>
    <div>
      <!-- title -->
      <DashTitleSlot class="mt-[3rem]">
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
        <Slide v-for="(product, index) in FeaturedProduct?.data" :key="index" class="py-[1rem]">
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
import { storeToRefs } from 'pinia'

const store = useProduct()
const { FeaturedProduct } = storeToRefs(store)
const products = ref({})

const starFive = ref(5)

const settings = reactive({
  itemsToShow: 1,
  snapAlign: 'center'
})

const breakpoints = reactive({
  300: {
    itemsToShow: 2,
    snapAlign: 'start'
  },
  450: {
    itemsToShow: 2.6,
    snapAlign: 'start'
  },
  568: {
    itemsToShow: 3,
    snapAlign: 'start'
  },
  767: {
    itemsToShow: 3.5,
    snapAlign: 'start'
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
  store.GetFeaturedProducts()
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
