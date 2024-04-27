import { reactive } from 'vue'
import { defineStore } from 'pinia'
import axiosClient from '../axios'

export const useResetPasswordStore = defineStore('reset_password', () => {
  const data = reactive({})
  const sendLink = async (userEmail) => {
    try {
      const response = await axiosClient.post('/forgot-password', userEmail)
      return response
    } catch (error) {
      // Handle errors
      console.error('logout failed:', error)
      throw error
    }
  }
  const reset_password = async (newData) => {
    try {
      const response = await axiosClient.post('/reset_password', newData)
      return response
    } catch (error) {
      // Handle errors
      console.error('reset failed:', error)
      throw error
    }
  }

  return { sendLink, data, reset_password }
})
