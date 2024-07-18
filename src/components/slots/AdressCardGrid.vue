<template>
  <div>
    <div class="grid grid-cols-2 max-[1024px]:grid-cols-1 gap-4 my-2">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
<style scoped></style>
