<template>
  <div>
    <div>
      <!-- nav -->
      <NavBar />
    </div>

    <div class="bgwhite1 bg-cover">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/navigation/navbar.vue'
</script>

<style scoped></style>
