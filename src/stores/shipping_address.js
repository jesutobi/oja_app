import { reactive } from 'vue'
import { defineStore } from 'pinia'
import axiosClient from '../axios'

export const useShippingAddressStore = defineStore('shipping_address', () => {
  // Define your state here
  const data = reactive({
    AuthResponse: ''
  })

  const GetShippingAdress = async () => {
    try {
      const response = await axiosClient.get(`get_shipping_addresses`)

      return response
    } catch (error) {
      // Handle errors
      console.error('Failed:', error)
      throw error
    }
  }
  const GetDefaultAdress = async () => {
    try {
      const response = await axiosClient.get(`default-address`)

      return response
    } catch (error) {
      // Handle errors
      console.error('Failed:', error)
      throw error
    }
  }

  const AddShippingAdress = async (payload) => {
    try {
      JSON.stringify(payload.state)
      JSON.stringify(payload.city)

      const response = await axiosClient.post(`add_shipping_address`, payload)

      console.log('add', response)

      return response
    } catch (error) {
      // Handle errors
      console.error('Failed:', error)
      throw error
    }
  }

  const GetShippingAdressDetail = async (payload) => {
    try {
      const response = await axiosClient.get(`single_shipping_address_detail/${payload}`)

      return response.data
    } catch (error) {
      // Handle errors
      console.error('Failed:', error)
      throw error
    }
  }
  const EditShippingAdressDetail = async (payload, id) => {
    try {
      const response = await axiosClient.put(`edit_shipping_addresses/${id}`, payload)

      return response.data
    } catch (error) {
      // Handle errors
      console.error('Failed:', error)
      throw error
    }
  }
  const setAsDefault = async (id) => {
    try {
      const response = await axiosClient.patch(`addresses/${id}/set_address_toDefault`)

      return response.data
    } catch (error) {
      // Handle errors
      console.error('Failed:', error)
      throw error
    }
  }
  const DeleteAddress = async (id) => {
    try {
      const response = await axiosClient.delete(`Delete_address/${id}`)

      return response.data
    } catch (error) {
      // Handle errors
      console.error('Failed:', error)
      throw error
    }
  }

  return {
    data,
    AddShippingAdress,
    GetShippingAdress,
    GetShippingAdressDetail,
    EditShippingAdressDetail,
    setAsDefault,
    DeleteAddress,
    GetDefaultAdress
  }
})
