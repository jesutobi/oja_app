<template>
  <div>
    <div
      class="grid grid-cols-2 max-[550px]:grid-cols-2 max-[639px]:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-1 sm:gap-2"
    >
      <div v-for="(number, index) in 4" :key="index">
        <div
          class="skeleton-loader animate-skeleton bg-slate-400/10 rounded max-[500px]:h-[140px] min-[500px]:h-[227px]"
        ></div>
        <div
          class="skeleton-loader animate-skeleton bg-slate-400/10 h-[9px] w-[40%] rounded my-2"
        ></div>
        <div
          class="skeleton-loader animate-skeleton bg-slate-400/10 h-[8px] w-[35%] rounded my-2"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style scoped></style>
