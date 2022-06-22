import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Imprint from '../views/Imprint.vue'
import DataProtection from "@/views/DataProtection";

const router = createRouter({
  history: createWebHistory(''),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/imprint',
      name: 'imprint',
      component: Imprint
    },
    {
      path: '/data_protection',
      name: 'data protection',
      component: DataProtection
    }
  ]
})

export default router
