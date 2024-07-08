import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useGetIpStore = defineStore('get_ip', () => {
  const ipDetails = ref({})

  const getIp = async () => {
    try {
      const response = await axios.get('http://ipinfo.io/json')
      ipDetails.value = response
      console.log(ipDetails.value)
      return response
    } catch (error) {
      // Handle errors
      console.error('verification failed:', error)
      throw error
    }
  }

  return {}
})
