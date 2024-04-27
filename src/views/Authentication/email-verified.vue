<template>
  <div>
    <!-- go bak button -->
    <AuthFormGrid>
      <div class="flex items-center justify-center h-[75vh]">
        <div>
          <div><Back /></div>

          <!-- logo -->
          <div class="pt-[3rem] pb-2">
            <Logo />
          </div>
          {{ route.query.token }}
          <!-- text -->
          <div>
            <div class="font2 py-1 text-3xl">
              <span>Email Verified</span>
            </div>
            <div class="py-2 text-sm">
              <span>Your email ({{ user }}) has been sucesfully verfied. </span>
            </div>
            <div class="py-1 text-sm">
              <span>You can now explore our website seamlessly </span>
            </div>
          </div>
        </div>
      </div>
    </AuthFormGrid>
  </div>
</template>
<script setup>
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import Back from '../../components/extras/goBack.vue'
import Logo from '../../components/icons/Logo.vue'
import AuthFormGrid from '../../components/slots/AuthFormGrid.vue'
import { useVerifyEmailStore } from '@/stores/Email_verification'
import { useUserStore } from '@/stores/Authentication'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const route = useRoute()
const router = useRouter()
const verifiedStore = useVerifyEmailStore()
const userStore = useUserStore()
const successMsg = ref('')

const user_verification_data = {
  token: route.query.token,
  user_id: route.query.id
}

const user = userStore.user.userInfo.email

const verifyEmail = (user_verification_data) => {
  const id = toast.loading('Verifying..')
  verifiedStore
    .verifyUser(user_verification_data)
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
      // errorMsg.value = error.response
      // errorsInfo.value = error.response.data.message
      setTimeout(() => {
        toast.update(id, {
          render: error,
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
  verifyEmail(user_verification_data)
})
</script>
<script setup></script>
<style scoped></style>
