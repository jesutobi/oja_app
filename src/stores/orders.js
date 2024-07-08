import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import axiosClient from '../axios'

export const useOrdersStore = defineStore(
  'Orders',
  () => {
    const selected_shipping_id = ref('')
    const selected_payment_method = ref('')

    const PlaceOrder = async (payload) => {
      try {
        const response = await axiosClient.post(`place_order`, payload)

        return response
      } catch (error) {
        // Handle errors
        console.error('error:', error)
        throw error
      }
    }

    return {
      PlaceOrder,
      selected_shipping_id,
      selected_payment_method
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        { storage: localStorage, paths: ['selected_shipping_id', 'selected_payment_method'] }
      ]
    }
  }
)
