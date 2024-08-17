import axios from 'axios'
import { useUserStore } from './stores/Authentication'
import { storeToRefs } from 'pinia'

import.meta.env.VITE_API_BASE_URL

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`
})

axiosClient.interceptors.request.use(
  (config) => {
    const store = useUserStore()

    const { userInfo, token } = storeToRefs(store)

    // Modify the request configuration or add headers
    config.headers.Authorization = `Bearer ${token.value}`
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
