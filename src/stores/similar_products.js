import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import axiosClient from '../axios'

export const useSimilarProducts = defineStore(
  'similar_products',
  () => {
    // Define your state here
    const simlarProducts = ref([])

    const GetSimilarProducts = async (id) => {
      try {
        const response = await axiosClient.get(`get_similar_products/${id}`)
        simlarProducts.value = response
        return response.data
      } catch (error) {
        // Handle errors
        console.error('Failed:', error)
        throw error
      }
    }

    return { simlarProducts, GetSimilarProducts }
  },
  {
    persist: {
      enabled: true,
      strategies: [{ storage: localStorage, paths: ['simlarProducts'] }]
    }
  }
)
