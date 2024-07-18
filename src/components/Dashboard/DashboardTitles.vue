<template>
  <div>
    <div class="mx-2">
      <span class="font2 text-sm md:text-[1.1rem]"> {{ text }}</span>
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
