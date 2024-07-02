<template>
  <div class="">
    <!-- header -->
    <CheckOutCardTitle>
      <div>
        <Title :text="`Account Overview`" />
      </div>
      <div>
        <img src="@/assets/icon/user-svgrepo-com.svg" style="width: 23px" />
      </div>
    </CheckOutCardTitle>

    <!-- my details and default shipping details -->
    <AdressCardGrid>
      <!-- my details -->
      <DashboardCard>
        <DashboardCardHeader>
          <div class="flex justify-between">
            <div>
              <span class="font2 text-sm">Profile Details</span>
            </div>
            <div class="cursor-pointer">
              <router-link to="/dashboard/edit-profile"> <EditIcon /></router-link>
            </div>
          </div>
        </DashboardCardHeader>

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
            <div v-if="state" class="px-1 text-gray-500">
              <span>{{ state.name }}</span>
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
        <LittleInfo class="px-2 py-3" :text="`Go to Edit profile to update profile details`" />
      </DashboardCard>
      <!-- shipping default -->
      <DashboardCard>
        <DashboardCardHeader>
          <div class="flex justify-between">
            <div>
              <span class="font2 text-sm">Default shipping address</span>
            </div>
            <div title="Edit shipping address">
              <Check />
            </div>
          </div>
        </DashboardCardHeader>

        <div v-if="AddressData === null" class="">
          <NoData :text="`Go to your Address Book to update your default shipping Address`" />
        </div>
        <div v-else class="text-sm md:p-3 p-2">
          <div>
            <div class="flex items-center py-2">
              <div>
                <span>Recipient : </span>
              </div>
              <div class="px-1 text-gray-500">
                <span>{{ AddressData.first_name + ' ' + AddressData.last_name }}</span>
              </div>
            </div>

            <div class="flex items-center py-2">
              <div><span> Phone number :</span></div>
              <div class="px-1 text-gray-500">
                <span>{{ AddressData.phone_number }}</span>
              </div>
            </div>
            <div class="flex items-center py-2">
              <div><span> State :</span></div>
              <div class="px-1 text-gray-500">
                <span>{{ addressState.name }}</span>
              </div>
            </div>
            <div class="flex items-center py-2">
              <div><span> City :</span></div>
              <div class="px-1 text-gray-500">
                <span>{{ addressCity.name }}</span>
              </div>
            </div>
            <div class="flex items-center py-2">
              <div><span>Home address :</span></div>
              <div class="px-1 text-gray-500">
                <span>{{ AddressData.delivery_address }}</span>
              </div>
            </div>
          </div>
        </div>
      </DashboardCard>
    </AdressCardGrid>
  </div>
</template>

<script setup>
import CheckOutCardTitle from '@/components/slots/CheckOutCardTitle.vue'
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

const user_data = ref({})
const state = ref('')
const addressState = ref('')
const addressCity = ref('')
const store = useShippingAddressStore()
const userStore = useUpdateUserStore()
const AddressData = ref([])

const GetShippingAdress = () => {
  store.GetShippingAdress().then((response) => {
    AddressData.value = response.data.data
    state.value = JSON.parse(response.data.state)
    console.log(response)
  })
}
const getDefaultAddress = () => {
  store.GetDefaultAdress().then((response) => {
    AddressData.value = response.data.data
    addressState.value = JSON.parse(response.data.data.state)
    addressCity.value = JSON.parse(response.data.data.city)
  })
}

const getData = async () => {
  userStore.GetUser().then((response) => {
    user_data.value = response.data
    state.value = JSON.parse(response.data.state)
    console.log('nirv', response)
  })
}

onMounted(() => {
  getData(), GetShippingAdress(), getDefaultAddress()
})
</script>

<style scoped></style>
