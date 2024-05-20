import { reactive } from 'vue'
import { defineStore } from 'pinia'
import axiosClient from '../axios'

export const useUpdateUserStore = defineStore('update_users', () => {
  // Define your state here
  const data = reactive({
    AuthResponse: ''
  })

  const GetUser = async () => {
    try {
      const response = await axiosClient.get(`user`)
      localStorage.setItem('USER', JSON.stringify(response.data))
      console.log('get', response.data)

      return response
    } catch (error) {
      // Handle errors
      console.error('Authentication Failed:', error)
      throw error
    }
  }
  const UpdateUser = async (payload) => {
    try {
      console.log(payload)
      const response = await axiosClient.put(`update_user`, payload)

      console.log(response)

      return response
    } catch (error) {
      // Handle errors
      console.error('Authentication Failed:', error)
      throw error
    }
  }

  return { data, GetUser, UpdateUser }
})
