<template>
  <div>
    <div>
      <!-- title -->
      <DashTitleSlot class="">
        <div>
          <Title :text="`Beauty Products`" />
        </div>
        <div class="flex items-center">
          <router-link :to="`/Product/category/${4}`">
            <div class="text-xs px-2 underline cursor-pointer">
              <span>View more</span>
            </div>
          </router-link>
          <div>
            <img src="@/assets/icon/beauty.svg" class="w-[30px]" alt="" />
          </div>
        </div>
      </DashTitleSlot>
      <!-- product card -->

      <ProductGrid>
        <!-- <div > -->
        <div v-for="(product, index) in beautyProducts.data" :key="index">
          <ProductCard :Data="product" class="w-full" />
        </div>
        <!-- </div> -->
      </ProductGrid>
    </div>
  </div>
</template>

<script setup>
import DashTitleSlot from '@/components/slots/DashboardTitle.vue'
import Star from '@/assets/svg/star.vue'
import Title from '@/components/Dashboard/DashboardTitles.vue'
import Heart from '@/assets/svg/heart.vue'
import AddToCart from '@/assets/svg/add_to_cart.vue'
import Button_pop_up from '../slots/button_pop_up.vue'
import ProductGrid from '../slots/productCard.vue'
import ProductCard from '../Products/product_card.vue'
import { useProduct } from '@/stores/product'
import { onMounted, ref, reactive } from 'vue'
import { useProductCategory } from '@/stores/product_category.js'
import { storeToRefs } from 'pinia'

const store = useProduct()
const products = ref({})
const baseURL = ref('https://api.ojastore.com.ng')
const productCategoryStore = useProductCategory()
const { beautyProducts } = storeToRefs(productCategoryStore)

const fetchProducts = (id) => {
  productCategoryStore.getProductsByCategory(4)
}

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
.featured-products {
  text-align: center;
  position: relative;
  display: inline-block;
}

.featured-products:after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: #c0392b; /* color of the underline */
  margin: 2px auto 0;
  border-radius: 3px;
}
</style>
