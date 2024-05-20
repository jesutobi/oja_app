<template>
  <div class="">
    <button
      @click="socialAuth('google')"
      type="submit"
      class="rounded-2xl py-[0.8rem] svg outline hover:bg-black hover:text-white outline-black w-full text-center text-[0.8rem]"
    >
      <div class="flex items-center justify-center hov-button">
        <div>
          <Google class="fill-current" />
        </div>
        <div><slot></slot></div>
      </div>
    </button>
    <div class="text-center my-4 font2 text-sm">
      <span>OR</span>
    </div>
  </div>
</template>

<script setup>
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useSocialAuthStore } from '../../stores/Social_Auth'
import Google from '@/assets/svg/google.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const errorMsg = ref('')
const successMsg = ref('')
const social_auth_store = useSocialAuthStore()
const router = useRouter()

const socialAuth = (provider) => {
  const id = toast.loading('Registering user..')
  social_auth_store
    .GoogleAuth(provider)
    .then((msg) => {
      successMsg.value = msg
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
          toast.done((window.location.href = successMsg.value.data.url))
        }, 2000)
      }, 2000)
    })
    .catch((error) => {
      // loading.value = false
      errorMsg.value = error.response
      setTimeout(() => {
        toast.update(id, {
          render: errorMsg.value,
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
</script>

<style scoped>
.hov-button:hover {
  color: white !important;

  /* padding: 1rem; */
}
</style>
