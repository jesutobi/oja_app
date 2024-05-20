<template>
  <div class="font1">
    <!-- go bak button -->
    <AuthFormGrid>
      <div><Back /></div>

      <!-- logo -->
      <div class="pt-[3rem]">
        <Logo />
      </div>

      <!-- text -->
      <div>
        <div class="font2 py-1 text-3xl">
          <span>Sign up </span>
        </div>
        <div class="py-2 text-sm">
          <span>Sign up to agree to the use of your information </span>
        </div>
      </div>
      <!-- sign in with google -->
      <div class="my-2">
        <GoogleButtons>
          <span class="font2 px-2">Register with Google</span>
        </GoogleButtons>
      </div>
      <!-- input space -->
      <div>
        <form @submit="register">
          <!-- First_name -->
          <div class="mt-6 w-full relative group">
            <input
              :class="{ 'border-red-600': errors.first_name }"
              name="floating_First_name"
              id="floating_First_name"
              class="block rounded-2xl p-[1.1rem] w-full border-gray-400 text-gray-400 border text-sm appearance-none focus:ring-0 peer"
              placeholder=" "
              v-model="first_name"
              v-bind="first_nameAttrs"
            />
            <label
              for="floating_First_name"
              class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-gray-500 dark:text-gray-400 top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
              >First name
            </label>
          </div>
          <!-- validation -->
          <div class="py-2">
            <span class="text-xs text-red-600" v-if="errors.first_name">{{
              errors.first_name
            }}</span>
          </div>

          <!-- Last_name -->
          <div class="mt-2 w-full relative group">
            <input
              :class="{ 'border-red-600': errors.last_name }"
              name="floating_Last_name"
              id="floating_Last_name"
              class="block rounded-2xl p-[1.1rem] w-full border-gray-400 text-gray-400 border text-sm appearance-none focus:ring-0 peer"
              placeholder=" "
              v-model="last_name"
              v-bind="last_nameAttrs"
            />
            <label
              for="floating_Last_name"
              class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-gray-500 dark:text-gray-400 top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
              >Last name
            </label>
          </div>
          <!-- validation -->
          <div class="py-2" v-if="errors.last_name">
            <span class="text-xs text-red-600">{{ errors.last_name }}</span>
          </div>

          <!-- email -->
          <div class="mt-5 w-full relative group">
            <input
              :class="{ 'border-red-600': errors.email }"
              name="floating_email"
              id="floating_email"
              class="block rounded-2xl p-[1.1rem] w-full border-gray-400 text-gray-400 border text-sm appearance-none focus:ring-0 peer"
              placeholder=" "
              v-model="email"
              v-bind="emailAttrs"
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
                  :type="inputType"
                  name="floating_password"
                  id="floating_password"
                  class="block rounded-2xl p-[1.1rem] w-full border-gray-400 text-gray-400 border text-sm appearance-none focus:ring-0 peer"
                  placeholder=" "
                  v-model="password"
                  v-bind="passwordAttrs"
                />
                <label
                  for="floating_password"
                  class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-gray-500 dark:text-gray-400 top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                  >Password
                </label>
              </div>
              <div class="absolute top-5 right-0 px-3 cursor-pointer" @click="toggleInput">
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

          <!-- Agree to terms and conditons -->
          <div class="item-center flex py-3">
            <div>
              <input
                name="agree_terms_conditions"
                type="checkbox"
                required
                :rules="checkboxRules"
                v-model="agree_terms_conditions"
                v-bind="agree_terms_conditionsAttrs"
              />
            </div>
            <div class="cursor-pointer px-2">
              <span :class="{ 'text-red-600': errors.agree_terms_conditions }" class="text-xs"
                >Agree to terms and conditions</span
              >
            </div>
          </div>

          <!-- login button -->
          <div class="flex justify-center">
            <AuthButtons class="w-full">
              <span>Sign Up</span>
            </AuthButtons>
          </div>

          <!-- signup -->
          <div class="justify-center flex">
            <div>
              <div class="py-1">
                <span class="text-sm text-center">Already have an account?</span>
              </div>
              <div class="flex cursor-pointer text-sm items-center py-1 justify-center">
                <div class="px-1">
                  <img style="width: 17px" src="@/assets/icon/user-svgrepo-com.svg" alt="" />
                </div>
                <router-link to="Login">
                  <div class="font2 underline">
                    <span>Login</span>
                  </div></router-link
                >
              </div>
            </div>
          </div>
        </form>
      </div>
    </AuthFormGrid>
  </div>
</template>

<script setup>
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useForm } from 'vee-validate'
import { object, boolean, string } from 'yup'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Back from '../../components/extras/goBack.vue'
import Logo from '../../components/icons/Logo.vue'
import GoogleButtons from '../../components/slots/GoogleButtons.vue'
import AuthButtons from '../../components/slots/AuthButtons.vue'
import { useUserStore } from '../../stores/Authentication'
import AuthFormGrid from '../../components/slots/AuthFormGrid.vue'

const router = useRouter()
const errorMsg = ref('')
const successMsg = ref('')
const errorsInfo = ref('')
const inputType = ref('password')
const store = useUserStore()

// const router = useRouter()
const user = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  agree_terms_conditions: false
}

const validationSchema = object({
  first_name: string().required(),
  last_name: string().required(),
  email: string().required().email(),
  password: string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .min(8),
  agree_terms_conditions: boolean().required()
})

const { handleSubmit, errors, defineField, resetForm } = useForm({
  validationSchema,
  initialValues: user
})

const [email, emailAttrs] = defineField('email')
const [first_name, first_nameAttrs] = defineField('first_name')
const [last_name, last_nameAttrs] = defineField('last_name')
const [password, passwordAttrs] = defineField('password')
const [agree_terms_conditions, agree_terms_conditionsAttrs] = defineField('agree_terms_conditions')

const register = handleSubmit((values) => {
  const id = toast.loading('Registering user..')
  store
    .register(values)
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
              name: 'home'
            })
          )
        }, 2000)
      }, 2000)
    })
    .catch((error) => {
      // loading.value = false
      errorMsg.value = error.response
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
  // Reset the form data
  resetForm()
})

function toggleInput() {
  inputType.value = inputType.value === 'password' ? 'text' : 'password'
}

register(), errors, toggleInput
</script>

<style scoped></style>
