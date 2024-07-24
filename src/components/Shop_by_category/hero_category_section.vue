<template>
  <div class="container mx-auto">
    <div class="m-2">
      <div class="relative">
        <img
          loading="lazy"
          @load="onImageLoad"
          :src="`${baseURL}/storage/${ProductCategoryInfo.hero_image}`"
          alt=""
          class="rounded-[2rem] h-[20rem] w-full object-cover"
          :class="{
            'skeleton-loader animate-skeleton bg-slate-400/10': isLoaded
          }"
        />
        <div class="font2 sm:text-[2rem] text-[1.5rem] absolute bottom-0 right-0">
          <span class="bgwhite1 py-2 px-4 rounded-l-[1rem] rounded-r-[1rem]">
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
import { storeToRefs } from 'pinia'

const baseURL = ref('http://localhost:8000')
const productCategoryStore = useProductCategory()
const { ProductCategoryInfo } = storeToRefs(productCategoryStore)
const isLoaded = ref(false)

const onImageLoad = () => {
  isLoaded.value = true
}

onMounted(() => {
  onImageLoad()
})
</script>

<style scoped></style>
