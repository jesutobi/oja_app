<template>
  <div class="relative">
    <div class="py-4 px-7 relative shadow-md">
      <div class="">
        <div class="flex items-center justify-between">
          <!--hamburger -->
          <div><Hamburger /></div>
          <!-- logo -->
          <div class="font_logo text-black-400 text-[2.5rem]">
            <router-link to="/"> <span>OJA</span></router-link>
          </div>
          <div class="flex items-center font2 cursor-pointer">
            <div>
              <Search @click="openSearchModal" :color="`#000000`" />
            </div>

            <!-- cart -->
            <div><Bag /></div>
            <!-- userdropdown -->
            <div>
              <div @click="dropUser()" class="mx-1">
                <div v-if="$isAuthenticated" class="rounded-full bg-yellow-400 font2 py-2 px-4">
                  <span class="text-black">{{ user.charAt(0) }}</span>
                </div>
                <div v-else><User :width="'28px'" /></div>
              </div>

              <div
                v-if="DropdownVar"
                class="z-40 fixed right-[2rem] top-[6rem] animate__animated animate__fadeInUp animate__faster"
              >
                <Dropdown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="searchVisibility"
      class="absolute w-full z-40 top-0 bottom-0 h-[100vh] animate__animated animate__bounceInDown"
    >
      <SearchM @closeSearchModal="closeModal" />
    </div>
  </div>
</template>

<script setup>
import Hamburger from './hamburger.vue'
import Dropdown from './dropDown.vue'
import Bag from '@/components/navigation/cart.vue'
import Search from '@/assets/svg/search.vue'
import User from '@/assets/svg/user.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/Authentication'
import SearchM from '../homepage/searchPage.vue'

const searchVisibility = ref(false)

function closeModal(data) {
  console.log(data)

  searchVisibility.value = data
}
function openSearchModal() {
  searchVisibility.value = true
}

const DropdownVar = ref(false)

const store = useUserStore()

const user = store.user.userInfo.first_name
// console.log(user)

function dropUser() {
  DropdownVar.value = !DropdownVar.value
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
