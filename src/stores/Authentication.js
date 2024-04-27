import { reactive } from 'vue'
import { defineStore } from 'pinia'
import axiosClient from '../axios'

// import { useLocalStorage } from '@vueuse/core'

export const useUserStore = defineStore('user', () => {
  // Define your state here
  const user = reactive({
    userInfo: JSON.parse(localStorage.getItem('USER')),
    token: localStorage.getItem('TOKEN')
  })

  // Define your actions here
  const login = async (userData) => {
    try {
      // Make a POST request to the /register endpoint with the user object
      const response = await axiosClient.post('/login', userData)

      // set user
      user.token = response.data.token
      setToken(response.data.token)
      console.log(response.data.user)
      setUser(JSON.stringify(response.data.user))
      user.userInfo = response.data.user

      console.log('login successful:', response.data)
      return response.data
    } catch (error) {
      console.error('login failed:', error)
      throw error
    }
  }
  // Define your actions here
  const register = async (userData) => {
    try {
      // Make a POST request to the /register endpoint with the user object
      const response = await axiosClient.post('/register', userData)

      // set user
      user.token = response.data.token
      setToken(response.data.token)
      setUser(JSON.stringify(response.data.user))
      user.userInfo = response.data.user

      console.log('Registration successful:', response.data)
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
      // pinia.state.value = INITIAL_STATE

      // Set token to null in the store
      user.token = null
      user.userInfo = null

      return response
    } catch (error) {
      // Handle errors
      console.error('logout failed:', error)
      throw error
    }
  }

  // set to session function
  const setToken = (data) => {
    localStorage.setItem('TOKEN', data)
  }
  const setUser = (data) => {
    localStorage.setItem('USER', data)
  }
  // set user

  return { user, register, login, logout }
})
