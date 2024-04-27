<template>
  <div>
    <!-- header -->
    <div>
      <span class="font2 text-lg md:text-2xl"> Account Overview</span>
    </div>
    <!-- my details and default shipping details -->
    <div class="grid grid-cols-2 max-[768px]:grid-cols-1 max-[768px]:p-3 gap-4 my-5">
      <!-- my details -->
      <DashboardCard>
        <div class="bg-yellow-400/25 md:px-3 md:py-4 p-2 rounded-t-[1rem]">
          <div class="flex justify-between">
            <div>
              <span class="font2">Profile Details</span>
            </div>
            <div class="cursor-pointer">
              <router-link to="/dashboard/edit-profile"> <EditIcon /></router-link>
            </div>
          </div>
        </div>
        <div class="text-sm md:p-3 p-2" v-for="(item, index) in fakeData" :key="index">
          <span>{{ item }} </span>
        </div>
        <!-- info -->
        <LittleInfo :text="`Go to Edit profile to update profile details`" />
      </DashboardCard>
      <!-- shipping default -->
      <DashboardCard>
        <div class="bg-yellow-400/25 md:px-3 md:py-4 p-2 rounded-t-[1rem]">
          <div class="flex justify-between">
            <div>
              <span class="font2">Default shipping address</span>
            </div>
            <div class="cursor-pointer">
              <router-link to="/dashboard/address-book"> <EditIcon /></router-link>
            </div>
          </div>
        </div>
        <div>
          <NoData :text="`Go to your Address Book to update your default shipping Address`" />
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
import fakeData from '@/json/mockProfileData.json'
</script>

<style scoped></style>
