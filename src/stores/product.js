import { reactive, ref } from 'vue'

import { defineStore } from 'pinia'
import axiosClient from '../axios'

export const useProduct = defineStore(
  'products',
  () => {
    // Define your state here
    const products = ref({
      featured_products: {},
      new_arrivals_products: []
    })

    const productDetail = ref({})
    const productFeature = ref([])
    const FeaturedProduct = ref([])
    const new_arrivals = ref([])
    const productReview = ref([])

    const GetFeaturedProducts = async () => {
      try {
        const response = await axiosClient.get(`get_featured_product`)

        FeaturedProduct.value = response.data // Access the data property

        return response
      } catch (error) {
        // Handle errors

        throw error
      }
    }
    const GetNewArrivals = async () => {
      try {
        const response = await axiosClient.get(`new_arrival`)

        new_arrivals.value = response // Access the data property
        return response
      } catch (error) {
        // Handle errors

        throw error
      }
    }

    const GetProductDetail = async (id) => {
      try {
        const response = await axiosClient.get(`get_product_detail/${id}`)
        productDetail.value = response.data.data
        productFeature.value = response.data.data.selected_product_feature

        return response.data
      } catch (error) {
        // Handle errors

        throw error
      }
    }
    const PostReviews = async (review, id) => {
      try {
        const response = await axiosClient.post(`post_product_review/${id}`, review)
        return response.data
      } catch (error) {
        // Handle errors
        console.log(error)

        throw error
      }
    }
    const GetReviews = async (id) => {
      try {
        const response = await axiosClient.get(`get_product_review/${id}`)
        productReview.value = response.data
        return response.data
      } catch (error) {
        // Handle errors

        throw error
      }
    }

    return {
      products,
      GetFeaturedProducts,
      GetNewArrivals,
      GetProductDetail,
      GetReviews,
      PostReviews,
      productDetail,
      productFeature,
      FeaturedProduct,
      productReview
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: localStorage,
          paths: ['productDetail', 'productFeature', 'FeaturedProduct', 'productReview']
        }
      ]
    }
  }
)
