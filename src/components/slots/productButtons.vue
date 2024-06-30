<template>
  <div>
    <button type="submit" :class="Width" class="bg-yellow-400 font2 rounded p-2 sm:text-sm text-xs">
      <slot></slot>
    </button>
  </div>
</template>

<script setup>
defineProps({
  Width: String
})
</script>

<style></style>
