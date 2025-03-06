
import ClientInterface from '@/layouts/ClientInterface.vue'
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
      redirect: { path: '/accueil' }  // Redirect to /accueil
    },
    {
      path: '/accueil',
      name: 'home',
      component: HomeView
    },
    {
      path: '/espace-client',
      name: 'client-area',
      component: ClientInterface,  // Manages the common layout for the client area pages and allows the router to inject the rest of the page content based on the route.
      children: [
        {
          path: 'budget',
          name: 'budget',
          component: BudgetView
          // <RouterLink to="/espace-client/budget">Budget</RouterLink>
        },
        {
          path: 'profil',
          name: 'profile',
          component: ProfileView
          // <RouterLink to="/espace-client/profil">Budget</RouterLink>
        },
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'erreur',
      component: ErrorView
    }
  ] ,
})

export default router
