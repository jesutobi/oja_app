<template>
  <div>
    <!-- product tite -->
    <div class="flex justify-between">
      <div class="leading-loose tracking-wide productFont sm:text-[1rem] text-[0.9rem] w-[80%]">
        <span class="">{{ Data.product_title }}</span>
      </div>

      <div class="py-1 cursor-pointer">
        <a
          v-if="copyButton"
          ref="link"
          :href="`http://localhost:5173/Product_details/${Data.id}`"
          @click.prevent="copyLink"
        >
          <img src="@/assets/icon/copy-link.svg" style="width: 20px" alt=""
        /></a>
        <div class="my-1" v-if="copy">
          <span class="rounded-full p-1 bg-yellow-400 text-xs">copied!</span>
        </div>
      </div>
    </div>
    <!-- product price -->
    <div
      class="leading-loose tracking-wide productFont sm:text-[1.5rem] text-[1.2rem] sm:py-3 py-2"
    >
      <span class="">&#8358;{{ formatPrice(Data.product_price) }}</span>
    </div>
    <!-- brand -->
    <div class="sm:text-sm text-xs flex items-center my-3">
      <div>
        <span>Brand</span>
      </div>
      <div>
        <span class="text-yellow-600">: {{ Data.product_brand }}</span>
      </div>
    </div>
    <!-- Quantity -->
    <div class="sm:text-sm text-xs flex items-center my-3">
      <div>
        <span>Store count</span>
      </div>
      <div>
        <span class="text-yellow-600">: {{ Data.product_quantity }}</span>
      </div>
    </div>
    <!-- add to cart -->

    <div class="flex items-center sm:text-sm text-xs py-3">
      <div><span>Add to bag : </span></div>
      <QuantityChange :Data="Data" />
    </div>
    <!-- buy now button -->
    <div class="py-3 flex items-center w-full">
      <ProdButton @click="BuyNow(Data)" :Width="`w-[100%]`" class="w-[40%] md:w-[30%]"
        >Buy Now</ProdButton
      >
      <SaveButton :Data="productDetail" class="px-2" />
    </div>

    <!-- product features-->
    <div class="sm:text-sm text-xs py-3">
      <div class="py-2 font2">
        <span>Features</span>
      </div>
      <!-- {{ JSON.parse(Feature) }} -->
      <div class="overflow-auto xl:h-[25vh] lg:h-[20vh] h-[25vh]">
        <ul class="list-disc p-2" v-for="(data, index) in Feature" :key="index">
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
</template>
<script setup>
import SaveButton from '@/components/extras/saveButton.vue'
import QuantityChange from '@/components/extras/quantityChange.vue'
import ProdButton from '../slots/productButtons.vue'
import { ref, reactive } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useFormatPrice } from '../../composables/formatPrice'
import { useBuyNow } from '@/composables/buyNow.js'
import { useProduct } from '@/stores/product'
import { storeToRefs } from 'pinia'

defineProps({
  Data: Object,
  Feature: Array
})

const storedetail = useProduct()
const { productDetail, productFeature } = storeToRefs(storedetail)
const store = useCartStore()
const productQuantity = reactive(store.cartItemCount)
const cart_number = ref(0)
const copy = ref(false)
const copyButton = ref(true)
const link = ref(null)
const { formatPrice } = useFormatPrice()
const { BuyNow } = useBuyNow()

const copyLink = () => {
  if (link.value) {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea')
    textarea.value = link.value.href
    document.body.appendChild(textarea)

    // Select the text in the textarea and copy it to the clipboard
    textarea.select()
    document.execCommand('copy')

    // Remove the temporary textarea
    document.body.removeChild(textarea)

    copy.value = true
    copyButton.value = false
    // Optionally, provide feedback to the user
    setTimeout(() => {
      copy.value = false
      copyButton.value = true
    }, 1000)
  }
}
</script>
<style scoped></style>
