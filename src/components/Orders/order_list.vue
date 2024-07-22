<template>
  <div>
    <div>
      <!-- filter box -->
      <div v-if="orders.length > 0" class="inline-block float-end justify-end py-4 relative group">
        <div class="group-hover:block cursor-pointer">
          <div class="flex items-center rounded-lg bg-white shadow p-2">
            <div class="text-[0.8rem] font2">
              <span>Order status</span>
            </div>
            <div title="view details" class="ps-2">
              <img src="@/assets/icon/hamburger-menu-dots.svg" class="w-[14px]" alt="" />
            </div>
          </div>
        </div>
        <div
          class="group-hover:block hidden absolute -bottom-[7rem] right-0 z-10 mt-2 w-56 rounded-lg bg-white shadow"
          role="menu"
        >
          <div class="py-1" role="none">
            <div
              class="px-4 py-2 my-1 mx-2 text-sm hover:rounded-lg hover:bg-yellow-400/25 text-gray-700"
            >
              <span>All Order</span>
            </div>
            <div class="px-4 py-2 text-sm text-gray-700">
              <span>Pending</span>
            </div>
            <div class="px-4 py-2 text-sm text-gray-700">
              <span>Success</span>
            </div>
          </div>
        </div>
      </div>

      <AdressCardGrid class="clear-both">
        <DashboardCard v-for="(item, index) in orders" :key="index">
          <DashboardCardHeader class="p-2">
            <div class="flex items-center justify-between">
              <div class="font2 text-[0.8rem]">
                <span>{{ item.order_code }} </span>
              </div>
              <div>
                <span
                  :class="{
                    yellowBadge: item.order_status === 'pending',
                    greebBadge: item.order_status === 'delivered'
                  }"
                  class="p-1 text-[0.7rem] rounded-lg"
                  >{{ item.order_status }}</span
                >
              </div>
            </div>
          </DashboardCardHeader>
          <router-link :to="`order-detail/${item.id}`">
            <div class="p-2" v-if="item.order_items">
              <div v-for="(data, index) in item.order_items.splice(0, 1)" :key="index" class="flex">
                <!-- image -->
                <div class="">
                  <img
                    loading="lazy"
                    @load="onImageLoad"
                    :src="`${baseURL}/storage/${data.product.images[0].image_path}`"
                    class="object-cover rounded-lg h-[90px] w-[95px]"
                    :class="{
                      'skeleton-loader animate-skeleton bg-slate-400/10': isLoaded
                    }"
                    alt=""
                  />
                </div>
                <!-- details -->
                <div class="p-2">
                  <!-- product title -->
                  <div class="productFont text-xs sm:text-sm">
                    <span
                      >{{
                        data.product.product_title
                          .toString()
                          .replace(/(<([^>]+)>)/gi, '')
                          .substring(0, 42)
                      }}
                    </span>
                  </div>
                  <!-- product brand -->
                  <div class="font2 py-1 text-yellow-600 text-xs">
                    <span>{{ data.product.product_brand }} </span>
                  </div>

                  <!-- product features -->
                  <div class="py-1">
                    <ul class="list-disc px-2 py-1 text-xs">
                      <li>
                        <span>Quantity</span>

                        <span class="font-black"> : {{ data.product_quantity }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <!-- details -->
              <div class="flex items-center pt-1 justify-between">
                <!-- price -->
                <div class="text-[0.78rem]">
                  <span class="productFont">&#8358;{{ formatPrice(item.total_amount) }}</span>
                  <span class="text-gray-500 ps-1">[{{ item.total_item }} item</span
                  ><span class="text-gray-500" v-if="item.total_item > 1">s</span>
                  <span class="text-gray-500">]</span>
                </div>
                <div title="view details" class="flex items-center">
                  <div
                    v-if="item.payment_status === 'unpaid'"
                    @click="DeleteOrders(item.id)"
                    class="cursor-pointer"
                    title="DeleteOrders"
                  >
                    <Trash />
                  </div>
                  <div class="cursor-pointer">
                    <router-link :to="`order-detail/${item.id}`">
                      <img src="@/assets/icon/hamburger-menu-dots.svg" class="w-[14px]" alt=""
                    /></router-link>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </DashboardCard>
      </AdressCardGrid>
    </div>
  </div>
</template>

<script setup>
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import Trash from '@/assets/svg/trash.vue'
import DashboardCard from '@/components/slots/DashboardCard.vue'
import DashboardCardHeader from '@/components/slots/DashboardCardHeader.vue'
import AdressCardGrid from '@/components/slots/AdressCardGrid.vue'
import { useFormatPrice } from '../../composables/formatPrice'
import { useOrdersStore } from '@/stores/orders'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const orderStore = useOrdersStore()
const { orders } = storeToRefs(orderStore)
const { formatPrice } = useFormatPrice()
const baseURL = ref('http://localhost:8000')
const isLoaded = ref(false)

const onImageLoad = () => {
  isLoaded.value = true
}

const getOrders = () => {
  orderStore.GetOrders()
}
const DeleteOrders = (value) => {
  orderStore.DeleteOrderDetail(value)
  toast('Order deleted succesfully', {
    theme: 'colored',
    type: 'success',
    autoClose: 1000,
    transition: 'slide',
    dangerouslyHTMLString: true
  })
}

onMounted(() => {
  getOrders(), onImageLoad()
})
</script>

<style scoped></style>
