import { defineStore } from 'pinia'
import axiosClient from '../axios'
import { ref } from 'vue'

export const useProductCategory = defineStore(
  'produc_category',
  () => {
    // Define your state here

    const category = ref([])

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

    return { getProductCategory, category }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: localStorage,
          paths: ['category']
        }
      ]
    }
  }
)
