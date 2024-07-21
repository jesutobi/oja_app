<template>
  <div>
    <div>
      <!-- nav -->
      <NavBar />
    </div>

    <div class="bgwhite1 bg-cover">
      <router-view></router-view>
    </div>
    <div><FooterInfo /></div>
  </div>
</template>

<script setup>
import FooterInfo from '@/components/navigation/footer.vue'
import NavBar from '@/components/navigation/navbar.vue'
</script>

<style scoped></style>
