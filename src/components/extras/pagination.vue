<template>
  <div>
    <div class="flex items-center justify-center text-sm rounded-full">
      <button
        :disabled="props.Data.current_page === 1"
        @click="paginate('prev')"
        class="mx-2 hover:rounded-full hover:bg-gray-100 p-1 cursor-pointer"
      >
        <LeftArrow :Size="`12px`" :color="color" />
      </button>
      <div class="px-2">
        <span>{{ props.Data.current_page }} of {{ Data.last_page }}</span>
      </div>
      <button
        :disabled="props.Data.current_page === Data.last_page"
        @click="paginate('next')"
        class="mx-2 hover:rounded-full hover:bg-gray-100 p-1 cursor-pointer"
      >
        <RightArrow :Size="`12px`" :color="increase" />
      </button>
    </div>
  </div>
</template>
<script setup>
import LeftArrow from '@/assets/svg/leftarrow.vue'
import RightArrow from '@/assets/svg/rightarrow.vue'
import { computed, ref } from 'vue'
import axiosClient from '@/axios'
import { useProductCategory } from '@/stores/product_category.js'
import { storeToRefs } from 'pinia'
import { useSearchStore } from '@/stores/search.js'

const props = defineProps({
  Data: {
    type: Object,
    required: true
  }
})
const productCategoryStore = useProductCategory()
const { ProductsByCategory } = storeToRefs(productCategoryStore)
const disable = ref('#9e9e9e')
const current_page_data = ref(props.Data.current_page)
const searchStore = useSearchStore()

const paginate = async (value) => {
  if (value === 'prev') {
    props.Data.current_page--
  } else if (value === 'next') {
    props.Data.current_page++
  }
  try {
    const response = await axiosClient.get(`${props.Data.path}?page=${props.Data.current_page}`)
    productCategoryStore.ProductsByCategory = response.data.products
    searchStore.SearchResult = response.data.products
  } catch (error) {
    throw error
  }
}

const color = computed(() => {
  if (props.Data.current_page === 1) {
    return disable.value
  }
})
const increase = computed(() => {
  if (props.Data.current_page === props.Data.last_page) {
    return disable.value
  }
})
</script>
<style scoped></style>
