<template>
  <div>
    <div class="flex py-2" v-for="(data, index) in productReview?.data?.reviews" :key="index">
      <div>
        <UserCircle>
          <span class="text-black">{{ data.user.first_name.charAt(0) }}</span>
        </UserCircle>
      </div>
      <div>
        <div class="px-2 text-sm">
          <!--name of user that dropped the review -->
          <div class="p-0">
            <span class="font2">{{ data.user.first_name + ' ' + data.user.last_name }}</span>
          </div>
          <!-- rating -->
          <div class="flex items-center">
            <div class="px-1">
              <span class="font2" style="color: #04a431">{{ data.rating }} . </span>
            </div>
            <div v-for="(star, index) in data.rating" :key="index">
              <img src="@/assets/icon/greenStar.svg" style="width: 13px" alt="" />
            </div>
          </div>
          <!-- message -->
          <div class="text-[0.8rem] py-1">
            <span>{{ data.content }}</span>
          </div>
          <!-- date -->
          <div class="text-xs" style="color: #04a431">
            <span>{{ formatDate(data.created_at) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useProduct } from '@/stores/product'
import { useFormatDate } from '../../composables/formatDate'

import UserCircle from '@/components/slots/UserCircle.vue'
import Icon from '@/components/slots/UserCircle.vue'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

const store = useProduct()
const { productReview } = storeToRefs(store)

const props = defineProps({
  Data: Array
})

const { formatDate } = useFormatDate()

const product_review = props.Data
</script>
<style scoped></style>
