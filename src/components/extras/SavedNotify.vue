<template>
  <div>
    <div v-if="get_saved_data.length > 0">
      <span class="text-xs bg-yellow-400 px-2 py-[0.2rem] rounded text-black font2">{{
        get_saved_data.length
      }}</span>
    </div>
  </div>
</template>

<script setup>
import { useSavedStore } from '@/stores/save_products.js'
import { storeToRefs } from 'pinia'

const saveStore = useSavedStore()
const { get_saved_data } = storeToRefs(saveStore)
</script>

<style scoped></style>
