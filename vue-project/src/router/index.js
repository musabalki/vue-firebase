import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {auth} from "../firebase/config"

const userControl = (to,from,next) =>{

  let user = auth.currentUser
  if(!user){
    next({name:'login'})
  }else{
    next()
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login.vue')
    },
    {
      path: '/share',
      name: 'share',
      component: () => import('../views/Share.vue'),
      beforeEnter:userControl
    },  
    {
      path: '/browse/:id',
      name: 'browse',
      component: () => import('../views/Browse.vue'),
    },  
  ]
})

export default router
