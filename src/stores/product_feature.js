import { defineStore } from 'pinia'
import axiosClient from '../axios'

export const useProductFeature = defineStore('produc_feature', () => {
  // Define your state here

  const getProductFeature = async () => {
    try {
      const response = await axiosClient.get(`get_product_feature`)(response)

      return response
    } catch (error) {
      // Handle errors
      'GetC-feature', error
      throw error
    }
  }

  return { getProductFeature }
})
