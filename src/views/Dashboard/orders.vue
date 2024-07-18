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
    <div v-if="orders.length === 0" class="">
      <NoData :text="`You have no active orders`" />
    </div>
    <div>
      <OrderList />
    </div>
  </div>
</template>
<script setup>
import NoData from '@/components/extras/noData.vue'
import OrderList from '@/components/Orders/order_list.vue'
import DashTitleSlot from '@/components/slots/DashboardTitle.vue'
import Title from '@/components/Dashboard/DashboardTitles.vue'
import { useOrdersStore } from '@/stores/orders'
import { storeToRefs } from 'pinia'

const orderStore = useOrdersStore()
const { orders } = storeToRefs(orderStore)
</script>
<style scoped></style>
