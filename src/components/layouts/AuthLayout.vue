<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-2 max-[768px]:grid-cols-1 my-11">
      <div><router-view></router-view></div>
      <!-- image  -->
      <div class="max-[768px]:hidden">
        <img
          class="rounded-[5rem] h-[45rem] object-cover"
          src="@/assets/AuthImages/PicsArt_03-03-11.31.45.jpg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
