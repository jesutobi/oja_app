<template>
  <div>
    <!-- header -->

    <DashTitleSlot v-if="$route.path === '/dashboard/address-form'">
      <div>
        <Title :text="`Add shipping address`" />
      </div>
      <div>
        <img src="../../../public/icon/address-book.svg" style="width: 23px" />
      </div>
    </DashTitleSlot>
    <DashTitleSlot v-else>
      <div>
        <Title :text="`Edit shipping address`" />
      </div>
      <div>
        <img src="../../../public/icon/address-book.svg" style="width: 23px" />
      </div>
    </DashTitleSlot>
    <!-- form space -->
    <div>
      <form @submit.prevent="addShippingAddress">
        <div class="">
          <div class="">
            <!-- first name , last name -->
            <div class="lg:flex items-center gap-4">
              <div class="w-full">
                <div class="mt-6 w-full relative group">
                  <input
                    v-model="shipping_details.first_name"
                    name="floating_First_name"
                    id="floating_First_name"
                    class="block bg-white rounded-2xl p-[1.1rem] w-full border-gray-200 text-gray-400 border text-sm appearance-none focus:ring-0 peer"
                    placeholder=" "
                  />
                  <label
                    for="floating_First_name"
                    class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-gray-500 dark:text-gray-400 top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                    >First name*
                  </label>
                </div>
              </div>
              <div class="w-full">
                <div class="mt-6 w-full relative group">
                  <input
                    v-model="shipping_details.last_name"
                    name="floating_Last_name"
                    id="floating_Last_name"
                    class="block rounded-2xl p-[1.1rem] w-full border-gray-200 text-gray-400 border text-sm appearance-none focus:ring-0 peer"
                    placeholder=" "
                  />
                  <label
                    for="floating_Last_name"
                    class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-gray-500 dark:text-gray-400 top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                    >Last name*
                  </label>
                </div>
              </div>
            </div>

            <!-- phone number -->
            <div class="w-full flex items-center gap-4">
              <div class="mt-5 w-full relative group">
                <input
                  v-model="shipping_details.phone_number"
                  name="floating_phone_number"
                  id="floating_phone_number"
                  class="block rounded-2xl p-[1.1rem] w-full border-gray-200 text-gray-400 border text-sm appearance-none focus:ring-0 peer"
                  placeholder=" "
                />
                <label
                  for="floating_phone_number"
                  class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-gray-500 dark:text-gray-400 top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                  >Phone number*
                </label>
              </div>
              <!--Delivery address-->
              <div class="mt-5 w-full relative group">
                <input
                  v-model="shipping_details.delivery_address"
                  name="floating_delivery_address"
                  id="floating_delivery_address"
                  class="block rounded-2xl p-[1.1rem] w-full border-gray-200 text-gray-400 border text-sm appearance-none focus:ring-0 peer"
                  placeholder=" "
                />
                <label
                  for="floating_delivery_address"
                  class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-gray-500 dark:text-gray-400 top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                  >Delivery address*
                </label>
              </div>
            </div>
          </div>

          <!-- state , city -->
          <div class="lg:flex items-center gap-4">
            <!-- email -->

            <div class="w-full">
              <div class="mt-5 relative group">
                <select
                  @change="getCities(shipping_details.state)"
                  v-model="shipping_details.state"
                  name="floating_state"
                  id="floating_state"
                  class="block rounded-2xl p-[1.1rem] w-full border-gray-200 text-gray-400 border text-sm focus:ring-0 peer"
                >
                  <option for="floating_state" value="">Select state*</option>
                  <option
                    v-for="(item, index) in states"
                    :key="index"
                    :value="JSON.stringify(item)"
                  >
                    {{ item.state }}
                  </option>
                </select>
              </div>
            </div>
            <div class="w-full">
              <!-- select city -->
              <div class="mt-5 relative group">
                <select
                  v-model="shipping_details.city"
                  name="floating_city"
                  id="floating_city"
                  class="block rounded-2xl p-[1.1rem] w-full border-gray-200 text-gray-400 border text-sm focus:ring-0 peer"
                >
                  <option
                    for="floating_city"
                    class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-gray-500 dark:text-gray-400 top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                    value=""
                  >
                    select Lga*
                  </option>
                  <option
                    v-for="(item, index) in cities"
                    :key="index"
                    :value="JSON.stringify(item)"
                  >
                    {{ item }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="w-full">
            <div class="w-full">
              <!-- Additional information -->
              <div class="mt-5 w-full relative group">
                <input
                  v-model="shipping_details.additional_information"
                  name="floating_add_information"
                  id="floating_add_information"
                  class="block rounded-2xl p-[1.1rem] w-full border-gray-200 text-gray-400 border text-sm appearance-none focus:ring-0 peer"
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

            <div v-if="$route.path === '/dashboard/address-form'" class="flex justify-center py-5">
              <AuthButtons class="w-[30%] pt-[4rem]">
                <span>Add address</span>
              </AuthButtons>
            </div>
            <div v-else class="flex justify-center py-1">
              <AuthButtons class="w-[30%] pt-[2rem]">
                <span>Update Address</span>
              </AuthButtons>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import NaijaStates from 'naija-state-local-government'
import DashTitleSlot from '@/components/slots/DashboardTitle.vue'
import Plus from '@/assets/svg/plus.vue'
import AuthButtons from '../../components/slots/AuthButtons.vue'
import Title from '@/components/Dashboard/DashboardTitles.vue'
import { useShippingAddressStore } from '@/stores/shipping_address'
import { useStatesStore } from '@/stores/States'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useForm } from 'vee-validate'
import { object, string } from 'yup'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const store = useShippingAddressStore()
const route = useRoute()
const states = NaijaStates.all()

