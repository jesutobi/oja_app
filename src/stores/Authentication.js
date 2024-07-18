import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import axiosClient from '../axios'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref('')
    const token = ref('')
    // const user = ref({
    //   userInfo: JSON.parse(localStorage.getItem('USER')),
    //   token: localStorage.getItem('TOKEN')
    // })

    const login = async (userData) => {
      try {
        const response = await axiosClient.post('/login', userData)

        token.value = response.data.token
        // setToken(response.data.token)
        // setUser(JSON.stringify(response.data.user))
        userInfo.value = response.data.user

        return response.data
      } catch (error) {
        console.error('login failed:', error)
        throw error
      }
    }

    const register = async (userData) => {
      try {
        const response = await axiosClient.post('/register', userData)

        token.value = response.data.token
        // setToken(response.data.token)
        // setUser(JSON.stringify(response.data.user))
        userInfo.value = response.data.user

        return response.data
      } catch (error) {
        // Handle errors
        console.error('registeration failed:', error)
        throw error
      }
    }

    // logout action
    const logout = async () => {
      try {
        // Send logout request
        const response = await axiosClient.post('/logout')
        localStorage.removeItem('user')
        localStorage.removeItem('Saved')
        localStorage.removeItem('shipping_address')
        localStorage.removeItem('cart')
        localStorage.removeItem('update_users')
        localStorage.removeItem('Orders')

        // user.token = null
        // user.userInfo = null
        token.value = null
        userInfo.value = null

        return response
      } catch (error) {
        // Handle errors
        console.error('logout failed:', error)
        throw error
      }
    }

    // set to local storage
    // const setToken = (data) => {
    //   localStorage.setItem('TOKEN', data)
    // }
    // const setUser = (data) => {
    //   localStorage.setItem('USER', data)
    // }
    // set user

    return { userInfo, token, register, login, logout }
  },
  {
    persist: {
      enabled: true,
      strategies: [{ storage: localStorage, paths: ['userInfo', 'token'] }]
    }
  }
)
