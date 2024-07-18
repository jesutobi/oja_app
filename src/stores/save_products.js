import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import axiosClient from '../axios'

export const useSavedStore = defineStore(
  'Saved',
  () => {
    const saved_data = ref([])
    const get_saved_data = ref([])

    const save_product = async (payload) => {
      try {
        const response = await axiosClient.post(`save_product`, payload)
        saved_data.value = response.data

        return response
      } catch (error) {
        // Handle errors
        console.error('error:', error)
        throw error
      }
    }
    const get_save_product = async (payload) => {
      try {
        const response = await axiosClient.get(`get_saved_product/${payload}`)
        get_saved_data.value = response.data.savedProductsDetails

        return response
      } catch (error) {
        // Handle errors
        console.error('error:', error)
        throw error
      }
    }

    return {
      save_product,
      saved_data,
      get_saved_data,
      get_save_product
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [{ storage: localStorage, paths: ['saved_data', 'get_saved_data'] }]
    }
  }
)
