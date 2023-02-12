import { createRouter, createWebHistory } from 'vue-router'
import {Home, Category, MobileCart, Product, Search} from '@/views'
import type { ProductState } from '@/store/products-store'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
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
    },
    {
      path:'/product/:id',
      name: 'product',
      component: Product,
    },
    {
      path:'/mobile-product/:id',
      name: 'mobile-product',
      component: () => import('@/views/MobileProductView.vue'), 
    },
  ]
})

export default router
