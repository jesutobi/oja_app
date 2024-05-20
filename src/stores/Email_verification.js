import { reactive } from 'vue'
import { defineStore } from 'pinia'
import axiosClient from '../axios'

export const useVerifyEmailStore = defineStore('verify_email', () => {
  const data = reactive({
    user: JSON.parse(localStorage.getItem('verfiedUser'))
  })

  const verifyUser = async (user_verify_data) => {
    try {
      const response = await axiosClient.post('/verify', user_verify_data)
      data.value = response.data.user
      console.log(response.data.user)
      localStorage.setItem('verfiedUser', JSON.stringify(response.data.user.verified_at))

      return response
    } catch (error) {
      // Handle errors
      console.error('verification failed:', error)
      throw error
    }
  }

  return { data, verifyUser }
})
