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
              <form @input="searchBytext" action="">
                <input
                  v-model="searchValue"
                  type="text"
                  class="rounded-lg border border-slate w-full px-2 py-3 my-2 text-sm"
                  placeholder="Search by title & brand "
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
                  <input
                    v-model="selectedCategory"
                    @change="fetchProducts(item.id)"
                    type="radio"
                    :value="item.id"
                  />
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
              <!-- <div
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
              </div> -->
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
                    <span>
                      Showing
                      {{ (ProductsByCategory.current_page - 1) * ProductsByCategory.per_page + 1 }}
                      -
                      {{
                        Math.min(
                          ProductsByCategory.current_page * ProductsByCategory.per_page,
                          ProductsByCategory.total
                        )
                      }}
                      of {{ ProductsByCategory.total }} Results
                    </span>
                  </div>
                </div>
              </DashboardCardHeader>
            </div>
            <div v-if="ProductsByCategory?.data?.length <= 0">
              <NoData :text="'No product under this category at the moment'" />
            </div>
            <div v-else>
              <div
                class="grid grid-cols-2 max-[550px]:grid-cols-2 max-[639px]:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-1 sm:gap-2"
              >
                <!-- {{ ProductsByCategory }} -->
                <ProductCard
                  v-for="(product, index) in ProductsByCategory.data"
                  :key="index"
                  :Data="product"
                  class="w-full"
                />
              </div>
              <!-- pagination -->
              <div class="pt-5">
                <Pagination :Data="ProductsByCategory" />
              </div>
            </div>
          </div>
          <!-- no data -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NoData from '@/components/extras/noData.vue'
import Pagination from '@/components/extras/pagination.vue'
import Filter from '@/json/filter.json'
import { onMounted, ref, watch } from 'vue'
import { useProductCategory } from '@/stores/product_category.js'
import DashboardCardHeader from '@/components/slots/DashboardCardHeader.vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import HeroSection from '@/components/Shop_by_category/hero_category_section.vue'
import ProductCard from '@/components/Products/product_card.vue'
import ProductGrid from '@/components/slots/productCard.vue'
import { useSearchStore } from '@/stores/search.js'

const baseURL = ref('https://api.ojastore.com.ng')
const route = useRoute()
const productCategoryStore = useProductCategory()
const { ProductsByCategory, ProductCategoryInfo, category } = storeToRefs(productCategoryStore)
const selectedCategory = null
const searchValue = ref('')
// const selectedValue = ref()
const searchStore = useSearchStore()

const fetchProducts = (id) => {
  productCategoryStore.getProductsByCategory(id)
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

onMounted(() => {
  fetchProducts(route.params.id, route.query.phrase)
})
</script>

<style></style>
