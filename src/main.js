import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Toasity from 'vue3-toastify'

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
