import App from '@/App.vue'
import BudgetView from '@/view/BudgetView.vue'
import ErrorView from '@/view/ErrorView.vue'
import HomeView from '@/view/HomeView.vue'
import ProfileView from '@/view/ProfileView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/services/userStore'
import { useToast } from '@/plugins/toastification'

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
      component: BudgetView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profil',
      name: 'profile',
      component: ProfileView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'erreur',
      component: ErrorView
    }
  ]
})

// Navigation guard global
router.beforeEach((to, from, next) => {
  // Vérifier si la route nécessite une authentification
  if (to.meta.requiresAuth) {
    const userStore = useUserStore();
    
    // Si l'utilisateur n'est pas connecté
    if (!userStore.user) {
      const toast = useToast();
      toast.error('Veuillez vous connecter pour accéder à votre profil');
      
      // Redirection vers la page d'accueil
      return next({ name: 'home' });
    }
  }
  
  // Si aucune restriction ou utilisateur connecté, continuer normalement
  next();
})

export default router
