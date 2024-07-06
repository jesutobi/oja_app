<template>
  <div class="font">
    <CheckOutCard>
      <!-- title -->
      <CheckOutCardTitle>
        <div>
          <div class="font2 text-xs sm:text-[0.9rem]">
            <span>Shipping Address</span>
          </div>
          <div class="">
            <LittleInfo
              class="pt-2 text-black"
              :text="`You can only select a  Default Shipping address `"
            />
          </div>
        </div>
        <div>
          <img src="@/assets/icon/truck-long-svgrepo-com.svg" class="w-[30px]" alt="" />
        </div>
      </CheckOutCardTitle>
      <!-- address -->
      <div
        v-for="(item, index) in prioritizedShippingAddresses"
        :key="index"
        class="flex w-full mt-4 p-2"
      >
        <div class="">
          <input id="specifyColor" type="radio" name="" :disabled="item.is_default === 0" />
        </div>
        <div class="flex w-full justify-between items-center">
          <div class="px-2">
            <!-- name -->
            <div class="font-black font2 text-xs sm:text-[0.9rem]">
              <span>{{ item.first_name + ' ' + item.last_name }}</span>
            </div>
            <!-- address -->
            <div class="py-2 text-gray-500">
              <span>{{ item.delivery_address }}</span>
            </div>
            <!-- phone number -->
            <div class="text-gray-500 text-xs">
              <span>{{ item.phone_number }}</span>
            </div>
            <div v-if="item.is_default === 1" class="text-green-600 text-xs pt-1">
              <span>Default shipping address</span>
            </div>
            <div
              @click="setAsDefault(item.id)"
              v-if="item.is_default === 0"
              class="text-green-600 underline text-xs pt-1 cursor-pointer"
            >
              <span>Set as default address</span>
            </div>
          </div>
          <div v-if="item.is_default === 1">
            <Check />
          </div>
        </div>
      </div>

      <!-- add new address -->
      <div class="p-2 flex justify-end">
        <router-link to="/dashboard/address-form">
          <button class="underline decoration-solid font2 p-1 text-xs">
            <span>Add new address</span>
          </button></router-link
        >
      </div>
    </CheckOutCard>
    <CheckOutCard>
      <!-- title -->
      <CheckOutCardTitle>
        <div>
          <div class="font2 text-xs sm:text-[0.9rem]">
            <span>Payment Method</span>
          </div>
          <div class="font2">
            <LittleInfo class="pt-2 text-black" :text="`Select your preferred Payment method `" />
          </div>
        </div>
        <div>
          <img src="@/assets/icon/cash-dollar-flow-svgrepo-com.svg" class="w-[30px]" alt="" />
        </div>
      </CheckOutCardTitle>
      <!-- address -->
      <div class="flex w-full mt-4 p-2">
        <div class="">
          <input
            @change="emitInputValue"
            id="specifyColor"
            v-model="payWith"
            type="radio"
            value="PayStack"
            name=""
          />
        </div>

        <div class="px-2">
          <!-- name -->
          <div class="font-black font2 text-xs">
            <span>Pay With</span>
          </div>
          <!-- address -->
          <div class="py-2">
            <img src="@/assets/icon/Paystack_idSL4BuSLF_2.svg" class="w-[100px]" alt="" />
          </div>
        </div>
      </div>
    </CheckOutCard>
  </div>
</template>
<script setup>
import LittleInfo from '@/components/extras/littleInfo.vue'
import Check from '@/assets/svg/check.vue'
import CheckOutCard from '@/components/slots/CheckOutCards.vue'
import CheckOutCardTitle from '@/components/slots/CheckOutCardTitle.vue'
import { useShippingAddressStore } from '@/stores/shipping_address'
import { computed, onMounted, ref } from 'vue'
import { useSetDefault } from '../../composables/setAsDefault'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const store = useShippingAddressStore()
const ShippingAddresses = ref([])
const { setAsDefault } = useSetDefault()
const payWith = ref('')
const emit = defineEmits(['pay_with_PayStack'])

const getShippingAddress = () => {
  store.GetShippingAdress()
  ShippingAddresses.value = store.ShippingAddresses
}

const prioritizedShippingAddresses = computed(() => {
  // getShippingAddress()
  const defaultAddress = ShippingAddresses.value.find((item) => item.is_default == 1)
  const otherAddresses = ShippingAddresses.value.filter((item) => item.is_default != 1)
  const prioritized = defaultAddress ? [defaultAddress, ...otherAddresses] : otherAddresses

  return prioritized.slice(0, 2)
})

const emitInputValue = (value) => {
  emit('pay_with_PayStack', payWith.value)
}

onMounted(() => {
  getShippingAddress(), prioritizedShippingAddresses
})
</script>

<style scoped>
#specifyColor {
  accent-color: black;
}
</style>
