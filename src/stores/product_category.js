import { defineStore } from 'pinia'
import axiosClient from '../axios'
import { ref } from 'vue'

export const useProductCategory = defineStore(
  'produc_category',
  () => {
    // Define your state here

    const category = ref([])
    const ProductsByCategory = ref([])
    const ProductCategoryInfo = ref({})
    const beautyProducts = ref({})
    const art = ref({})

    const getProductCategory = async () => {
      try {
        const response = await axiosClient.get(`get_product_category`)
        category.value = response.data.categories
        console.log(category.value)

        return response
      } catch (error) {
        throw error
      }
    }
    const getProductsByCategory = async (payload) => {
      try {
        const response = await axiosClient.get(`get_Products_By_Category/${payload}`)
        ProductsByCategory.value = response.data.products
        beautyProducts.value = response.data.products
        // art.value = response.data.products
        ProductCategoryInfo.value = response.data.category
        console.log(response)

        return response
      } catch (error) {
        throw error
      }
    }

    return {
      getProductCategory,
      category,
      getProductsByCategory,
      ProductsByCategory,
      ProductCategoryInfo,
      beautyProducts,
      art
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: localStorage,
          paths: ['category', 'ProductsByCategory', 'ProductCategoryInfo', 'beautyProducts', 'art']
        }
      ]
    }
  }
)
