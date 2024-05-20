<template>
  <div>
    <!-- header -->
    <div>
      <Title :text="`Account Overview`" />
    </div>
    <!-- my details and default shipping details -->
    <div class="grid grid-cols-2 max-[1024px]:grid-cols-1 max-[1024px]:p-3 gap-4 my-5">
      <!-- my details -->
      <DashboardCard>
        <div class="bg-yellow-400/25 md:px-3 md:py-3 p-2 rounded-t-[1rem]">
          <div class="flex justify-between">
            <div>
              <span class="font2">Profile Details</span>
            </div>
            <div class="cursor-pointer">
              <router-link to="/dashboard/edit-profile"> <EditIcon /></router-link>
            </div>
          </div>
        </div>
        <div v-if="user_data" class="text-sm md:p-3 p-2">
          <div class="flex items-center py-2">
            <div>
              <span>Full name :</span>
            </div>
            <div class="px-1 text-gray-500">
              <span> {{ user_data.first_name }} {{ user_data.last_name }}</span>
            </div>
          </div>
          <div class="flex items-center py-2">
            <div><span> Email :</span></div>
            <div class="px-1 text-gray-500">
              <span>{{ user_data.email }}</span>
            </div>
          </div>
          <div class="flex items-center py-2">
            <div><span> Phone number :</span></div>
            <div class="px-1 text-gray-500">
              <span>{{ user_data.phone_number }}</span>
            </div>
          </div>
          <div class="flex items-center py-2">
            <div><span> State :</span></div>
            <div class="px-1 text-gray-500">
              <span>{{ user_data.state }}</span>
            </div>
          </div>
          <div class="flex items-center py-2">
            <div><span>Home address :</span></div>
            <div class="px-1 text-gray-500">
              <span>{{ user_data.home_address }}</span>
            </div>
          </div>
        </div>
        <!-- info -->
        <LittleInfo class="px-2" :text="`Go to Edit profile to update profile details`" />
      </DashboardCard>
      <!-- shipping default -->
      <DashboardCard>
        <div class="bg-yellow-400/25 md:px-3 md:py-3 p-2 rounded-t-[1rem]">
          <div class="flex justify-between">
            <div>
              <span class="font2">Default shipping address</span>
            </div>
            <div class="cursor-pointer">
              <router-link to="/dashboard/address-book"> <EditIcon /></router-link>
            </div>
          </div>
        </div>
        <!-- <div class="">
          <NoData :text="`Go to your Address Book to update your default shipping Address`" />
        </div> -->
        <div v-if="user_data" class="text-sm md:p-3 p-2">
          <div class="flex items-center py-2">
            <div>
              <span>Recipient :</span>
            </div>
            <div class="px-1 text-gray-500">
              <span></span>
            </div>
          </div>

          <div class="flex items-center py-2">
            <div><span> Phone number :</span></div>
            <div class="px-1 text-gray-500">
              <span></span>
            </div>
          </div>
          <div class="flex items-center py-2">
            <div><span> State :</span></div>
            <div class="px-1 text-gray-500">
              <span></span>
            </div>
          </div>
          <div class="flex items-center py-2">
            <div><span> City :</span></div>
            <div class="px-1 text-gray-500">
              <span></span>
            </div>
          </div>
          <div class="flex items-center py-2">
            <div><span>Home address :</span></div>
            <div class="px-1 text-gray-500">
              <span></span>
            </div>
          </div>
        </div>
      </DashboardCard>
    </div>
  </div>
</template>

<script setup>
import EditIcon from '@/assets/svg/edit.vue'
import NoData from '@/components/extras/noData.vue'
import LittleInfo from '@/components/extras/littleInfo.vue'
import DashboardCard from '@/components/slots/DashboardCard.vue'
import Title from '@/components/Dashboard/DashboardTitles.vue'
import { ref, onMounted } from 'vue'

const user_data = ref()

const getData = async () => {
  user_data.value = JSON.parse(localStorage.getItem('USER'))
}

onMounted(() => {
  getData()
})
</script>

<style scoped></style>
