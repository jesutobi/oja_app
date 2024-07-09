<template>
  <div>
    <!-- product card -->

    <div class="hover:shadow-lg hover:bg-white hover:rounded-lg p-2 w-full relative group">
      <router-link :to="`/Product_details/${props.Data.id}`">
        <!-- image -->
        <div>
          <img
            :src="`${baseURL}/storage/${props.Data.images[0].image_path}`"
            class="w-full object-cover rounded"
            style="height: 227px"
            alt=""
          />
        </div>
      </router-link>
      <Button_pop_up>
        <!-- save items -->
        <div>
          <Heart />
        </div>
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
              <span>{{
                props.Data.product_title
                  .toString()
                  .replace(/(<([^>]+)>)/gi, '')
                  .substring(0, 12)
              }}</span>
            </div>
            <!-- price -->
            <div class="productFont text-[#FFBF00]">
              <span> &#8358; {{ props.Data.product_price }}</span>
            </div>
          </div>
          <div class="sm:text-[0.75rem] text-[0.8rem] text-end">
            <!-- category -->
            <div class="font2">
              <span>{{
                props.Data.product_category.category_title
                  .toString()
                  .replace(/(<([^>]+)>)/gi, '')
                  .substring(0, 12)
              }}</span>
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
import Heart from '@/assets/svg/heart.vue'
import AddToCart from '@/assets/svg/add_to_cart.vue'
import Button_pop_up from '../slots/button_pop_up.vue'
import { useCartStore } from '@/stores/cart'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const baseURL = ref('http://localhost:8000')
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
</script>

<style scoped></style>
