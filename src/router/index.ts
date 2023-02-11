import { createRouter, createWebHistory } from 'vue-router'
import {Category, MobileCart, Search} from '@/views'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component:() => import('@/views/HomeView.vue'),
      meta: {transition: 'fade'}
    },
    {
      path:'/busca/:query',
      name:'search',
      component: Search,
      props: route => ({query: route.query.q}),
    },
    {
      path:'/categoria/:name',
      name:'caterogy',
      component: Category,
      props: route => ({query: route.query.q}),
      meta: {transition: 'fade'},
    },
    {
      path:'/mobile-cart',
      name: 'mobile-cart',
      component: MobileCart,
    }
  ]
})

export default router
