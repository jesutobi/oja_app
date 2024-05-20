import { reactive } from 'vue'
import { defineStore } from 'pinia'
import axiosClient from '../axios'
import axios from 'axios'

export const useStatesStore = defineStore('States', () => {
  // Define your state here
  const data = reactive({
    AuthResponse: ''
  })

  const GetStates = async () => {
    try {
      const response = await axios.get(` https://nigeria-states-towns-lga.onrender.com/api/states`)
      //   localStorage.setItem('USER', JSON.stringify(response.data))
      console.log('get', response)

      return response
    } catch (error) {
      // Handle errors
      console.error('error:', error)
      throw error
    }
  }
  const getCities = async (payload) => {
    try {
      console.log(payload)
      const response = await axios.get(
        `https://nigeria-states-towns-lga.onrender.com/api/${payload.state_code}/towns`
      )

      console.log(response)

      return response
    } catch (error) {
      // Handle errors
      console.error('Authentication Failed:', error)
      throw error
    }
  }

  return { data, GetStates, getCities }
})
