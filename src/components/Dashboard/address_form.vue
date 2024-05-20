<template>
  <div>
    <!-- header -->
    <div>
      <Title :text="`Add shipping address`" />
    </div>
    <!-- form space -->
    <div>
      <form @submit.prevent="update">
        <div class="max-[992px]:flex justify-center">
          <div class="w-[80%] max-[568px]:w-[95%]">
            <!-- first name , last name -->
            <div class="lg:flex items-center gap-4">
              <div class="w-full">
                <div class="mt-6 w-full relative group">
                  <input
                    v-model="shipping_details.first_name"
                    name="floating_First_name"
                    id="floating_First_name"
                    class="block rounded-2xl p-[1.1rem] w-full border-gray-400 text-gray-400 border text-sm appearance-none focus:ring-0 peer"
                    placeholder=" "
                  />
                  <label
                    for="floating_First_name"
                    class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-gray-500 dark:text-gray-400 top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                    >First name
                  </label>
                </div>
              </div>
              <div class="w-full">
                <div class="mt-6 w-full relative group">
                  <input
                    v-model="shipping_details.last_name"
                    name="floating_Last_name"
                    id="floating_Last_name"
                    class="block rounded-2xl p-[1.1rem] w-full border-gray-400 text-gray-400 border text-sm appearance-none focus:ring-0 peer"
                    placeholder=" "
                  />
                  <label
                    for="floating_Last_name"
                    class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-gray-500 dark:text-gray-400 top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                    >Last name
                  </label>
                </div>
              </div>
            </div>

            <!-- email , Phone number -->
            <div class="lg:flex items-center gap-4">
              <div class="w-full">
                <!-- email -->
                <div class="mt-5 w-full relative group">
                  <input
                    readonly
                    name="floating_email"
                    id="floating_email"
                    class="block rounded-2xl p-[1.1rem] w-full border-gray-400 text-gray-400 border text-sm appearance-none focus:ring-0 peer"
                    placeholder=" "
                  />
                  <label
                    for="floating_email"
                    class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-gray-500 dark:text-gray-400 top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                    >Email
                  </label>
                </div>
                <div>
                  <Info :text="`You don't have access to update your email`" />
                </div>
              </div>
              <!-- phone number -->
              <div class="w-full">
                <div class="mt-5 w-full relative group">
                  <input
                    v-model="shipping_details.phone_number"
                    name="floating_phone_number"
                    id="floating_phone_number"
                    class="block rounded-2xl p-[1.1rem] w-full border-gray-400 text-gray-400 border text-sm appearance-none focus:ring-0 peer"
                    placeholder=" "
                  />
                  <label
                    for="floating_phone_number"
                    class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-gray-500 dark:text-gray-400 top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                    >Phone number
                  </label>
                </div>
              </div>
            </div>
            <!-- state , city -->
            <div class="lg:flex items-center gap-4">
              <!-- email -->

              <div class="w-full">
                <div class="mt-5 w-full relative group">
                  <select
                    @change="getCities"
                    v-model="shipping_details.states"
                    name="floating_state"
                    id="floating_state"
                    class="block rounded-2xl p-[1.1rem] w-full border-gray-400 text-gray-400 border text-sm focus:ring-0 peer"
                  >
                    <option
                      for="floating_state"
                      class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-gray-500 dark:text-gray-400 top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                      value="select state"
                    >
                      select state
                    </option>
                    <option v-for="(item, index) in states" :key="index" :value="item">
                      {{ item.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="w-full">
                <!-- select city -->
                <div class="mt-5 w-full relative group">
                  <select
                    v-model="shipping_details.city"
                    name="floating_city"
                    id="floating_city"
                    class="block rounded-2xl p-[1.1rem] w-full border-gray-400 text-gray-400 border text-sm focus:ring-0 peer"
                  >
                    <option
                      for="floating_city"
                      class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-gray-500 dark:text-gray-400 top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                      value=""
                    >
                      select city
                    </option>
                    <option v-for="(item, index) in cities" :key="index" :value="item.name">
                      {{ item.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="w-full">
              <!--Delivery address-->
              <div class="mt-5 w-full relative group">
                <input
                  v-model="shipping_details.delivery_address"
                  name="floating_delivery_address"
                  id="floating_delivery_address"
                  class="block rounded-2xl p-[1.1rem] w-full border-gray-400 text-gray-400 border text-sm appearance-none focus:ring-0 peer"
                  placeholder=" "
                />
                <label
                  for="floating_delivery_address"
                  class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-gray-500 dark:text-gray-400 top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                  >Delivery address
                </label>
              </div>
            </div>
            <div class="w-full">
              <!-- Additional information -->
              <div class="mt-5 w-full relative group">
                <input
                  v-model="shipping_details.add_information"
                  name="floating_add_information"
                  id="floating_add_information"
                  class="block rounded-2xl p-[1.1rem] w-full border-gray-400 text-gray-400 border text-sm appearance-none focus:ring-0 peer"
                  placeholder=" "
                />
                <label
                  for="floating_add_information"
                  class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-gray-500 dark:text-gray-400 top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                  >Additional information
                </label>
              </div>
            </div>
            <!-- subnit button -->

            <div class="flex justify-center py-5">
              <AuthButtons @click="update" class="w-[50%] pt-[4rem]">
                <span>Save Changes</span>
              </AuthButtons>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import AuthButtons from '../../components/slots/AuthButtons.vue'
import Title from '@/components/Dashboard/DashboardTitles.vue'
import { useStatesStore } from '@/stores/States'
import { onMounted, ref } from 'vue'

const store = useStatesStore()
const states = ref({})
const cities = ref([])
const shipping_details = ref({
  states: {},
  city: '',
  delivery_address: '',
  first_name: '',
  last_name: '',
  phone_number: '',
  add_information: ''
})
console.log(shipping_details.value.states)

const getStates = () => {
  store.GetStates().then((response) => {
    states.value = response.data
    console.log(response)
  })
}
const getCities = () => {
  console.log(shipping_details)
  store.getCities(shipping_details.value.states).then((response) => {
    cities.value = response.data
  })
}

onMounted(() => {
  getStates()
})
</script>

<style scoped></style>
