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
          <span>Welcome my Kustoma!</span>
        </div>
        <div class="py-2 text-sm">
          <span>Login to experience a wide range of products </span>
        </div>
      </div>
      <!-- sign in with google -->
      <div class="my-2">
        <GoogleButtons>
          <span class="font2 px-2">Sign In with Google</span>
        </GoogleButtons>
      </div>

      <!-- input space -->
      <div>
        <form
          action="
        "
          @submit="login"
        >
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

          <!-- login button -->
          <div class="flex justify-center py-5">
            <AuthButtons class="w-full">
              <span>Login</span>
            </AuthButtons>
          </div>
          <!-- forgot password button -->
          <div class="text-center border-b pb-10 cursor-pointer">
            <router-link to="forgot-password">
              <span class="text-sm font2 underline">Forgot your password?</span>
            </router-link>
          </div>
          <!-- signup -->
          <div class="justify-center flex">
            <div>
              <div class="py-2">
                <span class="text-sm text-center">Don't have an account?</span>
              </div>
              <div class="flex cursor-pointer items-center py-2 justify-center">
                <div class="px-2">
                  <img style="width: 15px" src="@/assets/icon/pencil-svgrepo-com.svg" alt="" />
                </div>
                <router-link to="Register">
                  <div class="font2 underline">
                    <span>Sign Up</span>
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
import { object, string } from 'yup'
import { ref } from 'vue'
import Back from '../../components/extras/goBack.vue'
import Logo from '../../components/icons/Logo.vue'
import AuthButtons from '../../components/slots/AuthButtons.vue'
import GoogleButtons from '../../components/slots/GoogleButtons.vue'
import AuthFormGrid from '../../components/slots/AuthFormGrid.vue'
import { useUserStore } from '../../stores/Authentication'
import { useRouter } from 'vue-router'

const router = useRouter()
// const errorMsg = ref('')
const successMsg = ref('')
const errorsInfo = ref({})
const inputType = ref('password')
const store = useUserStore()
const user = {
  email: '',
  password: ''
}

const validationSchema = object({
  email: string().required().email(),
  password: string().required()
})

const { handleSubmit, errors, defineField, resetForm } = useForm({
  validationSchema,
  initialValues: user
})

const [email, emailAttrs] = defineField('email')

const [password, passwordAttrs] = defineField('password')

const login = handleSubmit((values) => {
  const id = toast.loading('Logging in...')

  store
    .login(values)
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
        })
      }, 2000)
    })
    .catch((error) => {
      errorsInfo.value = error
      console.log(errorsInfo)
      setTimeout(() => {
        toast.update(id, {
          render: 'The Provided credentials are not correct',
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

login(), errors, toggleInput
</script>

<style scoped></style>
