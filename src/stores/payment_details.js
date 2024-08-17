import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import axiosClient from '../axios'

export const usePaymentStore = defineStore(
  'Payment',
  () => {
    const PaymentDetails = async (payload) => {
      try {
        const response = await axiosClient.post(`payment_details`, payload)

        return response
      } catch (error) {
        'error:', error
        throw error
      }
    }

    return {
      PaymentDetails
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [{ storage: localStorage, paths: [] }]
    }
  }
)
