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
//import { computed, ref } from 'vue'

// // start date varibale
// const startDate = ref(null)
// // end date variable
// const endDate = ref(null)
// // the designated grace period
// const gracePeriodHours = 3

// const duration = computed(() => {
//   // if a start date and end time hasnt been selected
//   if (!startDate.value || !endDate.value) return 0

//   // converting the selected date string to Date Object : the result of the string conversion is in milliseconds
//   const start = new Date(startDate.value)
//   const end = new Date(endDate.value)

//   // converting the difference in milisenconds to days
//   const differenceInHours = (end - start) / (1000 * 60 * 60)

//   // if a user is still within the grace period
//   if (differenceInHours <= 24 + gracePeriodHours) {
//     return 1
//   } else {
//     // using Math.ceil helps to round up the calculated duration to the nearest integer
//     return Math.ceil(differenceInHours / 24)
//   }
// })
// <!-- start date -->
//     <div class="m-[3rem] text-sm">
//       <form action="" @submit.prevent="submitBooking">
//         <div class="">
//           <!-- start date -->
//           <div class="my-2">
//             <label>Start Date:</label>
//             <input class="border rounded p-2 mx-2" type="date" v-model="startDate" />
//           </div>

//           <!-- end date -->
//           <div class="my-2">
//             <label>End Date:</label>
//             <input class="border rounded p-2 mx-2" type="date" v-model="endDate" />
//           </div>
//         </div>
//         <!-- duration -->
//         <div class="my-2">
//           <p>Duration: {{ duration }} day(s)</p>
//         </div>
//         <!-- submit button -->
//         <button type="submit" class="bg-black my-2 text-white rounded-sm p-2 text-xs">Book</button>
//       </form>
//     </div>
</script>

<style scoped></style>
