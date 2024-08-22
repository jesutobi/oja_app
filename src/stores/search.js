import { reactive, ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import axiosClient from '../axios'
import { useProductCategory } from '@/stores/product_category.js'

// const { ProductsByCategory } = storeToRefs(productCategoryStore)

export const useSearchStore = defineStore(
  'Search',
  () => {
    const SearchResult = ref([])

    const GetProductsBySearch = async (queryValue) => {
      try {
        const productCategoryStore = useProductCategory()
        const response = await axiosClient.get(`search`, {
          params: { query: queryValue }
        })

        productCategoryStore.ProductsByCategory = response.data.products

        return response
      } catch (error) {
        // Handle errors
        'error:', error
        throw error
      }
    }

    const NavSearch = async (value, value2) => {
      try {
        const productCategoryStore = useProductCategory()
        const response = await axiosClient.get(`search_Products_By_Category/${value}`, {
          params: { query: value2 }
        })
        productCategoryStore.ProductCategoryInfo = response.data.category
        SearchResult.value = response.data.products

        return response
      } catch (error) {
        // Handle errors
        'error:', error
        throw error
      }
    }

    return {
      GetProductsBySearch,

      NavSearch,
      SearchResult
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [{ storage: localStorage, paths: ['SearchResult'] }]
    }
  }
)
