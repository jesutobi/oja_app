<template>
  <div>
    <div class="bg-white h-[100vh] w-[250px] shadow-lg relative pt-[8rem]">
      <div class="cursor-pointer text-right underline text-xs p-2" @click="$emit('closeSideBar')">
        <span>close</span>
      </div>
      <!-- <DashboardCardHeader class="p-2">
              <span class="font2">Categories</span>
            </DashboardCardHeader> -->
      <!-- search -->
      <div class="mx-2">
        <form @input="searchBytext" action="">
          <input
            v-model="searchValue"
            type="text"
            class="rounded-lg border border-slate w-full p-2 my-1 text-sm"
            placeholder="Search by title & brand "
          />
        </form>
      </div>
      <!-- checkboxes -->
      <div>
        <div class="p-2 text-xs">
          <span class="font2">Categories</span>
        </div>
        <div
          @click="$emit('closeSideBar')"
          class="flex items-center text-xs p-[0.6rem] hover:text-gray-400 cursor-pointer"
        >
          <div>
            <input @click="getAllProducts" type="radio" />
          </div>
          <div class="px-2">
            <span>All</span>
          </div>
        </div>
        <div
          v-for="(item, index) in category"
          :key="index"
          class="flex items-center text-xs p-[0.6rem] hover:text-gray-400 cursor-pointer"
        >
          <div>
            <input
              v-model="selectedCategory"
              @change="fetchProducts(item.id)"
              type="radio"
              :value="item.id"
              :name="'category'"
            />
          </div>
          <div class="px-2">
            <span>{{ item.category_title }}</span>
          </div>
        </div>
      </div>
      <!-- filter -->
      <!-- <div class="border-top border">
        <div class="p-2 text-xs">
          <span class="font2">Filters</span>
        </div>
        <div
          v-for="(item, index) in Filter"
          :key="index"
          class="flex items-center text-xs p-[0.6rem] hover:text-gray-400 cursor-pointer"
        >
          <div>
            <input
              :value="item.value"
              @change="searchBytext"
              v-model="selectedValue"
              type="radio"
            />
          </div>
          <div class="px-2">
            <span>{{ item.text }}</span>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useProductCategory } from '@/stores/product_category.js'

import { useRoute } from 'vue-router'
import { useSearchStore } from '@/stores/search.js'
import { storeToRefs } from 'pinia'

const route = useRoute()
const productCategoryStore = useProductCategory()
const selectedCategory = null
const searchValue = ref('')
// const selectedValue = ref()
const searchStore = useSearchStore()
const { ProductsByCategory, ProductCategoryInfo, category } = storeToRefs(productCategoryStore)

const fetchProducts = (id) => {
  productCategoryStore.getProductsByCategory(id)
}
const getAllProducts = () => {
  productCategoryStore.getProductCategory()
  productCategoryStore.GetAllProducts()
}

const searchBytext = () => {
  searchStore.GetProductsBySearch(searchValue.value)
}

// Watch for changes in route parameters and fetch new data
watch(
  () => route.params.id,
  (newId) => {
    fetchProducts(newId)
  }
)
</script>

<style scoped></style>
