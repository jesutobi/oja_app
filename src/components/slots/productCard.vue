<template>
  <div>
    <div
      class="grid lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-5 max-[1024px]:grid-cols-2 max-[1024px]:p-3 gap-4 my-5"
    >
      <div class="hover:shadow-lg hover:rounded-[0.8rem] p-2 relative group">
        <slot></slot>
      </div>
      <div class="hover:shadow-lg hover:rounded-[0.8rem] p-2 relative group">
        <slot></slot>
      </div>
      <div class="hover:shadow-lg hover:rounded-[0.8rem] p-2 relative group">
        <slot></slot>
      </div>
      <div class="hover:shadow-lg hover:rounded-[0.8rem] p-2 relative group">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style scoped></style>
