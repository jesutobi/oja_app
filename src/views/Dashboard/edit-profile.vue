<template>
  <div>
    <!-- header -->

    <DashTitleSlot>
      <div>
        <Title :text="`Edit Profile`" />
      </div>
      <div>
        <img src="@/assets/icon/edit.svg" style="width: 23px" />
      </div>
    </DashTitleSlot>

    <!-- form space -->
    <div v-if="input_loader">
      <InputLoader v-for="(number, index) in 3" :key="index" />
    </div>
    <div v-else>
      <form @submit.prevent="update">
        <div class="">
          <div class="">
            <!-- first name , last name -->
            <div class="lg:flex items-center gap-4">
              <div class="w-full">
                <div class="mt-6 w-full relative group">
                  <input
                    v-model="form.first_name"
                    name="floating_First_name"
                    id="floating_First_name"
                    class="block rounded-2xl p-[1.1rem] w-full border-gray-200 text-gray-400 border text-sm appearance-none focus:ring-0 peer"
                    placeholder=" "
                  />
                  <label
                    for="floating_First_name"
                    class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-gray-500 dark:text-gray-400 top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                    >First name*
                  </label>
                </div>
                <!-- validation -->
                <div class="py-2">
                  <span class="text-xs text-red-600" v-if="errors.first_name">{{
                    errors.first_name
                  }}</span>
                </div>
              </div>
              <div class="w-full">
                <div class="mt-6 w-full relative group">
                  <input
                    v-model="form.last_name"
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
                <!-- validation -->
                <div class="py-2">
                  <span class="text-xs text-red-600" v-if="errors.last_name">{{
                    errors.last_name
                  }}</span>
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
                    v-model="form.email"
                    name="floating_email"
                    id="floating_email"
                    class="block rounded-2xl p-[1.1rem] w-full border-gray-200 text-gray-400 border text-sm appearance-none focus:ring-0 peer"
                    placeholder=" "
                  />
                  <label
                    for="floating_email"
                    class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-gray-500 dark:text-gray-400 top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                    >Email*
                  </label>
                </div>
                <div>
                  <Info class="pt-3" :text="`You don't have access to update your email`" />
                </div>
              </div>
              <!-- phone number -->
              <div class="w-full">
                <div class="mt-5 lg:mt-2 w-full relative group">
                  <input
                    v-model="form.phone_number"
                    name="floating_phone_number"
                    id="floating_phone_number"
                    class="block rounded-2xl p-[1.1rem] w-full border-gray-200 text-gray-400 border text-sm appearance-none focus:ring-0 peer"
                    placeholder=" "
                  />
                  <label
                    for="floating_phone_number"
                    class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-gray-500 dark:text-gray-400 top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                    >Phone number
                  </label>
                </div>
                <!-- validation -->
                <div class="py-2">
                  <span class="text-xs text-red-600" v-if="errors.phone_number">{{
                    errors.phone_number
                  }}</span>
                </div>
              </div>
            </div>
            <!-- country , Address -->
            <div class="lg:flex items-center gap-4">
              <!-- email -->

              <div class="w-full">
                <div class="mt-1 w-full relative group">
                  <select
                    v-model="form.state"
                    name="floating_state"
                    id="floating_state"
                    class="block rounded-2xl p-[1.1rem] w-full border-gray-200 text-gray-400 border text-sm focus:ring-0 peer"
                  >
                    <option for="floating_state" :value="form.state" selected disabled>
                      Select state
                    </option>
                    <option
                      v-for="(item, index) in states"
                      :key="index"
                      :value="JSON.stringify(item)"
                    >
                      {{ item.state }}
                    </option>
                  </select>
                </div>

                <!-- validation -->
                <!-- <div class="py-2">
                  <span class="text-xs text-red-600" v-if="errors.state">{{ errors.state }}</span>
                </div> -->
              </div>
              <div class="w-full">
                <!-- address -->
                <div class="mt-5 w-full relative group">
                  <input
                    v-model="form.home_address"
                    name="floating_address"
                    id="floating_address"
                    class="block rounded-2xl p-[1.1rem] w-full border-gray-200 text-gray-400 border text-sm appearance-none focus:ring-0 peer"
                    placeholder=" "
                  />
                  <label
                    for="floating_address"
                    class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-gray-500 dark:text-gray-400 top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                    >Home address
                  </label>
                </div>
                <!-- validation -->
                <div class="py-2">
                  <span class="text-xs text-red-600" v-if="errors.home_address">{{
                    errors.home_address
                  }}</span>
                </div>
              </div>
            </div>
            <!-- subnit button -->

            <div class="flex justify-center py-1">
              <AuthButtons class="sm:w-[30%] pt-[2rem] w-[60%]">
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
import InputLoader from '@/components/loaders/input_loader.vue'
import NaijaStates from 'naija-state-local-government'
import DashTitleSlot from '@/components/slots/DashboardTitle.vue'
// import Edit from '@/assets/svg/edit.vue'
import Title from '@/components/Dashboard/DashboardTitles.vue'
import Info from '@/components/extras/littleInfo.vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useForm } from 'vee-validate'
import { object, string } from 'yup'
import { onMounted, ref } from 'vue'
import AuthButtons from '../../components/slots/AuthButtons.vue'
import { useUpdateUserStore } from '@/stores/Update_user'
import { useStatesStore } from '@/stores/States'
import { useRouter } from 'vue-router'

const input_loader = ref(true)
const router = useRouter()
const storeState = useStatesStore()
const store = useUpdateUserStore()
const successMsg = ref('')
const errorsInfo = ref('')

const user_state = ref({})
const states = NaijaStates.all()

const getUsers = async () => {
  input_loader.value = true
  try {
    await store.GetUser()
  } catch (error) {
    console.error('Error:', error)
  } finally {
    input_loader.value = false
  }
}

const getUser = () => {
  store.GetUser().then((response) => {
    form.value.state
    form.value.first_name = response.data.first_name
    form.value.last_name = response.data.last_name
    form.value.email = response.data.email
    form.value.phone_number = response.data.phone_number
    form.value.home_address = response.data.home_address
    user_state.value = response.data.state
    form.value.state = user_state.value
  })
}

// const preFillForm = () => {}

const form = ref({
  first_name: '',
  last_name: '',
  home_address: '',
  phone_number: '',
  state: {},
  email: ''
})

// const validationSchema = object({
//   first_name: string().required(),
//   last_name: string().required(),
//   state: string(),
//   home_address: string(),
//   phone_number: string()
//     .matches(/^0[789]\d{9}$/, 'Please enter a valid 11-digit phone number!')
//     .max(11)
// })

const { errors } = useForm({
  // validationSchema,
  initialValues: form.value
})

// form.value.email = defineField('email')
// const first_name = defineField('first_name')
// form.value.last_name = defineField('last_name')
// form.value.state = defineField('state')
// form.value.home_address = defineField('home_address')
// form.value.phone_number = defineField('phone_number')

const update = () => {
  const id = toast.loading('Updating user details..')
  store
    .UpdateUser(form.value)
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
            name: '/dashboard/my-account'
          })
        }, 2000)
      }, 2000)
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
}

onMounted(() => {
  getUser(), getUsers()
})

getUser()
</script>

<style scoped></style>
