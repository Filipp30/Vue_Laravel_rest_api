import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Shop from "../views/Shop";
import Forum from "../views/Forum";
import Contact from "../views/Contact";
import Auth from "../views/Auth";
import Admin from "../views/Admin";
import MyAccount from "../views/MyAccount";
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
    path: '/my_account',
    name: 'MyAccount',
    component: MyAccount,
    beforeEnter:(to,from,next)=>{
      if (localStorage.getItem('jwt_token')){
        next();
      }else{
        next({name: 'Home'})
      }
    }
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

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
