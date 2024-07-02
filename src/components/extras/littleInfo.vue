<template>
  <div>
    <div class="text-xs text-gray-500 flex items-center">
      <div>
        <img src="@/assets/icon/info.svg" style="width: 15px" alt="" />
      </div>
      <div class="px-1">
        <span>{{ text }}</span>
      </div>
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
