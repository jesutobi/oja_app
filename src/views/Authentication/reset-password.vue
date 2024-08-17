<template>
  <div>
    <div>
      <!-- go bak button -->
      <AuthFormGrid>
        <div><Back /></div>

        <!-- logo -->
        <div class="pt-[3rem] pb-2">
          <Logo />
        </div>

        <!-- text -->
        <div>
          <div class="font2 py-1 text-3xl">
            <span>Reset Password </span>
          </div>
          <div class="py-2 text-sm">
            <span>Enter and confirm your new password</span>
          </div>
        </div>

        <form action="" @submit="reset_password">
          <!-- email -->
          <div class="mt-5 w-full relative group">
            <input
              :class="{ 'border-red-600': errors.email }"
              v-model="email"
              v-bind="emailAttrs"
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
          <!-- validation -->
          <div class="py-2" v-if="errors.email">
            <span class="text-xs text-red-600">{{ errors.email }}</span>
          </div>

          <!-- password -->
          <div class="mb-2">
            <div class="mt-5 flex items-center relative">
              <div class="relative z-0 w-full group">
                <input
                  :class="{ 'border-red-600': errors.password }"
                  v-model="password"
                  v-bind="passwordAttrs"
                  :type="inputType"
                  name="floating_password"
                  id="floating_password"
                  class="block rounded-2xl p-[1.1rem] w-full border-gray-400 text-gray-400 border text-sm appearance-none focus:ring-0 peer"
                  placeholder=" "
                />
                <label
                  for="floating_password"
                  class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-gray-500 dark:text-gray-400 top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                  >Password
                </label>
              </div>
              <div
                class="absolute top-5 right-0 px-3 cursor-pointer"
                @click="toggleInput('initialPassword')"
              >
                <div v-if="inputType === 'password'">
                  <img style="width: 17px" src="@/assets/icon/eye-see-password.svg" alt="" />
                </div>
                <div v-else>
                  <img style="width: 17px" src="@/assets/icon/eye-hide-password.svg" alt="" />
                </div>
              </div>
            </div>
            <!-- validation -->
            <div class="py-2" v-if="errors.password">
              <span class="text-xs text-red-600">{{ errors.password }}</span>
            </div>
          </div>

          <!-- confirm password -->
          <div class="mb-2">
            <div class="mt-5 flex items-center relative">
              <div class="relative z-0 w-full group">
                <input
                  :class="{ 'border-red-600': errors.password_confirmation }"
                  v-model="password_confirmation"
                  v-bind="password_confirmationAttrs"
                  :type="inputTypeConfirm"
                  name="floating_password_confirmation"
                  id="floating_password_confirmation"
                  class="block rounded-2xl p-[1.1rem] w-full border-gray-400 text-gray-400 border text-sm appearance-none focus:ring-0 peer"
                  placeholder=" "
                />
                <label
                  for="floating_password_confirmation"
                  class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-gray-500 dark:text-gray-400 top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                  >Confirm password
                </label>
              </div>
              <div
                class="absolute top-5 right-0 px-3 cursor-pointer"
                @click="toggleInput('confirm')"
              >
                <div v-if="inputTypeConfirm === 'password'">
                  <img style="width: 17px" src="@/assets/icon/eye-see-password.svg" alt="" />
                </div>
                <div v-else>
                  <img style="width: 17px" src="@/assets/icon/eye-hide-password.svg" alt="" />
                </div>
              </div>
            </div>
            <!-- validation -->
            <div class="py-2" v-if="errors.password_confirmation">
              <span class="text-xs text-red-600">{{ errors.password_confirmation }}</span>
            </div>
          </div>
          <!-- send email -->
          <div class="flex justify-center py-5">
            <AuthButtons class="w-full">
              <span>Reset password</span>
            </AuthButtons>
          </div>
        </form>
      </AuthFormGrid>
    </div>
  </div>
</template>

<script setup>
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { ref } from 'vue'
import Back from '../../components/extras/goBack.vue'
import Logo from '../../components/icons/Logo.vue'
import AuthButtons from '../../components/slots/AuthButtons.vue'
import AuthFormGrid from '../../components/slots/AuthFormGrid.vue'
import { useResetPasswordStore } from '../../stores/Auth_reset_password'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const routeDetails = useRoute()
// const errorMsg = ref('')
const successMsg = ref('')
const errorsInfo = ref({})
const inputType = ref('password')
const inputTypeConfirm = ref('password')
const store = useResetPasswordStore()
const user = {
  token: routeDetails.query.token,
  email: routeDetails.query.email,
  password: '',
  password_confirmation: ''
}
const validationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
  password_confirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords do not match')
})

const { handleSubmit, errors, defineField, resetForm } = useForm({
  validationSchema,
  initialValues: user
})
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [password_confirmation, password_confirmationAttrs] = defineField('password_confirmation')

const reset_password = handleSubmit((values) => {
  const id = toast.loading('Reset in progress...')

  store
    .reset_password(values)
    .then((msg) => {
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
          toast.done(
            router.push({
              name: 'Login'
            })
          )
        }, 2000)
      }, 2000)
    })
    .catch((error) => {
      errorsInfo.value = error(errorsInfo)
      setTimeout(() => {
        toast.update(id, {
          render: 'errr',
          autoClose: true,
          closeOnClick: true,
          closeButton: true,
          type: 'error',
          isLoading: false
        })
      }, 2000)
    })
  // Reset the form data
  resetForm()
})

function toggleInput(data) {
  if (data === 'initialPassword') {
    inputType.value = inputType.value === 'password' ? 'text' : 'password'
  } else if (data === 'confirm') {
    inputTypeConfirm.value = inputTypeConfirm.value === 'password' ? 'text' : 'password'
  }
}

errors, toggleInput, reset_password()
</script>

<style scoped></style>
