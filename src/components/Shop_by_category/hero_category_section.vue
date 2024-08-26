<template>
  <div class="container mx-auto">
    <div class="m-2">
      <div class="relative">
        <img
          :class="{
            'skeleton-loader animate-skeleton bg-slate-400/10': isLoaded
          }"
          loading="lazy"
          @load="onImageLoad"
          :src="`${baseURL}/storage/${ProductCategoryInfo.hero_image}`"
          alt=""
          class="rounded-[2rem] h-[20rem] w-full object-cover"
        />
        <div class="font2 sm:text-[2rem] text-[1.5rem] absolute bottom-0 right-0">
          <span
            v-if="route.params.id == 'shop-now'"
            class="bgwhite1 py-2 px-4 rounded-l-[1rem] rounded-r-[1rem]"
          >
            Shop Now
          </span>
          <span v-else class="bgwhite1 py-2 px-4 rounded-l-[1rem] rounded-r-[1rem]">
            {{ ProductCategoryInfo.category_title }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProductCategory } from '@/stores/product_category.js'
import { useSearchStore } from '@/stores/search.js'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

const route = useRoute()
const baseURL = ref('https://api.ojastore.com.ng')
const productCategoryStore = useProductCategory()
const searchStore = useSearchStore()
const { ProductCategoryInfo } = storeToRefs(productCategoryStore)
const { NavSearch } = storeToRefs(searchStore)
const isLoaded = ref(false)

const onImageLoad = () => {
  isLoaded.value = true
}

onMounted(() => {
  onImageLoad()
})
</script>

<style scoped></style>
