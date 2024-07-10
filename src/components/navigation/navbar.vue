<template>
  <div class="relative">
    <div class="sm:py-[2rem] max-[640px]:py-[1.6rem] px-7 max-[640px]:px-1 relative shadow-md">
      <div class="">
        <div class="flex items-center justify-between">
          <div class="flex">
            <!--hamburger -->
            <div><Hamburger /></div>
            <!-- mob logo -->
            <div
              class="font_logo sm:hidden max-[640px]:px-2 max-[640px]:text-[1.6rem] text-black-400 text-[2.5rem]"
            >
              <router-link to="/"> <span>OJA</span></router-link>
            </div>
          </div>
          <!-- logo -->
          <div
            class="font_logo max-[640px]:text-[2rem] max-[640px]:hidden text-black-400 text-[2.5rem] absolute left-1/2 transform -translate-x-1/2"
          >
            <router-link to="/"> <span>OJA</span></router-link>
          </div>
          <div class="flex items-center font2 cursor-pointer">
            <div class="">
              <IconHover>
                <Search @click="openSearchModal" :color="`#000000`" />
              </IconHover>
            </div>

            <!-- cart -->

            <div class="relative inline-block">
              <router-link to="/Product/shopping_cart">
                <IconHover>
                  <Bag />
                </IconHover>
                <span
                  class="absolute top-[0.5rem] sm:top-[0.5rem] sm:right-[1.6rem] right-[0.9rem] inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 text-xs font-bold font2 bg-yellow-400 rounded-full transform translate-x-1/2 -translate-y-1/2"
                >
                  {{ totalQuantity }}
                </span>
              </router-link>
            </div>

            <!-- userdropdown -->
            <div class="group max-[450px]:hidden">
              <div class="mx-1 group-hover:block">
                <div v-if="isLoggedIn && store.user.userInfo">
                  <IconHover>
                    <UserCircle>
                      <span class="text-black">{{ store.user.userInfo.first_name.charAt(0) }}</span>
                    </UserCircle>
                  </IconHover>
                </div>
                <div v-else><User :width="'28px'" /></div>
              </div>

              <div
                class="z-40 fixed group-hover:block hidden right-[2rem] top-[3rem] animate__animated animate__fadeInUp animate__faster"
              >
                <div class="bg-transparent h-[3rem]"></div>
                <Dropdown class="group-hover:block" />
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
import IconHover from '@/components/slots/iconHover.vue'
import UserCircle from '@/components/slots/UserCircle.vue'
import { onMounted, reactive, ref } from 'vue'
import { useUserStore } from '@/stores/Authentication'
import SearchM from '../homepage/searchPage.vue'
import { useIsLoggedIn } from '@/composables/isAuhenticated'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'

const searchVisibility = ref(false)
const InCartStore = useCartStore()
const { totalQuantity } = storeToRefs(InCartStore)
const DropdownVar = ref(false)
const store = useUserStore()
const isLoggedIn = useIsLoggedIn()

function closeModal(data) {
  console.log(data)

  searchVisibility.value = data
}

function openSearchModal() {
  searchVisibility.value = true
}

function dropUser() {
  DropdownVar.value = true
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
