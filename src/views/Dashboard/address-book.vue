<template>
  <div>
    <div>
      <!-- header -->

      <DashTitleSlot>
        <div class="flex items-center">
          <div>
            <Title :text="`Address Book`" />
          </div>
          <div>
            <img src="../../../public/icon/address-book.svg" style="width: 20px" />
          </div>
        </div>
        <div class="">
          <router-link to="/dashboard/address-form">
            <button class="flex items-center text-black text-[0.8rem]">
              <div class="font-black underline">
                <span>Add new address</span>
              </div>
              <div class="px-2">
                <Plus :color="`#00000`" />
              </div>
            </button>
          </router-link>
        </div>
      </DashTitleSlot>
      <div v-if="text_loader">
        <Loader v-for="(number, index) in 1" :key="index" />
      </div>
      <div v-else>
        <div v-if="ShippingAddresses.length <= 0" class="">
          <NoData :text="`You have no active shipping address`" />
        </div>
        <div v-else>
          <AddressCard />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Loader from '@/components/loaders/order_card.vue'
import DashTitleSlot from '@/components/slots/DashboardTitle.vue'
import IconHover from '@/components/slots/iconHover.vue'
import Plus from '@/assets/svg/plus.vue'
import Title from '@/components/Dashboard/DashboardTitles.vue'
import AddressCard from '@/components/Dashboard/address_display.vue'
import { useShippingAddressStore } from '@/stores/shipping_address'
import { onMounted, ref } from 'vue'
import NoData from '@/components/extras/noData.vue'
import { storeToRefs } from 'pinia'

const text_loader = ref(true)
const AddressData = ref([])
const store = useShippingAddressStore()
const { ShippingAddresses } = storeToRefs(store)

const GetShippingAdress = async () => {
  text_loader.value = true
  try {
    await store.GetShippingAdress()
  } catch (error) {
    console.error('Error:', error)
  } finally {
    text_loader.value = false
  }
}

onMounted(() => {
  GetShippingAdress()
})
</script>

<style></style>
