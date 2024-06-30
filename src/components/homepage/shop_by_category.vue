<template>
  <div>
    <!-- title -->
    <div class="text-center my-[3rem] text-[1.6rem]">
      <span class="featured-products font2">Shop by Category</span>
    </div>
    <!-- product card -->

    <Carousel :settings="settings" :breakpoints="breakpoints" :wrap-around="true">
      <Slide v-for="(data, index) in product_category" :key="index" class="py-[2rem]">
        <div class="hover:shadow-lg hover:rounded-[0.2rem] p-2 relative group cursor-pointer">
          <!-- image -->
          <div>
            <img
              :src="`${baseURL}/storage/${data.card_image}`"
              class="w-full object-cover rounded"
              style="height: 230px; width: 300px"
              alt=""
            />
          </div>

          <div class="text-center py-2 text-yellow-600 font2 text-sm">
            <span>{{ data.category_title }}</span>
          </div>
        </div>
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>
<script setup>
import { Carousel, Navigation, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'
import ProductCard from '../slots/productCard.vue'
import { useProductCategory } from '@/stores/product_category'
import { onMounted, ref, reactive } from 'vue'

const store = useProductCategory()
const product_category = ref([])
const baseURL = ref('http://localhost:8000')

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

const GetProductCategory = () => {
  store.getProductCategory().then((response) => {
    product_category.value = response.data.categories
    console.log(response)
  })
}

onMounted(() => {
  GetProductCategory()
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
