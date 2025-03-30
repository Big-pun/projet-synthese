import './assets/styles/main.css'
import './assets/styles/toast.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@fortawesome/fontawesome-free/css/all.css'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import App from './App.vue'
import router from './router'
import SweetAlertPlugin from './plugins/sweetAlert'
import ToastPlugin from './plugins/toastification'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(SweetAlertPlugin)
app.use(ToastPlugin)

app.mount('#app')
