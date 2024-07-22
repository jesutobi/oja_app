<template>
  <div class="relative">
    <!-- container mx-auto -->
    <!-- hero section -->
    <div>
      <HeroSection />
    </div>

    <div class="container mx-auto relative pt-5">
      <div class="grid grid-cols-12 gap-4 relative">
        <!-- category list -->
        <div class="col-span-3 max-[768px]:hidden">
          <div class="bg-white rounded-lg shadow sticky top-[7rem] z-40">
            <!-- <DashboardCardHeader class="p-2">
              <span class="font2">Categories</span>
            </DashboardCardHeader> -->
            <!-- search -->
            <div class="m-2">
              <form action="">
                <input
                  type="text"
                  class="rounded-lg border border-slate w-full px-2 py-3 my-2 text-sm"
                  placeholder="Search for product "
                />
              </form>
            </div>
            <!-- checkboxes -->
            <div>
              <div class="p-2 text-xs">
                <span class="font2">Categories</span>
              </div>
              <div class="flex items-center text-xs p-[0.6rem] hover:text-gray-400 cursor-pointer">
                <div>
                  <input type="radio" />
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
                  <input type="radio" />
                </div>
                <div class="px-2">
                  <span>{{ item.category_title }}</span>
                </div>
              </div>
            </div>
            <!-- filter -->
            <div class="border-top border">
              <div class="p-2 text-xs">
                <span class="font2">Filters</span>
              </div>
              <div
                v-for="(item, index) in Filter"
                :key="index"
                class="flex items-center text-xs p-[0.6rem] hover:text-gray-400 cursor-pointer"
              >
                <div>
                  <input type="radio" />
                </div>
                <div class="px-2">
                  <span>{{ item }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-9 max-[768px]:col-span-12">
          <div class="bg-white shadow p-1 rounded-lg mt-2">
            <!-- header -->
            <div>
              <DashboardCardHeader class="p-1">
                <div class="flex justify-between">
                  <div>
                    <span class="font2">Products</span>
                  </div>
                  <div class="productFont text-sm">
                    <span>Showing 01-09 of 17 Results</span>
                  </div>
                </div>
              </DashboardCardHeader>
            </div>
            <div
              class="grid grid-cols-2 max-[550px]:grid-cols-2 max-[639px]:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-1 sm:gap-2"
            >
              <ProductCard
                v-for="(product, index) in ProductsByCategory.data"
                :key="index"
                :Data="product"
                class="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Filter from '@/json/filter.json'
import { onMounted, ref } from 'vue'
import { useProductCategory } from '@/stores/product_category.js'
import DashboardCardHeader from '@/components/slots/DashboardCardHeader.vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import HeroSection from '@/components/Shop_by_category/hero_category_section.vue'
import ProductCard from '@/components/Products/product_card.vue'
import ProductGrid from '@/components/slots/productCard.vue'

const baseURL = ref('http://localhost:8000')
const route = useRoute()
const productCategoryStore = useProductCategory()
const { ProductsByCategory, ProductCategoryInfo, category } = storeToRefs(productCategoryStore)

onMounted(() => {
  productCategoryStore.getProductsByCategory(route.params.id)
})
</script>

<style></style>
