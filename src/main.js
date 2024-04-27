import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'
import Vue3Toasity from 'vue3-toastify'
import { useUserStore } from '@/stores/Authentication'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import 'animate.css'

const app = createApp(App)
const pinia = createPinia()

app.use(Vue3Toasity)
app.use(pinia)
app.use(router)
app.mount('#app')

// if (localStorage.getItem('state')) {
//   pinia.state.value = JSON.parse(localStorage.getItem('state'))
// }

// watch(
//   pinia.state,
//   (state) => {
//     localStorage.setItem('state', JSON.stringify(state))
//   },
//   { deep: true }
// )

const store = useUserStore()
const isAuthenticated = store.user.token

// Make isAuthenticated accessible globally
app.config.globalProperties.$isAuthenticated = isAuthenticated
