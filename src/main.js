import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/store"
import "./assets/styles/normalize.css"

createApp(App)

    .use(router)
    .use(store)
    .mount('#app')












