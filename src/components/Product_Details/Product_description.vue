<template>
  <div>
    <div class="font2 py-3">
      <span>Product Description</span>
    </div>
    <div>
      <p v-html="Data" class="whitespace-pre-wrap text-[0.8rem] leading-relaxed"></p>
    </div>
  </div>
</template>
<script setup>
defineProps({
  Data: String
})
</script>
<style scoped></style>
