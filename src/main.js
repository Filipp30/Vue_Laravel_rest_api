import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "../store"
import "./assets/styles/normalize.css"
import VueChatScroll from "vue-chat-scroll"


createApp(App)

    .use(router)
    .use(store)
    .use(VueChatScroll)
    .mount('#app')









