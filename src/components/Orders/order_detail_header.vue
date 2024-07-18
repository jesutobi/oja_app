<template>
  <div>
    <DashTitleSlot>
      <div>
        <!-- order id -->
        <div class="text-sm md:text-[0.975rem]">
          <span>Order Id: </span><span class="font2">{{ singleOrderDetail.order_code }}</span>
        </div>
        <div class="text-xs pt-2 text-gray-500 flex items-center">
          <div>
            <span><img src="@/assets/icon/calender.svg" class="w-[12px]" alt="" /></span>
          </div>
          <div class="ps-1">
            <span
              >{{ formatDate(singleOrderDetail.created_at) }} at
              {{ formatTime(singleOrderDetail.created_at) }}</span
            >
          </div>
        </div>
      </div>
      <div class="flex item-center gap-2">
        <!-- order_status -->
        <div>
          <span
            :class="{
              yellowBadge: singleOrderDetail.order_status === 'pending',
              greebBadge: singleOrderDetail.order_status === 'delivered'
            }"
            class="p-1 text-[0.7rem] rounded-lg"
            >{{ singleOrderDetail.order_status }}</span
          >
        </div>
        <!-- payment_status -->
        <div>
          <span
            :class="{
              redBadge: singleOrderDetail.payment_status === 'unpaid',
              greenBadge: singleOrderDetail.payment_status === 'paid'
            }"
            class="p-1 text-[0.7rem] rounded-lg"
            >{{ singleOrderDetail.payment_status }}</span
          >
        </div>
      </div>
    </DashTitleSlot>
  </div>
</template>
<script setup>
import DashTitleSlot from '@/components/slots/DashboardTitle.vue'
import { useFormatDate } from '@/composables/formatDate.js'
import { useOrdersStore } from '@/stores/orders'
import { storeToRefs } from 'pinia'

const orderStore = useOrdersStore()
const { formatDate, formatTime } = useFormatDate()
const { singleOrderDetail } = storeToRefs(orderStore)
</script>
<style></style>
