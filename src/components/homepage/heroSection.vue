<template>
  <div>
    <div class="grid grid-cols-12 xl:gap-[2rem] mt-[3rem]">
      <!-- product -->
      <div class="xl:col-span-3 max-[1189px]:hidden">
        <div class="max-[1280px]:grid grid-cols-6 gap-[3rem] max-[1280px]:my-[3rem]">
          <div class="col-span-3 mb-[1rem] shadow-md">
            <Carousel :autoplay="3000" :wrap-around="true">
              <Slide v-for="(img, index) in Images" :key="index">
                <!-- <div class="carousel__item"> -->

                <img
                  @load="onImageLoad"
                  loading="lazy"
                  :src="`/public/images/${img.icon}`"
                  class="max-[1280px]:h-[23rem] xl:h-[18rem] object-fill w-full"
                  alt=""
                  :class="{
                    'skeleton-loader animate-skeleton bg-slate-400/10': isLoaded
                  }"
                />
                <!-- </div> -->
              </Slide>
            </Carousel>
          </div>
          <div class="col-span-3 shadow-lg">
            <Carousel :autoplay="2000" :wrap-around="true">
              <Slide v-for="slide in 4" :key="slide">
                <!-- <div class="carousel__item"> -->
                <img
                  @load="onImageLoad"
                  loading="lazy"
                  src="@/assets/images/glassy.png"
                  class="max-[1280px]:h-[23rem] xl:h-[18rem] object-fill w-full"
                  alt=""
                  :class="{
                    'skeleton-loader animate-skeleton bg-slate-400/10': isLoaded
                  }"
                />
                <!-- </div> -->
              </Slide>
            </Carousel>
          </div>
        </div>
      </div>
      <!-- hero advert -->
      <div class="col-span-12 xl:col-span-9">
        <div class="relative shadow-md">
          <div class="">
            <img
              @load="onImageLoad"
              loading="lazy"
              src="@/assets/images/b1.png"
              class="xl:h-[37rem] object-fill w-full"
              alt=""
              :class="{
                'skeleton-loader animate-skeleton bg-slate-400/10': isLoaded
              }"
            />
          </div>

          <div
            class="absolute text-black -right-5 sm:h-[40vh] md:bottom-[5rem] max-[450px]:top-[6rem] max-[640px]:top-[7rem] bottom-[0rem] w-[50%]"
          >
            <div class="text-md sm:text-2xl py-1 animate-slide-up delay-100">
              <span>Enjoy</span>
            </div>
            <div class="font2 text-xl sm:text-3xl py-2 md:text-5xl animate-slide-up delay-200">
              <span>TOP QUALITY</span>
            </div>
            <!-- <div class="text-xl">
              <span>on OJA</span>
            </div> -->
            <div
              class="text-sm w-[80%] md:block hidden py-[0rem] max-[640px]:text-xs text-justify sm:py-2 animate-slide-up delay-300"
            >
              <span
                >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio, soluta adipisci.
                Fuga sunt perferendis natus placeat mollitia facilis vero minima!</span
              >
            </div>
            <div class="my-[3rem] max-[640px]:my-[0rem] animate-slide-up delay-400">
              <button
                @click="getAllProducts"
                class="border-black hover:bg-black sm:w-56 w-[8rem] text-[0.7rem] hover:text-white border-2 p-2 sm:text-base"
              >
                <span>SHOP NOW</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Images from '@/json/hero_image.json'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import { onMounted, ref } from 'vue'
import { useProductCategory } from '@/stores/product_category.js'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const route = useRouter()
const name = ref('Autoplay')
const productCategoryStore = useProductCategory()
const { ProductsByCategory } = storeToRefs(productCategoryStore)
const isLoaded = ref(false)

const onImageLoad = () => {
  isLoaded.value = true
}
const getAllProducts = () => {
  productCategoryStore.getProductCategory()
  productCategoryStore.GetAllProducts()
  route.push({ name: 'shop_by_category', params: { id: 'shop-now' } })
}

onMounted(() => {
  onImageLoad()
})
</script>

<style scoped>
@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slide-up 0.5s ease;
}

.delay-100 {
  animation-delay: 100ms;
}

.delay-200 {
  animation-delay: 200ms;
}

.delay-300 {
  animation-delay: 300ms;
}

.delay-400 {
  animation-delay: 400ms;
}
</style>
