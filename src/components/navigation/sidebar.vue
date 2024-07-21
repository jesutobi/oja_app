<template>
  <div class="">
    <div class="bg-white h-[100vh] w-[320px] shadow-lg relative">
      <div class="overflow-auto sm:h-[83vh] h-[78vh]">
        <div class="border-b-yellow-300 border-b">
          <!-- logo and close -->
          <div class="flex items-center justify-between px-3 py-6">
            <div class="cursor-pointer" @click="$emit('closeSideBar')">
              <img src="@/assets/icon/close.svg" style="width: 25px" alt="" />
            </div>

            <div v-if="isLoggedIn">
              <UserCircle>
                <span class="text-black">{{ userInfo.first_name.charAt(0) }}</span>
              </UserCircle>
            </div>
            <div v-else>
              <router-link to="Auth/Login">
                <div>
                  <button class="text-xs p-2 bg-yellow-400 rounded-lg"><span>Sign in</span></button>
                </div></router-link
              >
            </div>
          </div>
        </div>
        <div class="px-3">
          <!-- title -->
          <div class="text-[1rem] py-3 flex justify-between">
            <div class="font2"><span>Dashboard</span></div>
            <div><img src="@/assets/icon/dashboard.svg" alt="" class="w-[20px]" /></div>
          </div>
          <div
            class="text-[0.9rem] text-gray-500 py-2"
            v-for="(item, index) in SideBarData"
            :key="index"
          >
            <router-link :to="item.link">
              <span>
                {{ item.text }}
              </span></router-link
            >
          </div>
        </div>
        <div class="px-3">
          <!-- title -->
          <div class="text-[1rem] py-3 flex justify-between">
            <div class="font2"><span>Categories</span></div>
            <div><img src="@/assets/icon/dashboard.svg" alt="" class="w-[20px]" /></div>
          </div>
          <div
            class="text-[0.9rem] py-2 text-gray-500 cursor-pointer"
            v-for="(item, index) in category"
            :key="index"
          >
            <span>
              {{ item.category_title }}
            </span>
          </div>
        </div>
      </div>
      <!-- sign out and copyrirght -->
      <div class="px-3">
        <div class="absolute bottom-6 w-full">
          <div
            v-if="isLoggedIn"
            @click="logout()"
            class="flex text-[0.9rem] items-center py-4 cursor-pointer"
          >
            <div>
              <img src="@/assets/svg/logout.svg" alt="" />
            </div>
            <div class="px-2">
              <span>logout</span>
            </div>
          </div>
          <div>
            <Copyright class="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import SideBarData from '../../json/dashboard_data.json'
import Copyright from '@/components/extras/copyright.vue'
import ProdButton from '../slots/productButtons.vue'
import UserCircle from '@/components/slots/UserCircle.vue'
import { useIsLoggedIn } from '@/composables/isAuhenticated'
import { useUserStore } from '@/stores/Authentication'
import { useProductCategory } from '@/stores/product_category.js'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

const isLoggedIn = useIsLoggedIn()
const store = useUserStore()
const categoryStore = useProductCategory()
const { userInfo } = storeToRefs(store)
const { category } = storeToRefs(categoryStore)
const isSidebarOpen = ref(false)

const getcategory = () => {
  categoryStore.getProductCategory()
}

const logout = () => {
  store.logout()
}

const openSidebar = () => {
  isSidebarOpen.value = true
  document.body.classList.add('no-scroll')
}

const closeSidebar = () => {}

onMounted(() => {
  getcategory()
})
</script>
<style scoped>
.no-scroll {
  overflow: hidden;
}
</style>
