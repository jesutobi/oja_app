import { reactive } from 'vue'
import { defineStore } from 'pinia'
import axiosClient from '../axios'

export const useBackOffice = defineStore('back_officee', () => {
  // Define your state here

  const UploadCategory = async (provider) => {
    try {
      const response = await axiosClient.get(`auth/${provider}/redirect`)

      console.log(response)

      return response
    } catch (error) {
      // Handle errors
      console.error('Authentication Failed:', error)
      throw error
    }
  }

  return { UploadCategory }
})
