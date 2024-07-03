<template>
  <div class="font">
    <CheckOutCard>
      <!-- title -->
      <CheckOutCardTitle>
        <div>
          <div class="font2 text-xs sm:text-[0.9rem]">
            <span>Shipping Address</span>
          </div>
          <div class="font2">
            <LittleInfo class="pt-2 text-black" :text="`Select your preferred Shipping address `" />
          </div>
        </div>
        <div>
          <img src="@/assets/icon/truck-long-svgrepo-com.svg" class="w-[30px]" alt="" />
        </div>
      </CheckOutCardTitle>
      <!-- address -->
      <div v-for="(item, index) in ShippingAddresses" :key="index" class="flex w-full mt-4 p-2">
        <div class="">
          <input id="specifyColor" type="radio" name="" />
        </div>
        <div class="flex w-full justify-between items-center">
          <div class="px-2">
            <!-- name -->
            <div class="font-black font2 text-xs sm:text-[0.9rem]">
              <span>Jesutobi Joseph</span>
            </div>
            <!-- address -->
            <div class="py-2 text-gray-500">
              <span>92 Dapo Awotesu St, Maitama, Abuja 901101, Federal Capital Territory</span>
            </div>
            <!-- phone number -->
            <div class="text-gray-500 text-xs">
              <span>08143400267</span>
            </div>
            <div class="text-green-600 text-xs pt-1">
              <span>Default shipping address</span>
            </div>
          </div>
          <div title="Edit shipping address">
            <Check />
          </div>
        </div>
      </div>
      <div class="flex w-full mt-4 p-2">
        <div class="">
          <input id="specifyColor" type="radio" name="" />
        </div>
        <div class="flex w-full justify-between items-center">
          <div class="px-2">
            <!-- name -->
            <div class="font-black font2 text-xs sm:text-[0.9rem]">
              <span>Jesutobi Joseph</span>
            </div>
            <!-- address -->
            <div class="py-2 text-gray-500">
              <span>92 Dapo Awotesu St, Maitama, Abuja 901101, Federal Capital Territory</span>
            </div>
            <!-- phone number -->
            <div class="text-gray-500 text-xs">
              <span>08143400267</span>
            </div>
            <div class="text-green-600 text-xs pt-1">
              <span>Set as default address</span>
            </div>
          </div>
          <!-- <div title="Edit shipping address">
            <Check />
          </div> -->
        </div>
      </div>
      <!-- add new address -->
      <div class="p-2 flex justify-end">
        <button class="underline decoration-solid font2 p-1 text-xs">
          <span>Add new address</span>
        </button>
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
          <input id="specifyColor" type="radio" name="" />
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
import { onMounted, ref } from 'vue'

const store = useShippingAddressStore()
const ShippingAddresses = ref([])

const getShippingAddress = () => {
  store.GetShippingAdress()
  ShippingAddresses.value = store.ShippingAddresses
  console.log(ShippingAddresses.value)
}

onMounted(() => {
  getShippingAddress()
})
</script>
<style scoped>
#specifyColor {
  accent-color: black;
}
</style>
