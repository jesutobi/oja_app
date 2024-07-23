<template>
  <div>
    <!-- go bak button -->
    <AuthFormGrid>
      <div class="flex items-center justify-center h-[75vh]">
        <div>
          <!-- <div><Back /></div> -->

          <!-- logo -->
          <div class="pt-[3rem] pb-2">
            <Logo />
          </div>

          <!-- text -->
          <div>
            <div class="font2 py-1 text-3xl">
              <span>Email Verified</span>
            </div>
            <div v-if="successMsg !== ''">
              <div class="py-2 text-sm">
                <span>Your email ({{ userInfo.email }}) has been sucesfully verfied. </span>
              </div>
            </div>
            <div v-if="errorsInfo !== ''">
              <div class="py-2 text-sm">
                <span>Your email ({{ userInfo.email }}) has already been verfied. </span>
              </div>
            </div>
            <div v-if="errorsInfo !== '' || successMsg !== ''" class="py-1">
              <div class="text-sm">
                <span>You can now explore our website seamlessly </span>
              </div>
              <!-- subnit button -->

              <div class="py-1">
                <router-link to="/">
                  <AuthButtons class="w-[50%] pt-[2rem]">
                    <span>Continue </span>
                  </AuthButtons>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthFormGrid>
  </div>
</template>
<script setup>
import { toast } from 'vue3-toastify'
import AuthButtons from '../../components/slots/AuthButtons.vue'
import 'vue3-toastify/dist/index.css'
import Back from '../../components/extras/goBack.vue'
import Logo from '../../components/icons/Logo.vue'
import AuthFormGrid from '../../components/slots/AuthFormGrid.vue'
import { useVerifyEmailStore } from '@/stores/Email_verification'
import { useUserStore } from '@/stores/Authentication'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const verifiedStore = useVerifyEmailStore()
const userStore = useUserStore()
const successMsg = ref('')
const errorsInfo = ref('')
const { userInfo } = storeToRefs(userStore)

const user_verification_data = {
  token: route.query.token,
  user_id: route.query.id
}

const user = userInfo.value.email

const verifyEmail = (user_verification_data) => {
  const id = toast.loading('Verifying..')
  verifiedStore
    .verifyUser(user_verification_data)
    .then((msg) => {
      successMsg.value = msg.data.message
      console.log('sux', msg)
      setTimeout(() => {
        toast.update(id, {
          render: successMsg.value,
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
              // name: 'home'
            })
          )
        }, 2000)
      }, 2000)
    })
    .catch((error) => {
      errorsInfo.value = error.response.data.error
      setTimeout(() => {
        toast.update(id, {
          render: errorsInfo.value,
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
