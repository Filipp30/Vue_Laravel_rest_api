import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/styles/normalize.css"
import VueSession from "vue-session/index.esm";


Vue.use(VueSession);


Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
