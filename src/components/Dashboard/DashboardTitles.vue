<template>
  <div>
    <div class="mx-2">
      <span class="font2 text-lg md:text-xl"> {{ text }}</span>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  text: String
})

const text = props.text
</script>
<style scoped></style>
