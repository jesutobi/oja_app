<template>
  <div>
    <div @click="goBack()" role="button" class="flex items-center">
      <div>
        <img
          src="@/assets/icon/arrow-back-basic-svgrepo-com.svg"
          alt=""
          class="px-1"
          style="width: 28px"
        />
      </div>
      <div class="font2 text-sm">
        <span>Back</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.go(-1) // Go back one step
}
</script>

<style></style>
