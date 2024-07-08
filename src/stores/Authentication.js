import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import axiosClient from '../axios'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    userInfo: JSON.parse(localStorage.getItem('USER')),
    token: localStorage.getItem('TOKEN')
  })

  const login = async (userData) => {
    try {
      const response = await axiosClient.post('/login', userData)

      user.token = response.data.token
      setToken(response.data.token)
      setUser(JSON.stringify(response.data.user))
      user.userInfo = response.data.user

      return response.data
    } catch (error) {
      console.error('login failed:', error)
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const response = await axiosClient.post('/register', userData)

      user.token = response.data.token
      setToken(response.data.token)
      setUser(JSON.stringify(response.data.user))
      user.userInfo = response.data.user

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
      localStorage.removeItem('TOKEN')
      localStorage.removeItem('USER')
      localStorage.removeItem('verfiedUser')
      localStorage.removeItem('Orders')

      user.token = null
      user.userInfo = null

      return response
    } catch (error) {
      // Handle errors
      console.error('logout failed:', error)
      throw error
    }
  }

  // set to local storage
  const setToken = (data) => {
    localStorage.setItem('TOKEN', data)
  }
  const setUser = (data) => {
    localStorage.setItem('USER', data)
  }
  // set user

  return { user, register, login, logout }
})
