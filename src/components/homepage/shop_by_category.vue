<template>
  <div>
    <!-- title -->
    <!-- title -->
    <DashTitleSlot class="mt-[2.5rem]">
      <div>
        <Title :text="`Shop by Category`" />
      </div>
      <div>
        <img src="@/assets/icon/category-svgrepo-com.svg" class="w-[28px]" alt="" />
      </div>
    </DashTitleSlot>

    <!-- product card -->

    <Carousel :settings="settings" :breakpoints="breakpoints" :wrap-around="true">
      <Slide v-for="(data, index) in product_category" :key="index" class="py-[1rem]">
        <div class="hover:shadow-lg hover:bg-white hover:rounded-lg p-2 w-full relative group">
          <!-- image -->
          <div>
            <img
              :src="`${baseURL}/storage/${data.card_image}`"
              class="w-full object-cover rounded max-[500px]:h-[140px] min-[500px]:h-[227px]"
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
import DashTitleSlot from '@/components/slots/DashboardTitle.vue'
import Star from '@/assets/svg/star.vue'
import Title from '@/components/Dashboard/DashboardTitles.vue'
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
