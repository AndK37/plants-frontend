import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductPage from '@/views/ProductPage.vue'
import FavoriteView from '@/views/FavoriteView.vue'
import CartView from '@/views/CartView.vue'
import AccountView from '@/views/AccountView.vue'
import OrdersView from '@/views/OrdersView.vue'
import SellerView from '@/views/SellerView.vue'
import SellerProduct from '@/views/SellerProduct.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:category',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/plant/:plant_id',
      name: 'plant_page',
      component: ProductPage,
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: FavoriteView,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrdersView,
    },
    {
      path: '/seller',
      name: 'seller',
      component: SellerView,
    },
    {
      path: '/seller/:plant_id',
      name: 'seller_product',
      component: SellerProduct,
    },
    {
      path: '/',
      redirect: '/all',
    },
  ],
})

export default router
