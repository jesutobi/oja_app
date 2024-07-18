import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import axiosClient from '../axios'
import { useUpdateUserStore } from './Update_user'

export const useVerifyEmailStore = defineStore(
  'verify_email',
  () => {
    const verfiedUser = ref({})
    // const data = reactive({
    //   user: JSON.parse(localStorage.getItem('verfiedUser'))
    // })

    const verifyUser = async (user_verify_data) => {
      try {
        const userStore = useUpdateUserStore()
        const response = await axiosClient.post('/verify', user_verify_data)
        // data.value = response.data.user
        verfiedUser.value = response.data.user.verified_at
        userStore.GetUser()

        return response
      } catch (error) {
        // Handle errors
        console.error('verification failed:', error)
        throw error
      }
    }

    return { verifyUser, verfiedUser }
  },
  {
    persist: {
      enabled: true,
      strategies: [{ storage: localStorage, paths: ['verfiedUser'] }]
    }
  }
)
