<template>
  <div>
    <div class="rounded-[1rem] bg-white text-black text-sm font1 z-40 py-2 px-2 w-[300px] shadow">
      <!-- full name -->
      <div>
        <div class="flex items-center p-2" v-if="isLoggedIn && userInfo">
          <div>
            <UserCircle>
              <span class="text-black">{{ userInfo.first_name.charAt(0) }}</span>
            </UserCircle>
          </div>
          <div class="text-sm font2 px-3">
            <span>{{ userInfo.first_name + ' ' + userInfo.last_name }}</span>
          </div>
        </div>
      </div>
      <div v-for="(data, index) in User_Data" :key="index">
        <router-link :to="data.link">
          <div
            :class="{
              'rounded-[1rem]': $route.path === data.link,

              'bg-yellow-400/25': $route.path === data.link
            }"
            class="flex items-center justify-between hover:bg-yellow-400/25 hover:py-4 px-2 hover:rounded-[1rem] py-4"
          >
            <div class="flex items-center">
              <div>
                <img v-if="data" :src="data.icon" alt="" />
              </div>
              <div class="px-2 hover:font-bold">
                <span>{{ data.text }}</span>
              </div>
            </div>
            <div v-if="data.text === 'Saved Items' && get_saved_data.length > 0" class="px-1">
              <span class="text-xs bg-yellow-400 px-2 py-[0.2rem] rounded text-black font2">{{
                get_saved_data.length
              }}</span>
            </div>
          </div>
        </router-link>
      </div>
      <div v-if="!isLoggedIn" role="button" class="text-sm font2 text-black px-1 my-1">
        <router-link to="/auth/login">
          <AuthButtons>
            <span>Sign in</span>
          </AuthButtons></router-link
        >
      </div>
      <div v-else role="button" @click="logout()" class="text-sm">
        <div
          class="flex items-center py-4 hover:rounded-[1rem] hover:py-4 px-2 hover:bg-yellow-400/25"
        >
          <div>
            <img src="@/assets/svg/logout.svg" alt="" />
          </div>
          <div class="px-2">
            <span>logout</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSavedStore } from '@/stores/save_products.js'
import UserCircle from '@/components/slots/UserCircle.vue'
import AuthButtons from '../../components/slots/AuthButtons.vue'
import { useIsLoggedIn } from '@/composables/isAuhenticated'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useUserStore } from '@/stores/Authentication'
import User_Data from '../../json/user_drop_down.json'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

const saveStore = useSavedStore()
const { get_saved_data } = storeToRefs(saveStore)
const isLoggedIn = useIsLoggedIn()
const router = useRouter()
const store = useUserStore()
// const user = userData
const successMsg = ref('')
const errorsInfo = ref({})
const { userInfo } = storeToRefs(store)

const logout = () => {
  store.logout()
}
</script>

<style scoped></style>
