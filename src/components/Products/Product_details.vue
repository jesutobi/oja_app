<template>
  <div>
    <div
      class="grid grid-cols-12 max-[768px]:gap-0 max-[768px]:grid-cols-1 pt-11 max-[1024px]:gap-2 min-[1024px]:gap-5"
    >
      <!-- product images -->
      <div class="lg:col-span-5 max-[1024px]:col-span-4 shadow bg-white rounded-lg">
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
      <!-- product info -->
      <div class="lg:col-span-7 max-[1024px]:col-span-8 py-2 px-4 shadow bg-white rounded-lg">
        <!-- product tite -->
        <div class="flex justify-between">
          <div class="leading-loose tracking-wide productFont text-[1rem] w-[80%]">
            <span class="">{{ product_detail.product_title }}</span>
          </div>
          <div>
            <img src="@/assets/svg/link-svgrepo-com.svg" style="width: 40px" alt="" />
          </div>
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
            <span>Store count</span>
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
                class="p-1 bg-transparent text-center font2 cursor-text focus:outline-none"
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

        <!-- product features-->
        <div class="text-sm py-3">
          <div class="py-2 font2">
            <span>Features</span>
          </div>
          <div>
            <ul class="list-disc p-2" v-for="(data, index) in product_feature" :key="index">
              <li>
                <div class="flex items-center">
                  <div class="font2">
                    <span>{{ data.key.feature_title }}</span>
                  </div>
                  <div>
                    <span> : {{ data.value }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- product description and review -->
    <div
      class="grid grid-cols-12 max-[768px]:gap-0 max-[768px]:grid-cols-1 my-5 max-[1024px]:gap-2 min-[1024px]:gap-5"
    >
      <!-- Product Description -->
      <div class="lg:col-span-6 max-[1024px]:col-span-4 shadow rounded-lg text-sm p-2 bg-white">
        <div class="font2 py-3">
          <span>Product Description</span>
        </div>
        <div>
          <p
            v-html="product_description"
            class="whitespace-pre-wrap text-[0.8rem] leading-relaxed"
          ></p>
        </div>
      </div>
      <!-- pProduct review -->
      <div
        class="lg:col-span-6 max-[1024px]:col-span-8 text-sm py-2 px-4 shadow bg-white rounded-lg"
      >
        <div class="py-2 flex items-center justify-between">
          <div class="font2">
            <span>Product Review</span>
          </div>
          <div>
            <button class="bg-yellow-400 font2 rounded p-2 flex items-center text-sm">
              <div class="font2">
                <span> Review Product</span>
              </div>
              <div class="px-1">
                <img src="@/assets/icon/pencil-svgrepo-com.svg" style="width: 13px" alt="" />
              </div>
            </button>
          </div>
        </div>
        <div><NoData :text="`This product has no review at the moment`" /></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Plus from '@/assets/svg/plus.vue'
import Minus from '@/assets/svg/minus.vue'
import { computed, onMounted, ref } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import { useProduct } from '@/stores/product'
import NoData from '@/components/extras/noData.vue'

const store = useProduct()

const name = ref('Gallery')
const product_detail = ref({})
const product_feature = ref([])
const product_description = ref('')
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
    product_feature.value = JSON.parse(response.data.selected_product_feature)
    product_description.value = response.data.product_description
  })
}

onMounted(() => {
  getProductDetail()
})
</script>

<style scoped></style>
