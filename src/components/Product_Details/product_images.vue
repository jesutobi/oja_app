<template>
  <div>
    <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
      <Slide v-for="(data, index) in productDetail.images" :key="index" class="md:w-full sm:p-2">
        <div class="carousel__item w-full">
          <img
            loading="lazy"
            @load="onImageLoad"
            :src="`${baseURL}/storage/${data.image_path}`"
            class="object-cover sm:rounded-lg h-[400px] w-full sm:h-[500px]"
            alt=""
            :class="{
              'skeleton-loader animate-skeleton bg-slate-400/10': isLoaded
            }"
          />
        </div>
      </Slide>

      <template #addons>
        <div class="max-[768px]:hidden lg:hidden">
          <Navigation />
        </div>
      </template>
    </Carousel>

    <Carousel
      class="md:hidden lg:block"
      id="thumbnails"
      v-model="currentSlide"
      :items-to-show="5"
      :wrap-around="true"
      ref="carousel"
      :breakpoints="breakpoints"
    >
      <Slide v-for="(data, index) in productDetail.images" :key="index">
        <div class="carousel__item my-2" @click="slideTo(index - 1)">
          <img
            loading="lazy"
            @load="onImageLoad"
            :src="`${baseURL}/storage/${data.image_path}`"
            class="object-cover rounded h-[80px] w-[80px] sm:w-[90px] sm:h-[90px]"
            alt=""
            :class="{
              'skeleton-loader animate-skeleton bg-slate-400/10': isLoaded
            }"
          />
        </div>
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>
<script setup>
defineProps({
  Data: Object
})
import { useProduct } from '@/stores/product'
import { reactive, ref, onMounted, watch } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

const store = useProduct()
const { productDetail } = storeToRefs(store)
const route = useRoute()
const baseURL = ref('https://api.ojastore.com.ng')
const currentSlide = ref(0)
const name = ref('Gallery')
const carousel = ref(null)
const isLoaded = ref(false)

const onImageLoad = () => {
  isLoaded.value = true
}

const slideTo = (val) => {
  currentSlide.value = val
}
const breakpoints = reactive({
  300: {
    itemsToShow: 4,
    snapAlign: 'center'
  },
  510: {
    itemsToShow: 5,
    snapAlign: 'center'
  },
  1024: {
    itemsToShow: 4.2,
    snapAlign: 'center'
  },
  1280: {
    itemsToShow: 5,
    snapAlign: 'center'
  }
})

onMounted(() => {
  onImageLoad()
})
</script>
<style scoped></style>
