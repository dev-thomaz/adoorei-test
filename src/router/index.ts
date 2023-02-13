import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {transition: 'fade'}
    },
    {
      path:'/busca/:query',
      name:'search',
      component: () => import('@/views/SearchView.vue'),
      props: route => ({query: route.query.q}),
    },
    {
      path:'/categoria/:name',
      name:'caterogy',
      component: () => import('@/views/CategoryView.vue'),
    },
    {
      path:'/mobile-cart',
      name: 'mobile-cart',
      component: () => import('@/views/MobileCartView.vue')
    },
    {
      path:'/product/:id',
      name: 'product',
      component: () => import('@/views/ProductView.vue'),
    },
    {
      path:'/mobile-product/:id',
      name: 'mobile-product',
      component: () => import('@/views/MobileProductView.vue'), 
    },
    {
      path:'/checkout',
      name: 'checkout',
      component: () => import('@/views/CheckoutView.vue'), 
    },
    {
      path:'/mobile-checkout',
      name:'mobile-checkout',
      component: () => import('@/views/MobileCheckoutView.vue')
    }
  ]
})

export default router
