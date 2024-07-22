<template>
  <div>
    <div class="sticky top-0 z-50 bg-white">
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

<style scoped>
.stickTop {
  position: sticky !important;
  top: 0 !important;
  z-index: 50 !important;
}
</style>
