<template>
  <div class="font">
    <!-- item -->

    <div v-for="(item, index) in cartItems" :key="index">
      <!-- <IconHover> -->
      <!-- <> -->

      <div
        class="shadow flex relative h-[130px] justify-between bg-white sm:rounded-lg my-3 hover:scale-102 transition-transform duration-300 ease-in-out"
      >
        <router-link :to="`/Product_details/${item.id}`">
          <div class="flex">
            <!-- image -->
            <div class="sm:block hidden">
              <img
                :class="{
                  'skeleton-loader animate-skeleton bg-slate-400/10': isLoaded
                }"
                :src="`${baseURL}/storage/${item.images[0].image_path}`"
                class="object-cover rounded-lg m-2 h-[115px] w-[130px]"
                alt=""
                loading="lazy"
                @load="onImageLoad"
              />
            </div>
            <!-- details -->
            <div class="p-2">
              <!-- product title -->
              <div class="productFont text-xs sm:text-sm">
                <span
                  >{{
                    item.product_title
                      .toString()
                      .replace(/(<([^>]+)>)/gi, '')
                      .substring(0, 50)
                  }}
                </span>
              </div>
              <!-- product brand -->
              <div class="font2 py-1 text-yellow-600 text-xs">
                <span
                  >{{
                    item.product_brand
                      .toString()
                      .replace(/(<([^>]+)>)/gi, '')
                      .substring(0, 50)
                  }}
                </span>
              </div>

              <!-- product features -->
              <div class="py-1 absolute bottom-0">
                <ul
                  class="list-disc px-2 py-1 text-xs"
                  v-for="(data, index) in JSON.parse(item.selected_product_feature).slice(0, 2)"
                  :key="index"
                >
                  <li>
                    <span>{{ data.key.feature_title }}</span>

                    <span class="font-black"> : {{ data.value }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </router-link>

        <!-- increment button , delete product from cart ,price -->
        <div>
          <!-- product price -->
          <div class="productFont text-[0.9rem] px-2">
            <span>&#8358;{{ formatPrice(item.product_price) }}</span>
          </div>
          <div class="absolute bottom-0 right-0 flex items-center">
            <div
              @click="InCartStore.removeFromCart(item)"
              class="absolute bottom-0 -left-6 top-2 cursor-pointer"
            >
              <IconHover>
                <Trash />
              </IconHover>
            </div>
            <QuantityChange :Data="item" />
          </div>
        </div>
      </div>

      <!-- </IconHover> -->
    </div>
    <div v-if="cartItems.length === 0">
      <NoData :text="`Your bag is empty`" />
    </div>
  </div>
</template>
<script setup>
import QuantityChange from '@/components/extras/quantityChange.vue'
import IconHover from '@/components/slots/iconHover.vue'
import NoData from '@/components/extras/noData.vue'
import { useCartStore } from '@/stores/cart'
import { onMounted, ref } from 'vue'
import { useFormatPrice } from '../../composables/formatPrice'
import Trash from '@/assets/svg/trash.vue'
import { useQuantityPerProduct } from '../../composables/quantityPerProduct'
import { storeToRefs } from 'pinia'

const isLoaded = ref(false)
const { getQuantity, incrementQuantity, decrementQuantity, removeProduct } = useQuantityPerProduct()
const InCartStore = useCartStore()
const { cartItems } = storeToRefs(InCartStore)
const baseURL = ref('https://api.ojastore.com.ng')
const { formatPrice } = useFormatPrice()

const onImageLoad = () => {
  isLoaded.value = true
}

onMounted(() => {
  onImageLoad()
})
</script>
<style scoped></style>
