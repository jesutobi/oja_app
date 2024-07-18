<template>
  <div class="relative">
    <div><router-view></router-view></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useSavedStore } from '@/stores/save_products.js'
import { useUserStore } from '@/stores/Authentication'
import { useIsLoggedIn } from '@/composables/isAuhenticated'
import { storeToRefs } from 'pinia'

const userstore = useUserStore()
const { userInfo } = storeToRefs(userstore)
const saveStore = useSavedStore()
const isLoggedIn = useIsLoggedIn()
const user_id = ref(userInfo.value ? userInfo.value.id : null)

// // import paystack from 'vue-paystack'
</script>

<style scoped></style>
