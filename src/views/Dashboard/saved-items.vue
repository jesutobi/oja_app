<template>
  <div class="font">
    <DashTitleSlot>
      <div>
        <Title :text="`Saved Items`" />
      </div>
      <div>
        <Heart :color="'#FFBF00'" />
      </div>
    </DashTitleSlot>
    <div v-if="get_saved_data.length === 0" class="">
      <NoData :text="`You have no saved product`" />
    </div>
    <AdressCardGrid>
      <!-- <div > -->
      <!-- <IconHover> -->
      <!-- <> -->

      <div
        v-for="(item, index) in get_saved_data"
        :key="index"
        class="shadow flex h-[115px] bg-white sm:rounded-lg my-3 hover:scale-102 transition-transform duration-300 ease-in-out"
      >
        <div class="sm:block hidden">
          <router-link :to="`/Product_details/${item.product.id}`">
            <img
              :src="`${baseURL}/storage/${item.product.images[0].image_path}`"
              class="object-cover rounded-lg m-2 h-[100px] w-[100px]"
              alt=""
          /></router-link>
        </div>
        <div class="relative w-full sm:w-[80%]">
          <router-link :to="`/Product_details/${item.product.id}`">
            <!-- details -->
            <div class="p-1">
              <!-- product title -->
              <div class="productFont text-xs sm:text-sm">
                <span
                  >{{
                    item.product.product_title
                      .toString()
                      .replace(/(<([^>]+)>)/gi, '')
                      .substring(0, 40)
                  }}
                </span>
              </div>
              <!-- product brand -->
              <div class="productFont text-[0.9rem] text-yellow-600">
                <span>&#8358;{{ formatPrice(item.product.product_price) }}</span>
              </div>
            </div>
          </router-link>

          <!-- increment button , buynow -->
          <!-- <div> -->
          <div class="absolute left-0 right-0 bottom-0 flex justify-between">
            <div class="flex items-center">
              <QuantityChange :Data="item.product" />

              <div><SaveButton :Data="item.product" /></div>
            </div>

            <!-- buy now -->
            <div class="py-2 mx-[0.3rem]">
              <button
                @click="BuyNow(item.product)"
                type="submit"
                class="bg-black hover:bg-yellow-500 py-1 px-2 text-white rounded text-xs"
              >
                <span class="">Buy now</span>
              </button>
            </div>
          </div>
          <!-- </div> -->
        </div>
      </div>

      <!-- </IconHover> -->
      <!-- </div> -->
    </AdressCardGrid>
  </div>
</template>
<script setup>
import QuantityChange from '@/components/extras/quantityChange.vue'
import NoData from '@/components/extras/noData.vue'
import SaveButton from '@/components/extras/saveButton.vue'
import Heart from '@/assets/svg/heart.vue'
import { useFormatPrice } from '../../composables/formatPrice'
import DashTitleSlot from '@/components/slots/DashboardTitle.vue'
import Title from '@/components/Dashboard/DashboardTitles.vue'
import AdressCardGrid from '@/components/slots/AdressCardGrid.vue'
import { useSavedStore } from '@/stores/save_products.js'
import { useBuyNow } from '@/composables/buyNow.js'

import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/Authentication'

const userstore = useUserStore()
const { BuyNow } = useBuyNow()
const saveStore = useSavedStore()
const { get_saved_data } = storeToRefs(saveStore)
const baseURL = ref('http://localhost:8000')
const { formatPrice } = useFormatPrice()
const { userInfo, token } = storeToRefs(userstore)

watch(get_saved_data, (newData, oldData) => {
  get_saved_data.value = newData
  console.log('Saved data changed:', newData)
})
</script>
<style scoped></style>
