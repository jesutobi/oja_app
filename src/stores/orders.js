import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import axiosClient from '../axios'

export const useOrdersStore = defineStore(
  'Orders',
  () => {
    const selected_shipping_id = ref('')
    const selected_payment_method = ref('')
    const orderResponseId = ref('')
    const orders = ref([])
    const singleOrderDetail = ref({})

    const PlaceOrder = async (payload) => {
      try {
        const response = await axiosClient.post(`place_order`, payload)
        orderResponseId.value = response.data.orderItem.order_detail_id

        console.log('tet', orderResponseId.value)

        return response
      } catch (error) {
        // Handle errors
        console.error('error:', error)
        throw error
      }
    }

    const GetOrders = async () => {
      try {
        const response = await axiosClient.get(`get_all_orders`)
        orders.value = response.data.data

        return response
      } catch (error) {
        // Handle errors
        console.error('error:', error)
        throw error
      }
    }
    const GetSingleOrderDetail = async (payload) => {
      try {
        const response = await axiosClient.get(`get_order_detail/${payload}`)
        singleOrderDetail.value = response.data.data

        return response
      } catch (error) {
        // Handle errors
        console.error('error:', error)
        throw error
      }
    }

    return {
      PlaceOrder,
      GetOrders,
      GetSingleOrderDetail,
      selected_shipping_id,
      selected_payment_method,
      orderResponseId,
      orders,
      singleOrderDetail
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: localStorage,
          paths: [
            'selected_shipping_id',
            'selected_payment_method',
            'orders',
            'singleOrderDetail',
            'orderResponseId'
          ]
        }
      ]
    }
  }
)
