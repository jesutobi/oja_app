<template>
  <div class="">
    <button
      type="submit"
      class="rounded-2xl py-[0.8rem] svg outline hover:bg-black hover:text-white outline-black w-full text-center text-[0.8rem]"
    >
      <div class="flex items-center justify-center hov-button">
        <div>
          <Google class="fill-current" />
        </div>
        <div><slot></slot></div>
      </div>
    </button>
    <div class="text-center my-4 font2 text-sm">
      <span>OR</span>
    </div>
  </div>
</template>

<script setup>
import Google from '@/assets/svg/google.vue'
</script>

<style scoped>
.hov-button:hover {
  color: white !important;

  /* padding: 1rem; */
}
</style>
