<template>
  <div class="">
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
          <span>Forgot Password ?</span>
        </div>
        <div class="py-2 text-sm">
          <span>Enter the email address you registered with us</span>
        </div>
      </div>

      <form action="" @submit="forgot_password">
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
        <!-- send email -->
        <div class="flex justify-center py-5">
          <AuthButtons class="w-full">
            <span>Send Link</span>
          </AuthButtons>
        </div>
      </form>
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
import AuthFormGrid from '../../components/slots/AuthFormGrid.vue'
import { useResetPasswordStore } from '../../stores/Auth_reset_password'

import { useRouter } from 'vue-router'
const router = useRouter()
// const errorMsg = ref('')
const successMsg = ref('')
const errorsInfo = ref({})
const store = useResetPasswordStore()
const user = {
  email: ''
}

const validationSchema = object({
  email: string().required().email()
})

const { handleSubmit, errors, defineField, resetForm } = useForm({
  validationSchema,
  initialValues: user
})

const [email, emailAttrs] = defineField('email')

const forgot_password = handleSubmit((values) => {
  store
    .sendLink(values)
    .then((msg) => {
      successMsg.value = 'A reset link has been sent to your mail'
      setTimeout(() => {
        toast.update({
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
      errorsInfo.value = error(errorsInfo)
      setTimeout(() => {
        toast.update({
          render: 'errr',
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

forgot_password(), errors
</script>

<style></style>
