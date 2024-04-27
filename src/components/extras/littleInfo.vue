<template>
  <div>
    <div class="text-xs flex items-center p-3">
      <div>
        <img src="@/assets/icon/info.svg" style="width: 15px" alt="" />
      </div>
      <div class="px-2">
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
<style lang=""></style>
