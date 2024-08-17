<template>
  <div>
    <!-- product card -->

    <div class="hover:shadow-lg hover:bg-white hover:rounded-lg p-2 w-full relative group">
      <router-link :to="`/Product_details/${props.Data.id}`">
        <!-- image -->
        <!-- <div
          v-if="isLoaded"
          class=""
        ></div> -->
        <div>
          <img
            loading="lazy"
            @load="onImageLoad"
            :src="`${baseURL}/storage/${props.Data.images[0].image_path}`"
            class="w-full object-cover rounded max-[500px]:h-[140px] min-[500px]:h-[227px]"
            alt=""
            :class="{
              'skeleton-loader animate-skeleton bg-slate-400/10': isLoaded
            }"
          />
        </div>
      </router-link>

      <Button_pop_up class="max-[400px]:hidden">
        <!-- save items -->
        <!-- <div><SaveButton :Data="Data" /></div> -->
        <div>
          <span>|</span>
        </div>
        <!-- add to cart -->
        <div>
          <AddToCart @click="incrementQuantity(props.Data)" class="cursor-pointer" />
        </div>
      </Button_pop_up>
      <router-link :to="`/Product_details/${props.Data.id}`">
        <div class="flex items-center justify-between py-1">
          <div class="sm:text-[1rem] text-[0.8rem] text-start">
            <!-- product name -->
            <div class="productFont">
              <span>{{ truncateText(props.Data.product_title, 13) }}</span>
            </div>
            <!-- price -->
            <div class="productFont text-[#FFBF00]">
              <span> &#8358; {{ formatPrice(props.Data.product_price) }}</span>
            </div>
          </div>
          <div class="sm:text-[0.75rem] text-[0.8rem] text-end">
            <!-- category -->
            <div class="font2">
              <span>{{ truncateText(props.Data.product_category.category_title, 7) }}</span>
            </div>
            <!-- price -->
            <div class="productFont">
              <span>star</span>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script setup>
// import SaveButton from '@/components/extras/saveButton.vue'
import AddToCart from '@/assets/svg/add_to_cart.vue'
import Button_pop_up from '../slots/button_pop_up.vue'
import { useCartStore } from '@/stores/cart'
import { onBeforeMount, onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useRouter } from 'vue-router'
import { useFormatPrice } from '@/composables/formatPrice'

const { formatPrice } = useFormatPrice()
const isLoaded = ref(false)
const router = useRouter()
const baseURL = ref('https://api.ojastore.com.ng')
const store = useCartStore()

const props = defineProps({
  Data: {
    type: Object,
    required: true
  }
})

const incrementQuantity = (value) => {
  store.AddToCart(value)
  setTimeout(() => {
    const id = 'Added to cart'
    toast(id, {
      theme: 'colored',
      type: 'success',
      autoClose: 1000,
      transition: 'slide',
      dangerouslyHTMLString: true
    })
  })
}
const truncateText = (text, maxLength) => {
  if (text) {
    return text.length > maxLength ? text.substring(0, maxLength) + '..' : text
  }
}

const onImageLoad = () => {
  isLoaded.value = true
}

onBeforeMount(() => {
  onImageLoad()
})
</script>

<style scoped></style>
