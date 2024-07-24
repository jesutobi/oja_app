import { reactive, ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import axiosClient from '../axios'
import { useProductCategory } from '@/stores/product_category.js'

// const { ProductsByCategory } = storeToRefs(productCategoryStore)

export const useSearchStore = defineStore(
  'Search',
  () => {
    const Nigerian_States = ref([])

    const GetProductsBySearch = async (queryValue) => {
      try {
        const productCategoryStore = useProductCategory()
        const response = await axiosClient.get(`search`, { params: { query: queryValue } })

        productCategoryStore.ProductsByCategory = response.data.products

        return response
      } catch (error) {
        // Handle errors
        console.error('error:', error)
        throw error
      }
    }

    return {
      GetProductsBySearch
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [{ storage: localStorage, paths: ['Nigerian_States'] }]
    }
  }
)
