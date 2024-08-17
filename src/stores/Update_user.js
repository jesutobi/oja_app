import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import axiosClient from '../axios'

export const useUpdateUserStore = defineStore(
  'update_users',
  () => {
    // Define your state here

    const AuthResponse = ref('')

    const GetUser = async () => {
      try {
        const response = await axiosClient.get(`user`)
        AuthResponse.value = response.data

        return response
      } catch (error) {
        // Handle errors
        'Authentication Failed:', error
        throw error
      }
    }
    const UpdateUser = async (payload) => {
      try {
        const response = await axiosClient.put(`update_user`, payload)

        return response
      } catch (error) {
        // Handle errors
        'Authentication Failed:', error
        throw error
      }
    }

    return { GetUser, UpdateUser, AuthResponse }
  },
  {
    persist: {
      enabled: true,
      strategies: [{ storage: localStorage, paths: ['AuthResponse'] }]
    }
  }
)
