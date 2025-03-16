
import App from '@/App.vue'
import BudgetView from '@/view/BudgetView.vue'
import ErrorView from '@/view/ErrorView.vue'
import HomeView from '@/view/HomeView.vue'
import ProfileView from '@/view/ProfileView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app',
      redirect: { name: 'home' },
    },
    {
      path: '/accueil',
      name: 'home',
      component: HomeView
    },
    {
      path: '/budget',
      name: 'budget',
      component: BudgetView
    },
    {
      path: '/profil',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'erreur',
      component: ErrorView
    }
  ] ,
})

export default router
