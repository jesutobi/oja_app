<template>
  <div class="overflow-hidden">
    <div class="container mx-auto"><HeroSection /></div>
    <div class="container mx-auto overflow-hidden"><FeaturedProducts /></div>
    <div class="container mx-auto overflow-hidden"><NewArrival /></div>
    <div class="container mx-auto overflow-hidden"><Products1 /></div>
    <div class="container mx-auto overflow-hidden"><Products2 /></div>
    <div class="py-5 container mx-auto"><Ad /></div>
    <div class="container mx-auto"><ShopByCategory /></div>
  </div>
</template>

<script setup>
import HeroSection from '../components/homepage/heroSection.vue'
import FeaturedProducts from '../components/homepage/featured_products.vue'
import Products1 from '../components/homepage/products.vue'
import Products2 from '../components/homepage/products2.vue'

import ShopByCategory from '../components/homepage/shop_by_category.vue'
import NewArrival from '../components/homepage/new_product_arrrival.vue'
import Ad from '../components/homepage/additional_advert.vue'
</script>

<style scoped></style>