const cities = ref([])
const successMsg = ref('')
const errorsInfo = ref('')
const shipping_details = ref({
  state: {},
  city: {},
  delivery_address: '',
  first_name: '',
  last_name: '',
  phone_number: '',
  additional_information: ''
})
const getCities = (data) => {
  const selectedState = JSON.parse(data)
  cities.value = NaijaStates.lgas(selectedState.state).lgas(selectedState)
}

const clearForm = () => {
  shipping_details.value.state = {}
  shipping_details.value.city = {}
  shipping_details.value.delivery_address = ''
  shipping_details.value.first_name = ''
  shipping_details.value.last_name = ''
  shipping_details.value.phone_number = ''
  shipping_details.value.additional_information = ''
}

const addShippingAddress = () => {
  if (route.path === '/dashboard/address-form') {
    const id = toast.loading('Adding shipping address..')

    store
      .AddShippingAdress(shipping_details.value)
      .then((msg) => {
        successMsg.value = msg.data.message
        setTimeout(() => {
          toast.update(id, {
            render: successMsg,
            autoClose: true,
            closeOnClick: true,
            closeButton: true,
            type: 'success',
            isLoading: false
          })

          setTimeout(() => {
            // done
            toast.done
            router.push({
              name: 'address-book'
            })()
          }, 2000)
        }, 2000)
        clearForm()
      })
      .catch((error) => {
        errorsInfo.value = error.response.data.message
        setTimeout(() => {
          toast.update(id, {
            render: errorsInfo,
            autoClose: true,
            closeOnClick: true,
            closeButton: true,
            type: 'error',
            isLoading: false
          })
        }, 2000)
        // errorNotify()
      })
  } else {
    const id = toast.loading('Updating shipping address..')

    store
      .EditShippingAdressDetail(shipping_details.value, route.params.id)
      .then((msg) => {
        msg
        successMsg.value = msg.message
        setTimeout(() => {
          toast.update(id, {
            render: successMsg,
            autoClose: true,
            closeOnClick: true,
            closeButton: true,
            type: 'success',
            isLoading: false
          })
          setTimeout(() => {
            // done
            toast.done
            router.push({
              name: 'address-book'
            })()
          }, 2000)
        }, 2000)
      })
      .catch((error) => {
        error
        errorsInfo.value = error
        setTimeout(() => {
          toast.update(id, {
            render: errorsInfo,
            autoClose: true,
            closeOnClick: true,
            closeButton: true,
            type: 'error',
            isLoading: false
          })
        }, 2000)
        // errorNotify()
      })
  }
}

const getShippingAdressDetail = () => {
  if (route.params.id) {
    store.GetShippingAdressDetail(route.params.id).then((response) => {
      shipping_details.value.first_name = response.data.first_name
      shipping_details.value.last_name = response.data.last_name
      shipping_details.value.phone_number = response.data.phone_number
      shipping_details.value.additional_information = response.data.additional_information
      shipping_details.value.delivery_address = response.data.delivery_address
      shipping_details.value.state = response.data.state
      shipping_details.value.city = response.data.city(response)
    })
  }
}

onMounted(() => {
  // (shipping_details.value.state)
  getShippingAdressDetail()
})
</script>

<style scoped></style>
