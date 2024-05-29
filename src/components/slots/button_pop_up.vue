<template>
  <div>
    <div
      class="absolute sm:bottom-[4.5rem] bottom-[2.5rem] right-0 left-0 opacity-0 transform translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out"
    >
      <div
        class="flex items-center bg-white shadow-lg justify-evenly sm:mx-[5rem] mx-[2rem] sm:my-3 mb-5 rounded-md sm:py-2 py-1"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style scoped></style>
