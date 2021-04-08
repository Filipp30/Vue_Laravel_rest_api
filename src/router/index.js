import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "../views/Home.vue";
import Shop from "../views/Shop";
import Forum from "../views/Forum";
import Contact from "../views/Contact";
import Auth from "../views/Auth";
import Admin from "../views/Admin";



Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop,
  },
  {
    path: '/forum',
    name: 'Forum',
    component: Forum,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
