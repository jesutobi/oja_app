<template>
  <div>
    <!-- title -->
    <div class="text-center my-[3.5rem] text-[1.6rem]">
      <span class="featured-products font2">Featured Products</span>
    </div>
    <!-- product card -->
    <ProductCard>
      <div>
        <!-- image -->
        <div>
          <img src="@/assets/images/dunk-low-retro-mens-shoes-lk5Qh4.png" class="w-full" alt="" />
        </div>
        <Button_pop_up>
          <!-- save items -->
          <div>
            <Heart />
          </div>
          <div>
            <span>|</span>
          </div>
          <!-- add to cart -->
          <div>
            <AddToCart />
          </div>
        </Button_pop_up>
        <div class="flex items-center justify-between py-1">
          <div class="sm:text-[1.1rem] text-[0.8rem]">
            <!-- product name -->
            <div class="productFont">
              <span>Product name</span>
            </div>
            <!-- price -->
            <div class="productFont">
              <span> &#8358; 56</span>
            </div>
          </div>
          <div class="sm:text-[0.9rem] text-[0.8rem]">
            <!-- category -->
            <div class="font2">
              <span>Gadget</span>
            </div>
            <!-- price -->
            <div>
              <span>star</span>
            </div>
          </div>
        </div>
      </div>
    </ProductCard>
  </div>
</template>
<script setup>
import Heart from '@/assets/svg/heart.vue'
import AddToCart from '@/assets/svg/add_to_cart.vue'
import Button_pop_up from '../slots/button_pop_up.vue'
import ProductCard from '../slots/productCard.vue'
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
