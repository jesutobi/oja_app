// import { reactive } from 'vue'
import { defineStore } from 'pinia'
import axiosClient from '../axios'

export const useVerifyEmailStore = defineStore('verify_email', () => {
  //   const data = reactive({})
  const verifyUser = async (user_verify_data) => {
    try {
      const response = await axiosClient.post('/verify', user_verify_data)
      return response
    } catch (error) {
      // Handle errors
      console.error('verification failed:', error)
      throw error
    }
  }

  return { verifyUser }
})
