<template>
  <div class="font">
    <div>
      <!-- nav -->
      <NavBar />
    </div>
    <div class="bgwhite1 bg-cover h-[100vh]">
      <div class="container mx-auto">
        <div class="mx-2">
          <div class="pt-7"><Back /></div>
          <div
            class="grid grid-cols-12 max-[768px]:gap-0 max-[768px]:grid-cols-1 my-7 max-[1024px]:gap-2 min-[1024px]:gap-8"
          >
            <!-- dashboard control -->

            <div class="lg:col-span-3 max-[1024px]:col-span-4 max-[768px]:hidden">
              <div class="shadow bg-white rounded-[1.5rem] py-2">
                <div v-for="(data, index) in SideBarData" :key="index" class="">
                  <router-link :to="data.link">
                    <div
                      :class="{
                        border: $route.path === data.link,
                        'rounded-[1rem]': $route.path === data.link,
                        'border-black': $route.path === data.link,
                        'bg-yellow-400/25': $route.path === data.link
                      }"
                      class="flex items-center justify-between hover:bg-yellow-400/25 hover:py-4 px-2 hover:rounded-[1rem] m-2 py-4"
                    >
                      <div class="flex items-center text-[0.95rem]">
                        <div>
                          <img :src="data.icon" alt="" />
                        </div>
                        <div class="px-2 hover:font-bold">
                          <span>{{ data.text }}</span>
                        </div>
                      </div>
                      <!-- check -->
                      <div class="flex items-center">
                        <div
                          v-if="data.text === 'Saved Items' && get_saved_data.length > 0"
                          class="px-1"
                        >
                          <span
                            class="text-xs bg-yellow-400 px-2 py-[0.2rem] rounded text-black font2"
                            >{{ get_saved_data.length }}</span
                          >
                        </div>
                        <div v-if="data.text === 'Orders' && orders.length > 0" class="px-1">
                          <span
                            class="text-xs bg-yellow-400 px-2 py-[0.2rem] rounded text-black font2"
                            >{{ orders.length }}</span
                          >
                        </div>
                        <div>
                          <img
                            :class="{
                              block: $route.path === data.link,
                              hidden: $route.path !== data.link
                            }"
                            src="@/assets/icon/check.svg"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </router-link>
                </div>
                <div
                  @click="logout()"
                  class="flex text-[0.95rem] px-4 py-4 items-center cursor-pointer"
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
            <!-- route display -->
            <div class="lg:col-span-9 max-[1024px]:col-span-8 rounded-xl">
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <FooterInfo />
    </div>
  </div>
</template>

<script setup>
import FooterInfo from '@/components/navigation/footer.vue'
import Back from '../../components/extras/goBack.vue'
import NavBar from '@/components/navigation/navbar.vue'
import SideBarData from '../../json/dashboard_data.json'
import { useSavedStore } from '@/stores/save_products.js'
import { useOrdersStore } from '@/stores/orders'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/Authentication'
import { ref } from 'vue'

const saveStore = useSavedStore()
const { get_saved_data } = storeToRefs(saveStore)
const orderStore = useOrdersStore()
const { orders } = storeToRefs(orderStore)
const store = useUserStore()

const logout = () => {
  store.logout()
}
</script>

<style scoped></style>
