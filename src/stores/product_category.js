import { defineStore } from 'pinia'
import axiosClient from '../axios'

export const useProductCategory = defineStore('produc_category', () => {
  // Define your state here

  const getProductCategory = async () => {
    try {
      const response = await axiosClient.get(`get_product_category`)

      console.log(response)

      return response
    } catch (error) {
      // Handle errors
      console.error('GetC-category', error)
      throw error
    }
  }

  return { getProductCategory }
})
