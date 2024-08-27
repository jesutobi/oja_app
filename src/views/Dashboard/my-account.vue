<template>
  <div class="">
    <!-- header -->

    <DashTitleSlot>
      <div>
        <Title :text="`Account Overview`" />
      </div>
      <div>
        <img src="@/assets/icon/user-svgrepo-com.svg" style="width: 23px" />
      </div>
    </DashTitleSlot>

    <!-- my details and default shipping details -->
    <AdressCardGrid>
      <!-- my details -->
      <DashboardCard>
        <DashboardCardHeader class="p-2">
          <div class="flex justify-between">
            <div>
              <span class="font2 text-sm">Profile Details</span>
            </div>
            <div class="cursor-pointer">
              <router-link to="/dashboard/edit-profile"> <EditIcon /></router-link>
            </div>
          </div>
        </DashboardCardHeader>
        <div class="p-2" v-if="text_loader">
          <Loader v-for="(number, index) in 3" :key="index" class="" />
        </div>
        <div v-else>
          <div v-if="AuthResponse" class="text-sm md:p-3 p-2">
            <div class="flex items-center py-2">
              <div>
                <span>Full name :</span>
              </div>
              <div class="px-1 text-gray-500">
                <span> {{ AuthResponse.first_name }} {{ AuthResponse.last_name }}</span>
              </div>
            </div>
            <div class="flex items-center py-2">
              <div><span> Email :</span></div>
              <div class="px-1 text-gray-500">
                <span>{{ AuthResponse.email }}</span>
              </div>
            </div>
            <div class="flex items-center py-2">
              <div><span> Phone number :</span></div>
              <div class="px-1 text-gray-500">
                <span>{{ AuthResponse.phone_number }}</span>
              </div>
            </div>
            <div class="flex items-center py-2">
              <div><span> State :</span></div>
              <div class="px-1 text-gray-500">
                <span>{{ JSON.parse(AuthResponse.state).state }}</span>
              </div>
            </div>
            <div class="flex items-center py-2">
              <div>
                <span>Home address :</span>
                <span class="px-1 text-gray-500">{{ AuthResponse.home_address }}</span>
              </div>
            </div>
          </div>
          <!-- info -->
          <LittleInfo class="px-2 py-3" :text="`Go to Edit profile to update profile details`" />
        </div>
      </DashboardCard>
      <!-- shipping default -->
      <DashboardCard>
        <DashboardCardHeader class="p-2">
          <div class="flex justify-between">
            <div>
              <span class="font2 text-sm">Default shipping address</span>
            </div>
            <div title="Edit shipping address">
              <Check />
            </div>
          </div>
        </DashboardCardHeader>

        <div class="p-2" v-if="text_loader">
          <Loader v-for="(number, index) in 3" :key="index" class="" />
        </div>
        <div v-else>
          <div v-if="DefaultAddress === null" class="">
            <NoData :text="`Go to your Address Book to update your default shipping Address`" />
          </div>
          <div v-else class="text-sm md:p-3 p-2">
            <div>
              <div class="flex items-center py-2">
                <div>
                  <span>Recipient : </span>
                </div>
                <div class="px-1 text-gray-500">
                  <span>{{ DefaultAddress.first_name + ' ' + DefaultAddress.last_name }}</span>
                </div>
              </div>

              <div class="flex items-center py-2">
                <div><span> Phone number :</span></div>
                <div class="px-1 text-gray-500">
                  <span>{{ DefaultAddress.phone_number }}</span>
                </div>
              </div>
              <div class="flex items-center py-2">
                <div><span> State :</span></div>
                <div class="px-1 text-gray-500">
                  <span>{{ parseJsons(DefaultAddress.state)?.state }}</span>
                </div>
              </div>
              <div class="flex items-center py-2">
                <div><span> Lga :</span></div>
                <div class="px-1 text-gray-500">
                  <span>{{ parseJsons(DefaultAddress.city) }}</span>
                </div>
              </div>
              <div class="py-2">
                <div>
                  <span>Home address :</span
                  ><span class="px-1 text-gray-500">{{ DefaultAddress.delivery_address }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardCard>
    </AdressCardGrid>
  </div>
</template>

<script setup>
import Loader from '@/components/loaders/text_loader.vue'
import DashTitleSlot from '@/components/slots/DashboardTitle.vue'
import Check from '@/assets/svg/check.vue'
import EditIcon from '@/assets/svg/edit.vue'
import NoData from '@/components/extras/noData.vue'
import LittleInfo from '@/components/extras/littleInfo.vue'
import DashboardCard from '@/components/slots/DashboardCard.vue'
import DashboardCardHeader from '@/components/slots/DashboardCardHeader.vue'
import AdressCardGrid from '@/components/slots/AdressCardGrid.vue'
import Title from '@/components/Dashboard/DashboardTitles.vue'
import { ref, onMounted, computed } from 'vue'
import { useShippingAddressStore } from '@/stores/shipping_address'
import { useUpdateUserStore } from '@/stores/Update_user'
import { storeToRefs } from 'pinia'

const text_loader = ref(true)
const store = useShippingAddressStore()
const userStore = useUpdateUserStore()
const { DefaultAddress } = storeToRefs(store)
const { AuthResponse } = storeToRefs(userStore)

const getUser = async () => {
  text_loader.value = true
  try {
    await userStore.GetUser()
  } catch (error) {
    console.error('Error:', error)
  } finally {
    text_loader.value = false
  }
}
const getDefaultAddress = async () => {
  text_loader.value = true
  try {
    await store.GetDefaultAdress()
  } catch (error) {
    console.error('Error:', error)
  } finally {
    text_loader.value = false
  }
}

const parseJsons = (data) => {
  try {
    return JSON.parse(data)
  } catch (e) {
    return null
  }
}

onMounted(() => {
  getDefaultAddress()
  parseJsons()
  getUser()
})
</script>

<style scoped></style>
