<template>
  <div>
    <!-- product card -->
    <router-link :to="`/Product_details/${props.Data.id}`">
      <div class="hover:shadow-lg hover:bg-white hover:rounded-[0.2rem] p-2 w-full relative group">
        <!-- image -->
        <div>
          <img
            :src="`${baseURL}/storage/${props.Data.images[0].image_path}`"
            class="w-full object-cover rounded"
            style="height: 230px"
            alt=""
          />
        </div>
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
            <AddToCart />
          </div>
        </Button_pop_up>
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
            <div class="productFont text-yellow-600">
              <span> &#8358; {{ props.Data.product_price }}</span>
            </div>
          </div>
          <div class="sm:text-[0.75rem] text-[0.8rem] text-end">
            <!-- category -->
            <div class="font2" v-if="props.Data.product_category">
              <span>{{
                JSON.parse(props.Data.product_category)
                  .category_title.toString()
                  .replace(/(<([^>]+)>)/gi, '')
                  .substring(0, 12)
              }}</span>
            </div>
            <!-- price -->
            <div class="productFont text-yellow-600">
              <span>star</span>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script setup>
import Heart from '@/assets/svg/heart.vue'
import AddToCart from '@/assets/svg/add_to_cart.vue'
import Button_pop_up from '../slots/button_pop_up.vue'

import { ref } from 'vue'

const baseURL = ref('http://localhost:8000')

const props = defineProps({
  Data: {
    type: Object,
    required: true
  }
})
</script>

<style scoped></style>
