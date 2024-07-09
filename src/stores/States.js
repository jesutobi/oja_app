import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import axiosClient from '../axios'

export const useStatesStore = defineStore(
  'States',
  () => {
    const Nigerian_States = ref([])

    const GetStates = async () => {
      try {
        const response = await axiosClient.get(`get_states`)
        //   localStorage.setItem('USER', JSON.stringify(response.data))

        Nigerian_States.value = response.data.data

        return response
      } catch (error) {
        // Handle errors
        console.error('error:', error)
        throw error
      }
    }
    const GetCities = async (payload) => {
      console.log('me', payload)
      // Parse the payload if it is a stringified JSON
      // let parsedPayload
      // try {
      //   parsedPayload = JSON.parse(payload)
      //   const state = parsedPayload.state_code
      //   const response = await axios.get(
      //     `https://nigeria-states-towns-lga.onrender.com/api/${state}/towns`
      //   )

      //   console.log(response)

      //   return response
      // } catch (error) {
      //   // Handle errors
      //   console.error('Authentication Failed:', error)
      //   throw error
      // }
    }

    return {
      GetStates,
      GetCities,
      Nigerian_States
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [{ storage: localStorage, paths: ['Nigerian_States'] }]
    }
  }
)
