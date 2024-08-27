<template>
  <div class="relative">
    <!-- container mx-auto -->
    <!-- hero section -->
    <div>
      <div v-if="hero_loader" class="container mx-auto">
        <Hero />
      </div>
      <div v-else>
        <HeroSection />
      </div>
    </div>

    <div class="container mx-auto relative pt-5">
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
                  {{ (SearchResult.current_page - 1) * SearchResult.per_page + 1 }}
                  -
                  {{
                    Math.min(SearchResult.current_page * SearchResult.per_page, SearchResult.total)
                  }}
                  of {{ SearchResult.total }} Results
                </span>
              </div>
            </div>
          </DashboardCardHeader>
        </div>
        <div v-if="card_loader">
          <Cards v-for="(number, index) in 2" :key="index" class="m-1" />
        </div>
        <div v-else>
          <div v-if="SearchResult?.data?.length <= 0">
            <NoData :text="'No product under this category at the moment'" />
          </div>
          <div v-else>
            <div
              class="grid grid-cols-2 max-[550px]:grid-cols-2 max-[639px]:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-2"
            >
              <!-- {{ SearchResult }} -->
              <ProductCard
                v-for="(product, index) in SearchResult.data"
                :key="index"
                :Data="product"
                class="w-full"
              />
            </div>
            <!-- pagination -->
            <div class="pt-5">
              <Pagination :Data="SearchResult" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- booking app -->
    <div></div>
  </div>
</template>

<script setup>
import Hero from '@/components/loaders/hero_loader.vue'
import Cards from '@/components/loaders/cards.vue'
import NoData from '@/components/extras/noData.vue'
import Pagination from '@/components/extras/pagination.vue'
import { onMounted, ref, watch } from 'vue'
import DashboardCardHeader from '@/components/slots/DashboardCardHeader.vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import HeroSection from '@/components/Shop_by_category/hero_category_section.vue'
import ProductCard from '@/components/Products/product_card.vue'
import { useSearchStore } from '@/stores/search.js'

const hero_loader = ref(true)
const card_loader = ref(true)
const baseURL = ref('https://api.ojastore.com.ng')
const route = useRoute()
const searchStore = useSearchStore()
const { SearchResult } = storeToRefs(searchStore)

const fetchProductsByQuery = async (id) => {
  hero_loader.value = true
  card_loader.value = true
  try {
    await searchStore.NavSearch(route.params.id, route.query.phrase)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    hero_loader.value = false
    card_loader.value = false
  }
}

// Watch for changes in route parameters and query and fetch new data
watch(
  () => [route.params.id, route.query.phrase],
  ([newId, newPhrase]) => {
    fetchProductsByQuery()
  }
)

// Initial fetch when the component is mounted
onMounted(() => {
  fetchProductsByQuery()
})
</script>

<style></style>
