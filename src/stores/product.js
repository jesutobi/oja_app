import { reactive, ref } from 'vue'

import { defineStore } from 'pinia'
import axiosClient from '../axios'

export const useProduct = defineStore('products', () => {
  // Define your state here
  const products = ref({
    featured_products: [],
    new_arrivals_products: []
  })

  const GetFeaturedProducts = async () => {
    try {
      const response = await axiosClient.get(`get_featured_product`)

      products.value.featured_products = response // Access the data property
      return response.data
    } catch (error) {
      // Handle errors
      console.error('Failed:', error)
      throw error
    }
  }
  const GetNewArrivals = async () => {
    try {
      const response = await axiosClient.get(`new_arrival`)

      products.value.new_arrivals_products = response // Access the data property
      return response.data
    } catch (error) {
      // Handle errors
      console.error('Failed:', error)
      throw error
    }
  }

  const GetProductDetail = async (id) => {
    try {
      const response = await axiosClient.get(`get_product_detail/${id}`)

      return response.data
    } catch (error) {
      // Handle errors
      console.error('Failed:', error)
      throw error
    }
  }

  return { products, GetFeaturedProducts, GetNewArrivals, GetProductDetail }
})
