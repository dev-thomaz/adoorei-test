import { createRouter, createWebHistory } from 'vue-router'
import {Category} from '@/views'
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
      path:'/busca',
      name:'search',
      component:() => import('@/views/SearchView.vue')
    },
    {
      path:'/categoria/:name',
      name:'caterogy',
      component: Category,
      props: route => ({query: route.query.q}),
      meta: {transition: 'fade'}
    },
  ]
})

export default router
