<template>
  <div>
    <div
      class="grid grid-cols-12 max-[768px]:gap-0 max-[768px]:grid-cols-1 my-11 max-[1024px]:gap-2 min-[1024px]:gap-8"
    >
      <!-- product images -->
      <div class="lg:col-span-5 max-[1024px]:col-span-4">
        <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
          <Slide v-for="(data, index) in product_detail.images" :key="index" class="w-full">
            <div class="carousel__item">
              <img
                :src="`${baseURL}/storage/${data.image_path}`"
                class="object-cover rounded-lg w-[500px] h-[500px]"
                alt=""
              />
            </div>
          </Slide>
        </Carousel>
        <Carousel
          id="thumbnails"
          v-model="currentSlide"
          :items-to-show="5"
          :wrap-around="true"
          ref="carousel"
        >
          <Slide v-for="(data, index) in product_detail.images" :key="index">
            <div class="carousel__item my-2" @click="slideTo(index - 1)">
              <img
                :src="`${baseURL}/storage/${data.image_path}`"
                class="w-full object-cover rounded"
                style="height: 90px; width: 90px"
                alt=""
              />
            </div>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
      <div class="lg:col-span-7 max-[1024px]:col-span-8 rounded-lg py-2 px-4">
        <!-- product tite -->
        <div class="leading-loose tracking-wide font2 text-[1rem] w-[80%]">
          <span class="">{{ product_detail.product_title }}</span>
        </div>
        <!-- product price -->
        <div class="leading-loose tracking-wide productFont text-[1.5rem] py-3">
          <span class="">&#8358;{{ formatPrice(product_detail.product_price) }}</span>
        </div>
        <!-- brand -->
        <div class="text-sm flex items-center my-3">
          <div>
            <span>Brand</span>
          </div>
          <div>
            <span class="text-yellow-600">: {{ product_detail.product_brand }}</span>
          </div>
        </div>
        <!-- Quantity -->
        <div class="text-sm flex items-center my-3">
          <div>
            <span>Amount left</span>
          </div>
          <div>
            <span class="text-yellow-600">: {{ product_detail.product_quantity }}</span>
          </div>
        </div>
        <!-- add to cart -->

        <div class="flex items-center text-sm py-3">
          <div><span>Add to cart : </span></div>
          <div
            class="flex items-center rounded p-1 mx-1 font text-sm justify-between bg-yellow-400 w-[160px]"
          >
            <!-- decrement -->
            <div class="px-2 cursor-pointer">
              <img src="@/assets/svg/minus-svgrepo-com.svg" style="width: 20px" alt="" />
            </div>
            <div><span>|</span></div>
            <!-- data -->
            <div>
              <input
                type="text"
                v-model="cart_number"
                style="width: 40px"
                class="p-1 bg-transparent text-center cursor-text focus:outline-none"
              />
            </div>
            <div><span>|</span></div>
            <!-- increment -->
            <div class="px-2 cursor-pointer">
              <img src="@/assets/svg/plus-svgrepo-com.svg" style="width: 30px" alt="" />
            </div>
          </div>
        </div>

        <!-- buy now button -->
        <div class="py-3">
          <button class="bg-yellow-400 font2 rounded p-2 text-sm w-[36%]">Buy Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Plus from '@/assets/svg/plus.vue'
import Minus from '@/assets/svg/minus.vue'
import { onMounted, ref } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import { useProduct } from '@/stores/product'

const store = useProduct()

const name = ref('Gallery')
const product_detail = ref({})
const currentSlide = ref(0)
const id = ref(0)
const cart_number = ref(0)
const baseURL = ref('http://localhost:8000')

const slideTo = (val) => {
  currentSlide.value = val
}

const formatPrice = (price) => {
  if (price !== undefined && price !== null) {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  }
  return ''
}

const getProductDetail = () => {
  id.value = localStorage.getItem('product_id')
  console.log(id.value)

  store.GetProductDetail(id.value).then((response) => {
    const data = response.data
    product_detail.value = data
  })
}

onMounted(() => {
  getProductDetail()
})
</script>

<style scoped></style>
