import { reactive } from 'vue'
import { defineStore } from 'pinia'
import axiosClient from '../axios'

export const useSocialAuthStore = defineStore('social_auth', () => {
  // Define your state here
  const data = reactive({
    AuthResponse: ''
  })

  const GoogleAuth = async (provider) => {
    try {
      const response = await axiosClient.get(`auth/${provider}/redirect`)(response)

      return response
    } catch (error) {
      // Handle errors
      'Authentication Failed:', error
      throw error
    }
  }

  return { data, GoogleAuth }
})
