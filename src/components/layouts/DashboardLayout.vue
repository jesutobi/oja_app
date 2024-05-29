<template>
  <div>
    <div>
      <!-- nav -->
      <NavBar />
    </div>

    <div class="container mx-auto">
      <div class="mx-2">
        <div class="my-5"><Back /></div>
        <div
          class="grid grid-cols-12 max-[768px]:gap-0 max-[768px]:grid-cols-1 my-11 max-[1024px]:gap-2 min-[1024px]:gap-8"
        >
          <!-- dashboard control -->

          <div class="lg:col-span-3 max-[1024px]:col-span-4 max-[768px]:hidden">
            <div class="shadow-md rounded-[1.5rem] py-2">
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
                    <div class="flex items-center">
                      <div>
                        <img :src="data.icon" alt="" />
                      </div>
                      <div class="px-2 hover:font-bold">
                        <span>{{ data.text }}</span>
                      </div>
                    </div>
                    <!-- check -->
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
                </router-link>
              </div>
            </div>
          </div>
          <!-- route display -->
          <div class="lg:col-span-9 max-[1024px]:col-span-8 mt-5">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Back from '../../components/extras/goBack.vue'
import NavBar from '@/components/navigation/navbar.vue'
import SideBarData from '../../json/dashboard_data.json'
</script>

<style scoped></style>
