<template>
  <div class="font">
    <div>
      <Detailheader />
    </div>
    <div>
      <DetailCards />
    </div>
  </div>
</template>

<script setup>
import DetailCards from '@/components/Orders/order_detail_cards.vue'
import Detailheader from '@/components/Orders/order_detail_header.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useOrdersStore } from '@/stores/orders'

const route = useRoute()
const orderStore = useOrdersStore()

const getOrderDetail = () => {
  orderStore.GetSingleOrderDetail(route.params.id)
}

onMounted(() => {
  getOrderDetail()
})
</script>

<style></style>
