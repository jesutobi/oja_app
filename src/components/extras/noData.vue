<template>
  <div>
    <div class="flex items-center justify-center h-[50vh]">
      <div>
        <!-- icon -->
        <div class="my-1 flex justify-center">
          <img src="@/assets/icon/grey-clipboard.svg" style="width: 120px" alt="" />
        </div>
        <div class="text-[0.8rem] text-center w-72 my-[2rem]">
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
