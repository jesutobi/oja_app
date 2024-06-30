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
      <div
        class="flex items-center rounded p-1 mx-1 font sm:text-sm text-xs justify-between bg-yellow-400 w-[130px] sm:w-[160px]"
      >
        <!-- decrement -->
        <div @click="decrementQuantity(Data)" class="sm:px-2 px-1 cursor-pointer">
          <img src="@/assets/svg/minus-svgrepo-com.svg" class="sm:w-[20px] w-[18px]" alt="" />
        </div>
        <div><span>|</span></div>
        <!-- data -->
        <div>
          <span class="">{{ getQuantity(Data.id) }}</span>
        </div>
        <div><span>|</span></div>
        <!-- increment -->
        <div @click="incrementQuantity(Data)" class="sm:px-2 px-1 cursor-pointer">
          <img src="@/assets/svg/plus-svgrepo-com.svg" class="sm:w-[20px] w-[18px]" alt="" />
        </div>
      </div>
    </div>

    <!-- buy now button -->
    <div class="py-3">
      <ProdButton :Width="`w-[36%]`" class="">Buy Now</ProdButton>
    </div>

    <!-- product features-->
    <div class="sm:text-sm text-xs py-3">
      <div class="py-2 font2">
        <span>Features</span>
      </div>
      <div>
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
import ProdButton from '../slots/productButtons.vue'
import { ref, reactive } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useFormatPrice } from '../../composables/formatPrice'
import { useQuantityPerProduct } from '../../composables/quantityPerProduct'

defineProps({
  Data: Object,
  Feature: Array
})

const store = useCartStore()
const productQuantity = reactive(store.cartItemCount)
const cart_number = ref(0)
const copy = ref(false)
const copyButton = ref(true)
const link = ref(null)
const { formatPrice } = useFormatPrice()
const { getQuantity, incrementQuantity, decrementQuantity } = useQuantityPerProduct()

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
