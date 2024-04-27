<template>
  <div>
    <div class="flex items-center justify-center h-[27vh]">
      <div>
        <!-- icon -->
        <div class="my-1 flex justify-center">
          <img src="@/assets/icon/notificationBell.svg" style="width: 80px" alt="" />
        </div>
        <div class="text-sm text-center w-72">
          <span>{{ text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Define the props you expect to receive
const props = defineProps({
  text: String
})

const text = props.text
</script>

<style scoped></style>
