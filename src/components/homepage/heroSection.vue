<template>
  <div>
    <div class="grid grid-cols-12 xl:gap-[2rem] mt-[3rem] max-[568px]:my-[2rem]">
      <!-- product -->
      <div class="xl:col-span-3 max-[1189px]:hidden">
        <div class="max-[1280px]:grid grid-cols-6 gap-[3rem] max-[1280px]:my-[3rem]">
          <div class="col-span-3 mb-[1rem] shadow-md">
            <Carousel :autoplay="3000" :wrap-around="true">
              <Slide v-for="(img, index) in Images.box1" :key="index">
                <router-link :to="img.link" class="w-full">
                  <!-- <div class="carousel__item"> -->

                  <img
                    @load="onImageLoad"
                    loading="lazy"
                    :src="`/images/${img.icon}`"
                    class="max-[1280px]:h-[23rem] xl:h-[18rem] object-fill w-full"
                    alt=""
                    :class="{
                      'skeleton-loader animate-skeleton bg-slate-400/10': isLoaded
                    }"
                  />
                </router-link>
                <!-- </div> -->
              </Slide>
            </Carousel>
          </div>
          <div class="col-span-3 shadow-lg">
            <Carousel :autoplay="2000" :wrap-around="true">
              <Slide v-for="slide in 4" :key="slide">
                <router-link to="/Product/category/4" class="w-full">
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
                </router-link>
              </Slide>
            </Carousel>
          </div>
        </div>
      </div>
      <!-- hero advert -->
      <div class="col-span-12 xl:col-span-9 shadow-md">
        <Carousel :autoplay="4000" :wrap-around="true">
          <Slide v-for="(img, index) in Images.hero" :key="index">
            <!-- <div class="carousel__item"> -->

            <img
              @load="onImageLoad"
              loading="lazy"
              :src="`/images/${img.icon}`"
              class="xl:h-[37rem] max-[568px]:h-[17rem] object-cover w-full"
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
