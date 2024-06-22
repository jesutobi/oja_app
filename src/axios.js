import axios from 'axios'
import { useUserStore } from './stores/Authentication'

import.meta.env.VITE_API_BASE_URL

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

axiosClient.interceptors.request.use(
  (config) => {
    const store = useUserStore()
    // Modify the request configuration or add headers
    config.headers.Authorization = `Bearer ${store.user.token}`
    // Dynamically set the Content-Type header if the request data is FormData
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
    } else {
      config.headers['Content-Type'] = 'application/json'
    }
    return config
  }
  //   (error) => {
  //     // Handle request errors
  //     return Promise.reject(error);
  //   }
)

export default axiosClient
