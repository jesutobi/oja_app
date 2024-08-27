<template>
  <div>
    <DashTitleSlot>
      <div>
        <Title :text="`My Orders`" />
      </div>
      <div>
        <img src="@/assets/icon/bag.svg" style="width: 23px" />
      </div>
    </DashTitleSlot>
    <div v-if="text_loader">
      <Loader v-for="(number, index) in 1" :key="index" />
    </div>
    <div v-else>
      <div v-if="orders.length === 0" class="">
        <NoData :text="`You have no active orders`" />
      </div>
      <div>
        <OrderList />
      </div>
    </div>
  </div>
</template>
<script setup>
import Loader from '@/components/loaders/order_card.vue'
import NoData from '@/components/extras/noData.vue'
import OrderList from '@/components/Orders/order_list.vue'
import DashTitleSlot from '@/components/slots/DashboardTitle.vue'
import Title from '@/components/Dashboard/DashboardTitles.vue'
import { useOrdersStore } from '@/stores/orders'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const text_loader = ref(true)
const orderStore = useOrdersStore()
const { orders } = storeToRefs(orderStore)

const getOrders = async () => {
  text_loader.value = true
  try {
    await orderStore.GetOrders()
  } catch (error) {
    console.error('Error:', error)
  } finally {
    text_loader.value = false
  }
}

onMounted(() => {
  getOrders()
})
</script>
<style scoped></style>
