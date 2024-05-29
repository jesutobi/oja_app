<template>
  <div>
    <div>
      <!-- header -->
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div>
            <Title :text="`Address Book`" />
          </div>
          <div>
            <img src="../../../public/icon/address-book.svg" style="width: 23px" />
          </div>
        </div>
        <div class="">
          <IconHover>
            <router-link to="/dashboard/address-form">
              <button
                class="rounded-xl p-2 flex items-center text-white hover:bg-black bg-black text-[0.8rem]"
              >
                <div>
                  <span>Add new address</span>
                </div>
                <div class="px-2">
                  <Plus :color="`#FFFFFF`" />
                </div>
              </button>
            </router-link>
          </IconHover>
        </div>
      </div>

      <div v-if="AddressData == ''" class="">
        <NoData :text="`You have no active shipping address`" />
      </div>
      <div v-else>
        <AddressCard />
      </div>
    </div>
  </div>
</template>

<script setup>
import IconHover from '@/components/slots/iconHover.vue'
import Plus from '@/assets/svg/plus.vue'
import Title from '@/components/Dashboard/DashboardTitles.vue'
import AddressCard from '@/components/Dashboard/address_display.vue'
import { useShippingAddressStore } from '@/stores/shipping_address'
import { onMounted, ref } from 'vue'
import NoData from '@/components/extras/noData.vue'

const AddressData = ref([])
const store = useShippingAddressStore()

const GetShippingAdress = () => {
  store.GetShippingAdress().then((response) => {
    AddressData.value = response.data.data
    console.log(response)
  })
}

onMounted(() => {
  GetShippingAdress()
})
</script>

<style></style>
